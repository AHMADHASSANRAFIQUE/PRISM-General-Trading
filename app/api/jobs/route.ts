import { NextResponse } from "next/server";
import { parseCSV } from "@/lib/csvParser";
import { DEFAULT_OPENINGS, JobOpening } from "@/lib/jobsData";

export const revalidate = 60; // Auto-revalidate every 60 seconds

function normalizeGoogleSheetUrl(rawUrl: string): string {
  if (!rawUrl) return rawUrl;
  const trimmed = rawUrl.trim();

  // If already an export or published CSV URL, return as-is
  if (trimmed.includes("/export?format=csv") || trimmed.includes("/pub?output=csv")) {
    return trimmed;
  }

  // Handle standard Google Sheets edit or view URL: https://docs.google.com/spreadsheets/d/<ID>/...
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    const gidMatch = trimmed.match(/[?&#]gid=([0-9]+)/);
    const gid = gidMatch ? gidMatch[1] : "0";
    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  return trimmed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const explicitSheetUrl = searchParams.get("sheetUrl");
  
  const rawSheetUrl =
    explicitSheetUrl ||
    process.env.GOOGLE_SHEETS_JOBS_URL ||
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_JOBS_URL;

  if (!rawSheetUrl) {
    return NextResponse.json({
      jobs: DEFAULT_OPENINGS,
      source: "fallback",
      total: DEFAULT_OPENINGS.length,
      syncedAt: new Date().toISOString(),
      note: "GOOGLE_SHEETS_JOBS_URL not configured. Using default active openings.",
    });
  }

  const sheetUrl = normalizeGoogleSheetUrl(rawSheetUrl);

  try {
    const response = await fetch(sheetUrl, {
      headers: {
        Accept: "text/csv, text/plain, */*",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(`[JOBS SYNC] Failed to fetch Google Sheet (${response.status}): ${response.statusText}`);
      return NextResponse.json({
        jobs: DEFAULT_OPENINGS,
        source: "fallback",
        total: DEFAULT_OPENINGS.length,
        syncedAt: new Date().toISOString(),
        error: `HTTP ${response.status}`,
      });
    }

    const csvText = await response.text();
    const records = parseCSV(csvText);

    if (!records || records.length === 0) {
      return NextResponse.json({
        jobs: DEFAULT_OPENINGS,
        source: "fallback",
        total: DEFAULT_OPENINGS.length,
        syncedAt: new Date().toISOString(),
        note: "Empty sheet data. Using fallback.",
      });
    }

    const parsedJobs: JobOpening[] = [];

    records.forEach((row, idx) => {
      // Find matching keys regardless of casing/spacing
      const title = row.title || row.jobtitle || row.role || "";
      if (!title) return;

      const status = (row.status || "Active").trim();
      const isInactive =
        status.toLowerCase() === "inactive" ||
        status.toLowerCase() === "closed" ||
        status.toLowerCase() === "draft" ||
        status.toLowerCase() === "hidden";

      if (isInactive) return;

      const splitList = (text: string): string[] => {
        if (!text) return [];
        return text
          .split(/[;\n•|]/)
          .map((item) => item.replace(/^[•\-\*]\s*/, "").trim())
          .filter((item) => item.length > 0);
      };

      const responsibilities = splitList(row.responsibilities || row.keyresponsibilities || row.duties || "");
      const requirements = splitList(row.requirements || row.qualifications || row.skills || "");

      parsedJobs.push({
        id: row.id || `job-${idx + 1}-${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        title: title,
        department: row.department || row.dept || row.category || "Commercial & Operations",
        location: row.location || "Dubai, UAE",
        type: row.type || row.employmenttype || "Full-time",
        experience: row.experience || row.exp || "UAE Experience",
        summary: row.summary || row.description || row.overview || "",
        responsibilities: responsibilities.length > 0 ? responsibilities : [
          "Execute day-to-day commercial and operational objectives in alignment with company standards.",
          "Coordinate cross-functionally across modern trade, sales, and logistics channels.",
        ],
        requirements: requirements.length > 0 ? requirements : [
          "Relevant experience in UAE FMCG or commercial distribution.",
          "Strong communication, commercial acumen, and execution discipline.",
        ],
        status: status || "Active",
      });
    });

    if (parsedJobs.length === 0) {
      return NextResponse.json({
        jobs: DEFAULT_OPENINGS,
        source: "fallback",
        total: DEFAULT_OPENINGS.length,
        syncedAt: new Date().toISOString(),
        note: "No active records found in sheet. Using default openings.",
      });
    }

    return NextResponse.json({
      jobs: parsedJobs,
      source: "google_sheets",
      total: parsedJobs.length,
      syncedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("[JOBS SYNC ERROR] Failed to parse Google Sheet:", err);
    return NextResponse.json({
      jobs: DEFAULT_OPENINGS,
      source: "fallback",
      total: DEFAULT_OPENINGS.length,
      syncedAt: new Date().toISOString(),
      error: err?.message || "Sync failure",
    });
  }
}
