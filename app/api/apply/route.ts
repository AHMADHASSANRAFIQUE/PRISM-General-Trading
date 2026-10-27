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
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(APPLICATIONS_DIR)) {
      fs.mkdirSync(APPLICATIONS_DIR, { recursive: true });
    }
  } catch (err) {
    // Vercel serverless has a read-only filesystem; safe to ignore
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

    // File size check: Max 4MB (Vercel payload constraint)
    const MAX_SIZE = 4 * 1024 * 1024;
    if (cvFile.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "CV file size exceeds the 4MB limit. Please upload a smaller document." },
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

    // 4. Read File Bytes
    const fileBuffer = Buffer.from(await cvFile.arrayBuffer());
    const applicationRef = `APP-${Date.now()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const safeFilename = `${applicationRef}_${sanitize(fullName).replace(/\s+/g, "_")}${fileExt}`;

    // Safely attempt local file logging (fails gracefully on serverless read-only disks)
    try {
      ensureDirectories();
      const targetFilePath = path.join(APPLICATIONS_DIR, safeFilename);
      fs.writeFileSync(targetFilePath, fileBuffer);
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
      fs.appendFileSync(APPLICATIONS_FILE, JSON.stringify(record) + "\n", { encoding: "utf-8" });
    } catch (fsErr) {
      console.warn("[APPLY STORAGE] Skipped local file persistence (serverless environment):", fsErr);
    }

    // 5. Dispatch via SMTP if configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    let emailDispatched = false;
    let emailError: string | null = null;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        // Strip spaces from Google App Password if user pasted with spaces
        const cleanPass = smtpPass.trim().replace(/\s+/g, "");
        const cleanUser = smtpUser.trim();

        // Use nodemailer's official 'gmail' service preset if using Gmail
        const transportConfig: any = smtpHost.toLowerCase().includes("gmail")
          ? {
              service: "gmail",
              auth: {
                user: cleanUser,
                pass: cleanPass,
              },
            }
          : {
              host: smtpHost.trim(),
              port: Number(process.env.SMTP_PORT) || 587,
              secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
              auth: {
                user: cleanUser,
                pass: cleanPass,
              },
            };

        const transporter = nodemailer.createTransport(transportConfig);

        const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "info@prismintl.co";

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Prism Careers Portal" <${cleanUser}>`,
          to: recipient,
          replyTo: email.trim().toLowerCase(),
          subject: `[Job Application - ${jobTitle}] ${fullName}`,
          text: `
PRISM GENERAL TRADING — TALENT APPLICATION
--------------------------------------------------
Application Ref: ${applicationRef}
Date / Time:     ${new Date().toISOString()}
Position:        ${jobTitle}

Candidate Name:  ${fullName}
Email Address:   ${email}
Contact Number:  ${phone}

Introduction / Note:
${coverNote ? coverNote.trim() : "No additional note provided."}

Attached CV:     ${cvFile.name} (${Math.round(cvFile.size / 1024)} KB)
--------------------------------------------------
Dispatched from https://www.prismintl.co/careers
          `.trim(),
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; padding: 28px 32px; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 13px; color: #94a3b8; }
    .badge { display: inline-block; padding: 4px 10px; background: rgba(255,255,255,0.12); border-radius: 9999px; font-size: 11px; font-weight: 600; text-transform: uppercase; color: #38bdf8; margin-bottom: 8px; }
    .content { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; }
    .value { font-size: 15px; color: #0f172a; font-weight: 500; }
    .note-box { background: #f1f5f9; border-left: 4px solid #0284c7; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.5; color: #334155; margin-top: 8px; }
    .cv-box { background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 16px; display: flex; align-items: center; margin-top: 16px; }
    .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">Prism Careers Portal</div>
      <h1>New Talent Application Received</h1>
      <p>Candidate application submitted via https://www.prismintl.co/careers</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Applied Position</div>
        <div class="value" style="font-size: 18px; color: #0369a1; font-weight: 700;">${jobTitle}</div>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; width: 50%;">
            <div class="label">Candidate Name</div>
            <div class="value">${fullName}</div>
          </td>
          <td style="padding: 8px 0; width: 50%;">
            <div class="label">Contact / WhatsApp</div>
            <div class="value"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></div>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0;" colspan="2">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a> (Click "Reply" to email directly)</div>
          </td>
        </tr>
      </table>
      ${coverNote ? `
      <div class="field">
        <div class="label">Introduction / Cover Note</div>
        <div class="note-box">${coverNote.trim()}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Attached CV Document</div>
        <div class="cv-box">
          <strong>📎 ${cvFile.name}</strong>&nbsp;(${Math.round(cvFile.size / 1024)} KB)
          <br><span style="font-size: 12px; color: #64748b;">(The original CV file is attached to this email)</span>
        </div>
      </div>
    </div>
    <div class="footer">
      Application Ref: <strong>${applicationRef}</strong> • Dispatched automatically from Prism General Trading
    </div>
  </div>
</body>
</html>
          `.trim(),
          attachments: [
            {
              filename: cvFile.name,
              content: fileBuffer,
            },
          ],
        });
        emailDispatched = true;
        console.log(`[APPLY SMTP SUCCESS] Application ${applicationRef} dispatched to ${recipient}`);
      } catch (mailErr: any) {
        emailError = mailErr?.message || String(mailErr);
        console.error("[APPLY SMTP ERROR] Email dispatch failed:", mailErr);
      }
    } else {
      emailError = "SMTP environment variables not configured on server.";
      console.log(`[APPLY RECEIVED] ${applicationRef} for "${jobTitle}" from ${fullName} (${email}). SMTP credentials not present.`);
    }

    return NextResponse.json({
      success: true,
      applicationRef,
      emailDispatched,
      emailError,
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
