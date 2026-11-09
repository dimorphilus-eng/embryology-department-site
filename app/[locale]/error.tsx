"use client";

import { useEffect } from "react";

export default function LocaleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    document.documentElement.lang = window.location.pathname.startsWith("/en") ? "en" : "ru";
  }, []);
  const english = typeof document !== "undefined" && document.documentElement.lang === "en";

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-20">
      <h1 className="font-serif text-4xl">{english ? "This page did not open" : "Страница не открылась"}</h1>
      <p className="mt-3 text-muted">
        {english ? "Reload it. If it happens again, write to the teaching office." : "Обновите её. Если это повторится, напишите в учебный офис."}
      </p>
      <button type="button" onClick={reset} className="mt-6 min-h-11 bg-button px-4 font-semibold text-button-foreground">
        {english ? "Try again" : "Повторить"}
      </button>
    </div>
  );
}
