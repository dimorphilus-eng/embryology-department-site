import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const types: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
};

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  const ext = name.split(".").pop() ?? "";
  if (!/^[a-f0-9]{24}\.(jpg|png|webp|gif|pdf)$/.test(name) || !types[ext]) {
    return new Response(null, { status: 404 });
  }

  const file = path.join(process.cwd(), "data", "uploads", name);
  if (!fs.existsSync(file)) return new Response(null, { status: 404 });

  const bytes = fs.readFileSync(file);
  return new Response(bytes, {
    headers: {
      "content-type": types[ext],
      "content-length": String(bytes.byteLength),
      "cache-control": "public, max-age=31536000, immutable",
      "x-content-type-options": "nosniff",
    },
  });
}
