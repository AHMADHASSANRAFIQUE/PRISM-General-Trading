import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import nodemailer from "nodemailer";

// In-memory rate limiting for job applications (Max 5 per 15 minutes per IP)
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_APPLICATIONS_PER_WINDOW = 5;

const DATA_DIR = path.join(process.cwd(), "data");
const APPLICATIONS_DIR = path.join(DATA_DIR, "applications");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.jsonl");

function ensureDirectories() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(APPLICATIONS_DIR)) {
    fs.mkdirSync(APPLICATIONS_DIR, { recursive: true });
  }
}

function sanitize(str: string): string {
  return str.replace(/[<>'"&]/g, "").trim();
}

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) || "127.0.0.1";

    const now = Date.now();
    const existingLimit = rateLimitMap.get(clientIp);

    if (existingLimit && now < existingLimit.resetAt) {
      if (existingLimit.count >= MAX_APPLICATIONS_PER_WINDOW) {
        return NextResponse.json(
          {
            error: "Too many applications submitted from your network. Please wait a few minutes or email your CV directly to info@prismintl.co.",
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

    // 2. Parse Multipart Form Data
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const jobTitle = (formData.get("jobTitle") as string) || "General Application";
    const jobId = (formData.get("jobId") as string) || "general";
    const coverNote = (formData.get("coverNote") as string) || "";
    const cvFile = formData.get("cv") as File | null;

    // 3. Validation
    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || phone.trim().length < 6) {
      return NextResponse.json(
        { error: "Please provide your active telephone / WhatsApp number." },
        { status: 400 }
      );
    }

    if (!cvFile || cvFile.size === 0) {
      return NextResponse.json(
        { error: "Please attach your CV document (PDF, DOC, or DOCX)." },
        { status: 400 }
      );
    }

    // File size check: Max 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (cvFile.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "CV file size exceeds the 10MB limit. Please upload a smaller document." },
        { status: 400 }
      );
    }

    // Allowed extensions
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExt = path.extname(cvFile.name).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      return NextResponse.json(
        { error: "Invalid file format. Please upload your CV as a PDF, DOC, or DOCX file." },
        { status: 400 }
      );
    }

    // 4. Read File Bytes & Store
    ensureDirectories();
    const fileBuffer = Buffer.from(await cvFile.arrayBuffer());
    const applicationRef = `APP-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const safeFilename = `${applicationRef}_${sanitize(fullName).replace(/\s+/g, "_")}${fileExt}`;
    const targetFilePath = path.join(APPLICATIONS_DIR, safeFilename);

    try {
      fs.writeFileSync(targetFilePath, fileBuffer);
    } catch (fsErr) {
      console.warn("[APPLY STORAGE] File save fallback:", fsErr);
    }

    // Append record to JSONL audit log
    const record = {
      ref: applicationRef,
      timestamp: new Date().toISOString(),
      clientIp,
      jobTitle: sanitize(jobTitle),
      jobId: sanitize(jobId),
      fullName: sanitize(fullName),
      email: email.trim().toLowerCase(),
      phone: sanitize(phone),
      coverNote: sanitize(coverNote),
      cvFilename: cvFile.name,
      savedFilename: safeFilename,
      fileSizeBytes: cvFile.size,
      status: "received",
    };

    try {
      fs.appendFileSync(APPLICATIONS_FILE, JSON.stringify(record) + "\n", { encoding: "utf-8" });
    } catch (logErr) {
      console.error("[APPLY LOG ERROR] Could not persist log:", logErr);
    }

    // 5. Dispatch via SMTP if configured
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
          from: process.env.SMTP_FROM || `"Prism Careers Portal" <careers@prismintl.co>`,
          to: process.env.CONTACT_RECIPIENT_EMAIL || "info@prismintl.co",
          replyTo: email.trim().toLowerCase(),
          subject: `[Job Application - ${jobTitle}] ${fullName}`,
          text: `
PRISM GENERAL TRADING — TALENT APPLICATION
--------------------------------------------------
Application Ref: ${applicationRef}
Date / Time:     ${record.timestamp}
Position:        ${jobTitle}

Candidate Name:  ${fullName}
Email Address:   ${email}
Contact Number:  ${phone}

Introduction / Note:
${coverNote ? coverNote.trim() : "No additional note provided."}

Attached CV:     ${cvFile.name} (${Math.round(cvFile.size / 1024)} KB)
--------------------------------------------------
Dispatched from https://prismintl.co/careers
          `.trim(),
          attachments: [
            {
              filename: cvFile.name,
              content: fileBuffer,
            },
          ],
        });
      } catch (mailErr) {
        console.error("[APPLY SMTP ERROR] Email dispatch failed:", mailErr);
      }
    } else {
      console.log(`[APPLY RECEIVED] ${applicationRef} for "${jobTitle}" from ${fullName} (${email}). Saved to data/applications/`);
    }

    return NextResponse.json({
      success: true,
      applicationRef,
      message: `Your application for ${jobTitle} and CV have been successfully submitted to Prism General Trading.`,
    });
  } catch (err: any) {
    console.error("[APPLY API ERROR]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application. Please email info@prismintl.co directly." },
      { status: 500 }
    );
  }
}
