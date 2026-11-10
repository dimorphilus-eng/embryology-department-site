export const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="text-pine underline underline-offset-4" />
  ),
  Callout: ({ children }: { children?: React.ReactNode }) => (
    <aside className="my-6 border border-line bg-bronze-soft px-4 py-3 leading-relaxed text-foreground">{children}</aside>
  ),
};
