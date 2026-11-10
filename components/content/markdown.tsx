import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function safeHref(href: string | undefined) {
  if (!href) return undefined;
  if (href.startsWith("/") || href.startsWith("#") || href.startsWith("mailto:")) return href;
  try {
    const url = new URL(href);
    if (url.protocol === "http:" || url.protocol === "https:") return href;
  } catch {
    return undefined;
  }
  return undefined;
}

function safeImage(src: string | undefined) {
  if (!src) return undefined;
  if (src.startsWith("/uploads/")) return src;
  try {
    const url = new URL(src);
    if (url.protocol === "https:") return src;
  } catch {
    return undefined;
  }
  return undefined;
}

export function MarkdownView({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          const safe = safeHref(href);
          if (!safe) return <span>{children}</span>;
          const external = safe.startsWith("http");
          return (
            <a href={safe} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
              {children}
            </a>
          );
        },
        img: ({ src, alt }) => {
          const safe = safeImage(typeof src === "string" ? src : undefined);
          if (!safe) return null;
          return <img src={safe} alt={alt ?? ""} />;
        },
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
