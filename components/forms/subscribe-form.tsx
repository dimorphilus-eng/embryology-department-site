"use client";

import { useState } from "react";
import { t } from "@/content/messages";
import type { Locale } from "@/lib/i18n";

export function SubscribeForm({ locale, tone = "default" }: { locale: Locale; tone?: "default" | "inverse" }) {
  const copy = t(locale);
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "error">("idle");
  const field = tone === "inverse" ? "border-header-foreground/40 bg-header text-header-foreground placeholder:text-header-muted" : "border-line bg-card text-foreground";
  const button = tone === "inverse" ? "bg-header-foreground text-header" : "bg-button text-button-foreground";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    setStatus("pending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          consent: data.get("consent") === "on",
          company: data.get("company") ?? "",
          locale,
        }),
      });
      if (!response.ok) throw new Error("invalid");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`company-${tone}`}>{copy.honeypot}</label>
        <input id={`company-${tone}`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="grid gap-1 text-sm font-semibold">
        {copy.email}
        <input name="email" type="email" required autoComplete="email" maxLength={160} className={`min-h-11 border px-3 ${field}`} />
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4" />
        <span>{copy.consent}</span>
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={status === "pending"} className={`min-h-11 px-4 text-sm font-semibold disabled:opacity-60 ${button}`}>
          {status === "pending" ? copy.sending : copy.subscribeButton}
        </button>
        <p role="status" className="text-sm">
          {status === "ok" ? copy.successSubscribe : null}
          {status === "error" ? copy.errorGeneric : null}
        </p>
      </div>
    </form>
  );
}
