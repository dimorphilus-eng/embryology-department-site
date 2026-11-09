import { z } from "zod";

const schema = z.object({
  email: z.email().max(160),
  consent: z.literal(true),
  company: z.string().optional(),
  locale: z.enum(["ru", "en"]),
});

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 8_000) return Response.json({ ok: false }, { status: 413 });
  const payload: unknown = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return Response.json({ ok: false }, { status: 400 });
  return Response.json({ ok: true });
}
