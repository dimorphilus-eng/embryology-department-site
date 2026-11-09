import { getFileArticles } from "@/lib/articles";
import { articleInput } from "@/lib/admin-content";
import { requireAdminResponse } from "@/lib/admin-auth";
import { commitStore, getStore } from "@/lib/store";

export async function POST(request: Request) {
  const denied = await requireAdminResponse();
  if (denied) return denied;

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 80_000) return Response.json({ ok: false, error: "invalid" }, { status: 413 });

  const payload: unknown = await request.json().catch(() => null);
  const parsed = articleInput.safeParse(payload);
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const store = getStore();
  const taken =
    store.articles.some((article) => article.slug === parsed.data.slug) ||
    getFileArticles().some((article) => article.slug === parsed.data.slug);
  if (taken) return Response.json({ ok: false, error: "taken" }, { status: 409 });

  store.articles.push({ ...parsed.data, updatedAt: new Date().toISOString() });
  commitStore(store);
  return Response.json({ ok: true, slug: parsed.data.slug });
}
