import { NextResponse } from "next/server";
import { z } from "zod";
import { ADMIN_COOKIE, adminPassword, cookieOptions, createSessionValue, passwordMatches } from "@/lib/admin-auth";

const schema = z.object({
  password: z.string().min(1).max(200),
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
  if (limited(request)) return Response.json({ ok: false, error: "limited" }, { status: 429 });
  const password = adminPassword();
  if (!password) return Response.json({ ok: false, error: "unconfigured" }, { status: 503 });

  const payload: unknown = await request.json().catch(() => null);
  const parsed = schema.safeParse(payload);
  if (!parsed.success || !passwordMatches(parsed.data.password, password)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  const session = createSessionValue();
  if (!session) return Response.json({ ok: false, error: "unconfigured" }, { status: 503 });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, session, cookieOptions(request));
  return response;
}
