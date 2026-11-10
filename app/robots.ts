import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const indexable = process.env.SITE_INDEXABLE !== "false";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable
      ? [
          { userAgent: "*", allow: "/" },
          { userAgent: "*", disallow: "/admin" },
        ]
      : { userAgent: "*", disallow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
