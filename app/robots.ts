import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const indexable = process.env.SITE_INDEXABLE !== "false";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(indexable ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
