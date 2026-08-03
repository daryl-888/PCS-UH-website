export const runtime = "nodejs";

const CHAT_BACKEND_URL = process.env.CHAT_BACKEND_URL ?? "https://chat.uh-pcs.org";
const CHAT_SHARED_SECRET = process.env.CHAT_SHARED_SECRET;

const UNAVAILABLE_MESSAGE =
  "Sorry — the AI backend is unreachable right now. Email contact@uh-pcs.org.";

function unavailable() {
  return new Response(UNAVAILABLE_MESSAGE, {
    status: 502,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

/**
 * Proxies chat requests to the PCS chatbot running on the club's home GPU
 * server. This runs server-side only, so CHAT_SHARED_SECRET never reaches
 * the browser — unlike embedding it directly in client JS, which would make
 * the "shared secret" visible to anyone via devtools.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (CHAT_SHARED_SECRET) {
    headers["X-PCS-Internal-Key"] = CHAT_SHARED_SECRET;
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${CHAT_BACKEND_URL}/api/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  } catch {
    return unavailable();
  }

  if (!upstream.ok || !upstream.body) {
    return unavailable();
  }

  return new Response(upstream.body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
