export const A11Y_STORAGE_KEY = "embryology-a11y";

export const a11yBootScript = `(function(){try{var s=JSON.parse(localStorage.getItem("${A11Y_STORAGE_KEY}")||"{}");var r=document.documentElement;if(s.font)r.dataset.font=s.font;if(s.theme)r.dataset.theme=s.theme;if(s.spacing)r.dataset.spacing=s.spacing;if(s.images)r.dataset.images=s.images;if(s.links)r.dataset.links=s.links;var path=location.pathname;r.lang=path.indexOf("/en")===0?"en":"ru";r.style.colorScheme=(s.theme==="wb"||s.theme==="yb")?"dark":"light";}catch(e){}})();`;

export type A11yState = {
  font: "normal" | "large" | "xlarge";
  theme: "default" | "bw" | "wb" | "yb";
  spacing: "normal" | "wide";
  images: "on" | "off";
  links: "normal" | "underline";
};

export const defaultA11y: A11yState = {
  font: "normal",
  theme: "default",
  spacing: "normal",
  images: "on",
  links: "normal",
};

export const a11yChangeEvent = "embryology-a11y-change";

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && allowed.includes(value as T) ? (value as T) : fallback;
}

let cachedA11yRaw = "";
let cachedA11yState: A11yState = defaultA11y;

export function readA11y(): A11yState {
  if (typeof window === "undefined") return defaultA11y;
  const raw = localStorage.getItem(A11Y_STORAGE_KEY) || "";
  if (raw === cachedA11yRaw) return cachedA11yState;
  cachedA11yRaw = raw;
  try {
    const saved = JSON.parse(raw || "{}") as Partial<A11yState>;
    cachedA11yState = {
      font: oneOf(saved.font, ["normal", "large", "xlarge"] as const, "normal"),
      theme: oneOf(saved.theme, ["default", "bw", "wb", "yb"] as const, "default"),
      spacing: oneOf(saved.spacing, ["normal", "wide"] as const, "normal"),
      images: oneOf(saved.images, ["on", "off"] as const, "on"),
      links: oneOf(saved.links, ["normal", "underline"] as const, "normal"),
    };
  } catch {
    cachedA11yState = defaultA11y;
  }
  return cachedA11yState;
}

export function applyA11y(state: A11yState) {
  const root = document.documentElement;
  if (state.font === "normal") delete root.dataset.font;
  else root.dataset.font = state.font;
  if (state.theme === "default") delete root.dataset.theme;
  else root.dataset.theme = state.theme;
  if (state.spacing === "normal") delete root.dataset.spacing;
  else root.dataset.spacing = state.spacing;
  if (state.images === "on") delete root.dataset.images;
  else root.dataset.images = state.images;
  if (state.links === "normal") delete root.dataset.links;
  else root.dataset.links = state.links;
  root.style.colorScheme = state.theme === "wb" || state.theme === "yb" ? "dark" : "light";
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(a11yChangeEvent));
}
