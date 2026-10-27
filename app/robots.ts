import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "Bingbot",
          "bingbot",
          "Meta-ExternalAgent",
          "FacebookBot",
          "cohere-ai",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    host: "https://www.kidenzo.store",
    sitemap: "https://www.kidenzo.store/sitemap.xml",
  };
}
