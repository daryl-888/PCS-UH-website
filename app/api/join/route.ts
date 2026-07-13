import { NextResponse } from "next/server";
import { z } from "zod";

const joinSchema = z.object({
  fullName: z.string().min(2),
  email: z
    .string()
    .email()
    .refine((v) => v.toLowerCase().endsWith("uh.edu")),
  major: z.string().min(2),
  gradYear: z.string().regex(/^20\d{2}$/),
  experience: z.enum(["Beginner", "Intermediate", "Advanced"]),
  interests: z.array(z.string()).min(1),
});

/**
 * Membership request endpoint (placeholder).
 *
 * To send real emails, install Resend (`npm i resend`), set RESEND_API_KEY
 * in .env.local, and uncomment the block below. Alternatively wire this
 * payload into Google Sheets, Airtable, Discord webhooks, etc.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = joinSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  // --- Resend integration (uncomment after adding RESEND_API_KEY) --------
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "UH PCS <onboarding@resend.dev>",
  //   to: ["uhpcs@uh.edu"], // TODO: officer inbox
  //   subject: `New member request: ${parsed.data.fullName}`,
  //   text: JSON.stringify(parsed.data, null, 2),
  // });
  // -----------------------------------------------------------------------

  console.log("[UH PCS] membership request:", parsed.data);
  return NextResponse.json({ ok: true });
}
