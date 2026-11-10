import { initials } from "@/lib/i18n";

export function Monogram({ name, className = "h-16 w-16 text-xl" }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center bg-pine font-serif text-button-foreground ${className}`}
    >
      {initials(name)}
    </span>
  );
}
