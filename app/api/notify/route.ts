import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/notify
 * Called (fire-and-forget) when a new lead is submitted.
 * Sends an email notification to the admin via Resend.
 *
 * To enable: set RESEND_API_KEY and ADMIN_EMAIL in .env.local
 */
export async function POST(request: NextRequest) {
  // Skip silently if Resend is not configured
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ skipped: true });
  }

  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Glamour Glow <noreply@glamourglow.com>", // Use your verified domain
      to: process.env.ADMIN_EMAIL ?? "admin@glamourglow.com",
      subject: `🌸 New Lead: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #f43f6b; font-family: Georgia, serif;">New Lead Received!</h2>
          <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 10px; font-weight:600; color:#1c1917; width:30%;">Name</td>
              <td style="padding: 10px; color:#44403c;">${name}</td>
            </tr>
            <tr style="background:#fafaf9;">
              <td style="padding: 10px; font-weight:600; color:#1c1917;">Phone</td>
              <td style="padding: 10px; color:#44403c;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight:600; color:#1c1917;">Email</td>
              <td style="padding: 10px; color:#44403c;">${email}</td>
            </tr>
            <tr style="background:#fafaf9;">
              <td style="padding: 10px; font-weight:600; color:#1c1917;">Message</td>
              <td style="padding: 10px; color:#44403c;">${message || "—"}</td>
            </tr>
          </table>
          <div style="margin-top:24px; padding:16px; background:#fff1f3; border-radius:8px; border:1px solid #fecdd6;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-site.vercel.app"}/admin"
               style="color:#f43f6b; font-weight:600; text-decoration:none;">
              → Open Admin Dashboard
            </a>
          </div>
          <p style="color:#a8a29e; font-size:12px; margin-top:20px;">
            Glamour Glow Lead Management System
          </p>
        </div>
      `,
    });

    return NextResponse.json({ sent: true });
  } catch (error) {
    console.error("Email notification error:", error);
    // Return 200 anyway — don't fail the lead submission over email
    return NextResponse.json({ error: "Email failed but lead was saved." });
  }
}
