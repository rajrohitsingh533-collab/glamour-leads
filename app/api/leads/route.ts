import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { leadSchema } from "@/types/lead";
import { z, ZodError } from "zod";

/* ── In-memory rate limiter ──────────────────────────────────
 * Keyed by IP address.  Serverless-friendly: the map resets on
 * cold start, but that's acceptable for basic abuse prevention.
 * For production at scale, swap this for Redis / Upstash.
 */
const RATE_WINDOW_MS  = 10 * 60 * 1000; // 10 minutes
const RATE_MAX_HITS   = 3;              // max submissions per window

type RateEntry = { count: number; windowStart: number };
const rateMap = new Map<string, RateEntry>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec?: number } {
  const now      = Date.now();
  const existing = rateMap.get(ip);

  // Expired window — reset
  if (!existing || now - existing.windowStart > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (existing.count >= RATE_MAX_HITS) {
    const retryAfterSec = Math.ceil(
      (RATE_WINDOW_MS - (now - existing.windowStart)) / 1000
    );
    return { allowed: false, retryAfterSec };
  }

  existing.count++;
  return { allowed: true };
}

/* ── Duplicate-email check window ───────────────────────────── */
const DUPE_WINDOW_HOURS = 24;

/* ── POST /api/leads ─────────────────────────────────────────
 * Validates → rate-limits → dupe-checks → inserts → fires email
 */
export async function POST(request: NextRequest) {
  /* 1. Parse body */
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  /* 2. Server-side Zod validation */
  let data: z.infer<typeof leadSchema>;
  try {
    data = leadSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      const messages = err.issues.map((e) => e.message).join(", ");
      return NextResponse.json({ error: messages }, { status: 422 });
    }
    return NextResponse.json({ error: "Validation failed." }, { status: 422 });
  }

  /* 3. Rate limit by IP */
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: `Too many submissions. Please wait ${Math.ceil((rate.retryAfterSec ?? 60) / 60)} minute(s) before trying again.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec ?? 60) },
      }
    );
  }

  /* 4. Admin client (service_role — bypasses RLS safely on server) */
  const supabase = createAdminClient();

  /* 5. Duplicate email check (same email in last 24 h) */
  const dupeWindow = new Date(
    Date.now() - DUPE_WINDOW_HOURS * 60 * 60 * 1000
  ).toISOString();

  const { data: existing } = await supabase
    .from("leads")
    .select("id")
    .eq("email", data.email.toLowerCase())
    .gte("created_at", dupeWindow)
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json(
      {
        error:
          "This email has already been submitted in the last 24 hours. We'll be in touch soon!",
        duplicate: true,
      },
      { status: 409 }
    );
  }

  /* 6. Insert lead */
  const { data: lead, error: insertError } = await supabase
    .from("leads")
    .insert([
      {
        name:         data.name.trim(),
        phone:        data.phone.trim(),
        email:        data.email.trim().toLowerCase(),
        skin_type:    data.skin_type ?? null,
        skin_concern: data.skin_concern ?? null,
        message:      data.message?.trim() ?? null,
        status:       "new",
      },
    ])
    .select()
    .single();

  if (insertError) {
    console.error("[POST /api/leads] Insert error:", insertError);
    return NextResponse.json(
      { error: "Failed to save your information. Please try again." },
      { status: 500 }
    );
  }

  /* 7. Fire-and-forget email notification */
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    `https://${request.headers.get("host")}`;

  fetch(`${siteUrl}/api/notify`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data),
  }).catch(() => {
    // Non-critical — log but don't fail the response
    console.warn("[POST /api/leads] Email notification failed silently.");
  });

  return NextResponse.json({ success: true, lead }, { status: 201 });
}
