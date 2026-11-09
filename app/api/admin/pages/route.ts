import { navLabelOrTitle, pageInput } from "@/lib/admin-content";
import { requireAdminResponse } from "@/lib/admin-auth";
import { commitStore, getStore } from "@/lib/store";

export async function POST(request: Request) {
  const denied = await requireAdminResponse();
  if (denied) return denied;

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 80_000) return Response.json({ ok: false, error: "invalid" }, { status: 413 });

  const payload: unknown = await request.json().catch(() => null);
  const parsed = pageInput.safeParse(payload);
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const store = getStore();
  if (store.pages.some((page) => page.slug === parsed.data.slug)) {
    return Response.json({ ok: false, error: "taken" }, { status: 409 });
  }

  store.pages.push({
    ...parsed.data,
    navLabel: navLabelOrTitle(parsed.data.title, parsed.data.navLabel),
    updatedAt: new Date().toISOString(),
  });
  commitStore(store);
  return Response.json({ ok: true, slug: parsed.data.slug });
}
