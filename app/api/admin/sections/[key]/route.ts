import { sectionInput } from "@/lib/admin-content";
import { requireAdminResponse } from "@/lib/admin-auth";
import { isSectionKey } from "@/lib/sections";
import { commitStore, getStore, type ManagedSection } from "@/lib/store";

type Context = { params: Promise<{ key: string }> };

function blank(section: ManagedSection) {
  return [section.title, section.lead, section.body].every((field) => !field.ru.trim() && !field.en.trim());
}

export async function PUT(request: Request, context: Context) {
  const denied = await requireAdminResponse();
  if (denied) return denied;
  const { key } = await context.params;
  if (!isSectionKey(key)) return Response.json({ ok: false, error: "missing" }, { status: 404 });

  const length = Number(request.headers.get("content-length") || 0);
  if (length > 80_000) return Response.json({ ok: false, error: "invalid" }, { status: 413 });

  const payload: unknown = await request.json().catch(() => null);
  const parsed = sectionInput.safeParse(payload);
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const store = getStore();
  const next: ManagedSection = { key, ...parsed.data, updatedAt: new Date().toISOString() };
  const sections = blank(next)
    ? store.sections.filter((item) => item.key !== key)
    : [...store.sections.filter((item) => item.key !== key), next];
  commitStore({ ...store, sections });
  return Response.json({ ok: true });
}
