import { navLabelOrTitle, pageInput } from "@/lib/admin-content";
import { requireAdminResponse } from "@/lib/admin-auth";
import { commitStore, getStore } from "@/lib/store";

type Context = { params: Promise<{ slug: string }> };

export async function PUT(request: Request, context: Context) {
  const denied = await requireAdminResponse();
  if (denied) return denied;
  const { slug } = await context.params;

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 80_000) return Response.json({ ok: false, error: "invalid" }, { status: 413 });

  const payload: unknown = await request.json().catch(() => null);
  const parsed = pageInput.safeParse(payload);
  if (!parsed.success || parsed.data.slug !== slug) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const store = getStore();
  const index = store.pages.findIndex((page) => page.slug === slug);
  if (index < 0) return Response.json({ ok: false, error: "missing" }, { status: 404 });

  store.pages[index] = {
    ...parsed.data,
    navLabel: navLabelOrTitle(parsed.data.title, parsed.data.navLabel),
    updatedAt: new Date().toISOString(),
  };
  commitStore(store);
  return Response.json({ ok: true, slug });
}

export async function DELETE(_request: Request, context: Context) {
  const denied = await requireAdminResponse();
  if (denied) return denied;
  const { slug } = await context.params;
  const store = getStore();
  const next = store.pages.filter((page) => page.slug !== slug);
  if (next.length === store.pages.length) return Response.json({ ok: false, error: "missing" }, { status: 404 });
  commitStore({ ...store, pages: next });
  return Response.json({ ok: true });
}
