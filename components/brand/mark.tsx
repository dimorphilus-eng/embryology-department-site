export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="6" className="fill-pine" />
      <circle cx="24" cy="24" r="13" fill="none" className="stroke-button-foreground" strokeWidth="1.6" />
      <path d="M24 12.5c5.2 4.8 5.2 18.2 0 23" fill="none" className="stroke-button-foreground" strokeWidth="1.6" />
      <circle cx="19.5" cy="22" r="1.6" className="fill-button-foreground" />
      <circle cx="28.5" cy="27" r="1.6" className="fill-button-foreground" />
    </svg>
  );
}
