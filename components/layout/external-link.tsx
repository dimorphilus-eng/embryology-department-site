export function ExternalLink({
  href,
  children,
  newTabLabel,
  className,
}: {
  href: string;
  children: React.ReactNode;
  newTabLabel: string;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}
