"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/content/messages";
import { contactTopics } from "@/content/site";
import { l, type Locale } from "@/lib/i18n";

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "error">("idle");

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          topic: data.get("topic"),
          message: data.get("message"),
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
    <form onSubmit={onSubmit} className="grid gap-4" noValidate={false}>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">{copy.honeypot}</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          {copy.name}
          <Input name="name" required minLength={2} maxLength={120} autoComplete="name" />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          {copy.email}
          <Input name="email" type="email" required autoComplete="email" maxLength={160} />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-semibold">
        {copy.topic}
        <select name="topic" required className="min-h-11 border border-line bg-card px-3 text-base" defaultValue="research">
          {contactTopics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {l(locale, topic.label)}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        {copy.message}
        <Textarea name="message" required minLength={10} maxLength={4000} />
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4" />
        <span>{copy.consent}</span>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "pending"} className="min-h-11 bg-button px-4 font-semibold text-button-foreground disabled:opacity-60">
          {status === "pending" ? copy.sending : copy.send}
        </button>
        <p role="status" className="text-sm">
          {status === "ok" ? copy.successContact : null}
          {status === "error" ? copy.errorGeneric : null}
        </p>
      </div>
      <p className="text-sm text-muted">{copy.privacyNote}</p>
    </form>
  );
}
