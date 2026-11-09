"use client";

import { useState, useSyncExternalStore } from "react";
import { t } from "@/content/messages";
import { a11yChangeEvent, applyA11y, defaultA11y, readA11y, type A11yState } from "@/lib/a11y";
import type { Locale } from "@/lib/i18n";

function subscribeA11y(onStoreChange: () => void) {
  window.addEventListener(a11yChangeEvent, onStoreChange);
  return () => window.removeEventListener(a11yChangeEvent, onStoreChange);
}

function Choice<T extends string>({
  label,
  value,
  current,
  onSelect,
}: {
  label: string;
  value: T;
  current: T;
  onSelect: (value: T) => void;
}) {
  const selected = value === current;
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(value)}
      className={`min-h-11 border px-3 text-sm ${selected ? "bg-button text-button-foreground" : "border-line bg-card text-foreground"}`}
    >
      {label}
    </button>
  );
}

export function A11yPanel({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const [open, setOpen] = useState(false);
  const state = useSyncExternalStore(subscribeA11y, readA11y, () => defaultA11y);

  function update<K extends keyof A11yState>(key: K, value: A11yState[K]) {
    applyA11y({ ...state, [key]: value });
  }

  function reset() {
    applyA11y(defaultA11y);
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="min-h-11 underline-offset-4 hover:underline"
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {copy.a11yOpen}
      </button>
      {open ? (
        <div id="a11y-panel" className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,36rem)] border border-line bg-card p-4 text-foreground shadow-none">
          <div className="flex items-start justify-between gap-4">
            <p className="font-serif text-xl">{copy.a11yTitle}</p>
            <button type="button" className="min-h-11 px-2 text-sm underline" onClick={() => setOpen(false)}>
              {copy.a11yClose}
            </button>
          </div>
          <div className="mt-4 grid gap-4">
            <fieldset>
              <legend className="text-sm font-semibold">{copy.a11yFont}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                <Choice label={copy.a11yFontNormal} value="normal" current={state.font} onSelect={(value) => update("font", value)} />
                <Choice label={copy.a11yFontLarge} value="large" current={state.font} onSelect={(value) => update("font", value)} />
                <Choice label={copy.a11yFontXLarge} value="xlarge" current={state.font} onSelect={(value) => update("font", value)} />
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">{copy.a11yTheme}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                <Choice label={copy.a11yThemeDefault} value="default" current={state.theme} onSelect={(value) => update("theme", value)} />
                <Choice label={copy.a11yThemeBw} value="bw" current={state.theme} onSelect={(value) => update("theme", value)} />
                <Choice label={copy.a11yThemeWb} value="wb" current={state.theme} onSelect={(value) => update("theme", value)} />
                <Choice label={copy.a11yThemeYb} value="yb" current={state.theme} onSelect={(value) => update("theme", value)} />
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">{copy.a11ySpacing}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                <Choice label={copy.a11ySpacingNormal} value="normal" current={state.spacing} onSelect={(value) => update("spacing", value)} />
                <Choice label={copy.a11ySpacingWide} value="wide" current={state.spacing} onSelect={(value) => update("spacing", value)} />
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">{copy.a11yImages}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                <Choice label={copy.a11yImagesOn} value="on" current={state.images} onSelect={(value) => update("images", value)} />
                <Choice label={copy.a11yImagesOff} value="off" current={state.images} onSelect={(value) => update("images", value)} />
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">{copy.a11yLinks}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                <Choice label={copy.a11yLinksNormal} value="normal" current={state.links} onSelect={(value) => update("links", value)} />
                <Choice label={copy.a11yLinksUnderline} value="underline" current={state.links} onSelect={(value) => update("links", value)} />
              </div>
            </fieldset>
          </div>
          <button type="button" className="mt-4 min-h-11 text-sm underline" onClick={reset}>
            {copy.a11yReset}
          </button>
        </div>
      ) : null}
    </div>
  );
}
