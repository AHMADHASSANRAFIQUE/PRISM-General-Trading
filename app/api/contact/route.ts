import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import nodemailer from "nodemailer";

// --- Rate Limiting & Anti-Abuse Cache (In-Memory) ---
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const recentSubmissions = new Map<string, number>(); // Hash -> timestamp

// Window: 10 minutes (600,000 ms), Max submissions: 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const DUPLICATE_WINDOW_MS = 60 * 1000; // 60 seconds

// HTML sanitizer helper to prevent script injection
function sanitizeText(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

// Persistent Storage Helper
const DATA_DIR = path.join(process.cwd(), "data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.jsonl");

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function saveEnquiryRecord(record: Record<string, any>) {
  try {
    ensureDataDirectory();
    const line = JSON.stringify(record) + "\n";
    fs.appendFileSync(ENQUIRIES_FILE, line, { encoding: "utf-8" });
  } catch (err) {
    console.error("[PRISM STORAGE ERROR] Failed to persist enquiry to disk:", err);
  }
}

export async function POST(request: Request) {
  try {
    // 1. IP Identification & Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) || "127.0.0.1";

    const now = Date.now();
    const existingLimit = rateLimitMap.get(clientIp);

    if (existingLimit && now < existingLimit.resetAt) {
      if (existingLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            error: "Too many enquiries submitted from this location. Please wait a few minutes before trying again or email info@prismintl.co directly.",
          },
          { status: 429 }
        );
      }
      existingLimit.count += 1;
    } else {
      rateLimitMap.set(clientIp, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Parse Untrusted Input
    const body = await request.json();
    const {
      fullName,
      company,
      email,
      telephone,
      enquiryType,
      message,
      privacyAgreed,
      honeypot,
    } = body;

    // 3. Spam Honeypot Check
    if (honeypot && String(honeypot).trim() !== "") {
      // Silently absorb spam bot submission
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for contacting Prism General Trading. Your enquiry has been received.",
        },
        { status: 200 }
      );
    }

    // 4. Strict Validation & Normalization
    if (
      !fullName ||
      typeof fullName !== "string" ||
      fullName.trim().length < 2 ||
      fullName.trim().length > 100
    ) {
      return NextResponse.json(
        { error: "Please enter your full name (between 2 and 100 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!cleanEmail || cleanEmail.length > 120 || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    const validEnquiryTypes = [
      "Brand Partnership",
      "Trade & Distribution",
      "Careers",
      "General",
    ];
    if (!enquiryType || !validEnquiryTypes.includes(enquiryType)) {
      return NextResponse.json(
        { error: "Please select an approved enquiry type." },
        { status: 400 }
      );
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length < 10 ||
      message.trim().length > 3000
    ) {
      return NextResponse.json(
        { error: "Please enter your message (between 10 and 3,000 characters)." },
        { status: 400 }
      );
    }

    if (!privacyAgreed) {
      return NextResponse.json(
        { error: "You must acknowledge and accept the privacy notice." },
        { status: 400 }
      );
    }

    // Optional fields normalization
    const cleanCompany = company && typeof company === "string" ? company.trim().slice(0, 120) : "";
    const cleanTelephone = telephone && typeof telephone === "string" ? telephone.trim().slice(0, 40) : "";

    // 5. Duplicate Submission Prevention
    const submissionHash = crypto
      .createHash("sha256")
      .update(`${cleanEmail}:${message.trim().slice(0, 80)}`)
      .digest("hex");

    const previousSubmissionTime = recentSubmissions.get(submissionHash);
    if (previousSubmissionTime && now - previousSubmissionTime < DUPLICATE_WINDOW_MS) {
      return NextResponse.json(
        {
          error: "A identical enquiry was recently received. Our commercial team has your submission and will be in touch shortly.",
        },
        { status: 400 }
      );
    }
    recentSubmissions.set(submissionHash, now);

    // 6. Build Sanitized Enquiry Record
    const enquiryId = `ENQ-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const enquiryRecord = {
      id: enquiryId,
      submittedAt: new Date().toISOString(),
      clientIp: clientIp,
      fullName: sanitizeText(fullName),
      company: sanitizeText(cleanCompany) || "N/A",
      email: cleanEmail,
      telephone: sanitizeText(cleanTelephone) || "N/A",
      enquiryType,
      message: sanitizeText(message),
      privacyAgreed: true,
      destination: process.env.CONTACT_RECIPIENT_EMAIL || "info@prismintl.co",
      status: "received",
      emailDispatched: false,
    };

    // 7. Persist to Secure Local Store
    saveEnquiryRecord(enquiryRecord);

    // 8. Dispatch Email via SMTP (if configured in environment)
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Prism Website Enquiry" <no-reply@prismintl.co>`,
          to: process.env.CONTACT_RECIPIENT_EMAIL || "info@prismintl.co",
          replyTo: cleanEmail,
          subject: `[Website Enquiry - ${enquiryType}] from ${fullName}`,
          text: `
PRISM GENERAL TRADING — WEBSITE ENQUIRY
--------------------------------------------------
Enquiry ID:    ${enquiryId}
Date/Time:     ${enquiryRecord.submittedAt}
Enquiry Type:  ${enquiryType}

Sender Name:   ${fullName}
Company:       ${cleanCompany || "Not specified"}
Email:         ${cleanEmail}
Telephone:     ${cleanTelephone || "Not specified"}

Message:
${message.trim()}

--------------------------------------------------
Dispatched from https://prismintl.co
          `.trim(),
        });

        enquiryRecord.emailDispatched = true;
      } catch (mailError) {
        console.error("[PRISM SMTP ERROR] Could not dispatch email via SMTP:", mailError);
        // Record is already safely persisted in enquiries.jsonl
      }
    } else {
      console.log(`[PRISM ENQUIRY QUEUED] ID: ${enquiryId} | From: ${cleanEmail} | Type: ${enquiryType} | Saved to data/enquiries.jsonl`);
    }

    // 9. Exact Approved Success Acknowledgement
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting Prism General Trading. Your enquiry has been received.",
        enquiryId: enquiryId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PRISM API ERROR] Unexpected failure processing contact enquiry:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your enquiry. Please email us directly at info@prismintl.co.",
      },
      { status: 500 }
    );
  }
}
