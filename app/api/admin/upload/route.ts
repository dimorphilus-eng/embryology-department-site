import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { requireAdminResponse } from "@/lib/admin-auth";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
};

const maxBytes = 8 * 1024 * 1024;

function matches(ext: string, bytes: Buffer) {
  if (ext === "jpg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (ext === "png") return bytes.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  if (ext === "gif") return bytes.subarray(0, 3).equals(Buffer.from("GIF"));
  if (ext === "webp") return bytes.subarray(0, 4).equals(Buffer.from("RIFF")) && bytes.subarray(8, 12).equals(Buffer.from("WEBP"));
  if (ext === "pdf") return bytes.subarray(0, 4).equals(Buffer.from("%PDF"));
  return false;
}

export async function POST(request: Request) {
  const denied = await requireAdminResponse();
  if (denied) return denied;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ ok: false, error: "file" }, { status: 400 });

  const ext = types[file.type];
  if (!ext) return Response.json({ ok: false, error: "type" }, { status: 400 });
  if (file.size > maxBytes) return Response.json({ ok: false, error: "size" }, { status: 413 });

  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > maxBytes || !matches(ext, bytes)) {
    return Response.json({ ok: false, error: bytes.length > maxBytes ? "size" : "type" }, { status: 400 });
  }

  const name = `${randomBytes(12).toString("hex")}.${ext}`;
  const dir = path.join(process.cwd(), "data", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, name), bytes);
  return Response.json({ ok: true, url: `/uploads/${name}` });
}
