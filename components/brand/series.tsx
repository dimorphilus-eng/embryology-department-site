function StageIcon({ index }: { index: number }) {
  const common = "h-14 w-14 text-pine";
  if (index === 0) {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="32" cy="32" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M32 16v32M16 32h32" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="32" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
        <path d="M16 38c6-16 26-16 32 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 36c6 8 18 8 24 0" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={common} aria-hidden="true">
      <circle cx="24" cy="34" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="38" cy="28" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 22c8-8 20-6 28 2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function DevelopmentalSeries({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item, index) => (
        <li key={item.title} className="border border-line bg-card p-4">
          <div className="media-visual">
            <StageIcon index={index} />
          </div>
          <p className="font-serif text-xl leading-tight">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
