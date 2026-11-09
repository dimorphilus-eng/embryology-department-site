import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(160),
  topic: z.enum(["admission", "study", "research", "other"]),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
  company: z.string().optional(),
  locale: z.enum(["ru", "en"]),
});

const hits = new Map<string, { count: number; reset: number }>();

function limited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || current.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 8;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 20_000) return Response.json({ ok: false }, { status: 413 });
  if (limited(request)) return Response.json({ ok: false }, { status: 429 });

  const payload: unknown = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return Response.json({ ok: false }, { status: 400 });
  if (parsed.data.company) return Response.json({ ok: true });

  return Response.json({ ok: true });
}
