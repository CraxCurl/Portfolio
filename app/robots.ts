import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://yourthera.xyz/sitemap.xml",
    host: "https://yourthera.xyz",
  };
}

