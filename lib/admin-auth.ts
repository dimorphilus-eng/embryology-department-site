import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "embryology_admin";
const SESSION_MS = 1000 * 60 * 60 * 12;

export function adminPassword() {
  const fromEnv = process.env.ADMIN_PASSWORD?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "development") return "embryology";
  return null;
}

export function showsDevPassword() {
  return process.env.NODE_ENV === "development" && !process.env.ADMIN_PASSWORD?.trim();
}

function sign(expiry: string) {
  const password = adminPassword();
  if (!password) return null;
  return createHmac("sha256", password).update(expiry).digest("hex");
}

export function createSessionValue() {
  const expiry = String(Date.now() + SESSION_MS);
  const mac = sign(expiry);
  if (!mac) return null;
  return `${expiry}.${mac}`;
}

export function sessionValid(value: string | undefined) {
  if (!value) return false;
  const [expiry, mac] = value.split(".");
  if (!expiry || !mac || Number(expiry) < Date.now()) return false;
  const expected = sign(expiry);
  if (!expected) return false;
  const left = Buffer.from(mac);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function isAdmin() {
  const jar = await cookies();
  return sessionValid(jar.get(ADMIN_COOKIE)?.value);
}

export function passwordMatches(input: string, expected: string) {
  const left = createHash("sha256").update(input).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

export function cookieOptions(request: Request) {
  const forwarded = request.headers.get("x-forwarded-proto");
  const secure = forwarded === "https" || request.url.startsWith("https:");
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}

export async function requireAdminResponse() {
  if (await isAdmin()) return null;
  return Response.json({ ok: false, error: "auth" }, { status: 401 });
}
