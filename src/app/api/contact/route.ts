import { NextResponse } from "next/server";
import { TOPICS, REPLY_METHODS, validateContact, type ContactPayload } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* --- very small in-memory rate limit (per server instance) --- */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const clip = (v: unknown, n: number) => String(v ?? "").slice(0, n).trim();

export async function POST(req: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn’t read that message. Please try again." }, { status: 400 });
  }

  const p: ContactPayload = {
    name: clip(body.name, 120),
    replyMethod: body.replyMethod as ContactPayload["replyMethod"],
    replyTo: clip(body.replyTo, 200),
    topic: body.topic as ContactPayload["topic"],
    message: clip(body.message, 4000),
    website: clip(body.website, 200),
    source: clip(body.source, 60),
  };

  // Honeypot filled in → almost certainly a bot. Pretend success, send nothing.
  if (p.website) return NextResponse.json({ ok: true });

  const errors = validateContact(p);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages were sent from this device. Please wait a few minutes." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const webhook = process.env.MESSAGE_WEBHOOK_URL;

  if (!(apiKey && to && from) && !webhook) {
    console.error("[contact] No delivery method configured (RESEND_* or MESSAGE_WEBHOOK_URL).");
    return NextResponse.json(
      { ok: false, error: "Online messaging isn’t set up yet." },
      { status: 503 },
    );
  }

  const topicLabel = TOPICS.find((t) => t.id === p.topic)?.label ?? p.topic;
  const methodLabel = REPLY_METHODS.find((m) => m.id === p.replyMethod)?.label ?? p.replyMethod;
  const subject = `[Website] ${topicLabel}${p.name ? ` — ${p.name}` : ""}`;
  const lines = [
    `Topic: ${topicLabel}`,
    `Name: ${p.name || "(not given)"}`,
    `Reply by: ${methodLabel}${p.replyMethod !== "none" ? ` — ${p.replyTo}` : ""}`,
    `Sent from: ${p.source || "website"}`,
    "",
    p.message,
  ];
  const text = lines.join("\n");

  let delivered = false;

  if (apiKey && to && from) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()),
          subject,
          text,
          html: `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`,
          ...(p.replyMethod === "email" ? { reply_to: p.replyTo } : {}),
        }),
      });
      if (r.ok) delivered = true;
      else console.error("[contact] Resend error", r.status, await r.text().catch(() => ""));
    } catch (e) {
      console.error("[contact] Resend request failed", e);
    }
  }

  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text, topic: p.topic, replyMethod: p.replyMethod, replyTo: p.replyTo, name: p.name }),
      });
      if (r.ok) delivered = true;
      else console.error("[contact] Webhook error", r.status);
    } catch (e) {
      console.error("[contact] Webhook request failed", e);
    }
  }

  if (!delivered) {
    return NextResponse.json({ ok: false, error: "We couldn’t send your message right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
