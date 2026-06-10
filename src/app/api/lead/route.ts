import { NextRequest, NextResponse } from "next/server";

// Lead capture: creates a Contact + Deal in Sirius CRM (org resolved by API key).
// Secrets live in env vars (EasyPanel / .env) — this repo is public.
const SIRIUS_API_URL = process.env.SIRIUS_API_URL ?? "https://siriuscrm.com.br/api/v1";
// First stage ("Lead") of the "Estetia" pipeline in the ROI Labs org.
const SIRIUS_STAGE_ID = process.env.SIRIUS_STAGE_ID ?? "18a20ee2-6069-42a3-8494-1d9c8cd63d4b";

type LeadPayload = { name?: string; clinic?: string; whatsapp?: string };

async function sirius(path: string, body: unknown, apiKey: string) {
  const res = await fetch(`${SIRIUS_API_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new Error(
      `Sirius ${path} failed (${res.status}): ${json?.error?.message ?? "unknown"}`
    );
  }
  return json.data;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.SIRIUS_API_KEY;
  if (!apiKey) {
    console.error("[lead] SIRIUS_API_KEY not configured");
    return NextResponse.json({ ok: false, error: "misconfigured" }, { status: 500 });
  }

  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const name = payload.name?.trim();
  const clinic = payload.clinic?.trim();
  const whatsapp = payload.whatsapp?.trim();
  if (!name || !clinic || !whatsapp) {
    return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
  }

  try {
    const contactData = await sirius("/contacts", {
      name,
      phone: whatsapp,
      company: clinic,
    }, apiKey);
    // API returns data.{id,...} directly; older docs say data.contact.{id}. Accept both.
    const contactId: string | undefined = contactData?.id ?? contactData?.contact?.id;

    // Deal places the lead on the "Estetia" pipeline board. If it fails, the
    // contact still exists in the CRM, so we don't fail the whole request.
    try {
      await sirius("/deals", {
        title: `Site para ${clinic}`,
        stageId: SIRIUS_STAGE_ID,
        ...(contactId ? { contactId } : {}),
      }, apiKey);
    } catch (dealErr) {
      console.error("[lead] deal creation failed (contact saved):", dealErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] contact creation failed:", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
