import { cacheLife } from "next/cache";
import type { Article } from "@/types/article";

/**
 * Fetches Technology and Science articles with thumbnails.
 */
export async function getLatestArticles(): Promise<Article[]> {
  "use cache";

  cacheLife("hours");

  const apiKey = process.env.GUARDIAN_API_KEY;

  if (!apiKey) {
    throw new Error("GUARDIAN_API_KEY is missing");
  }

  const params = new URLSearchParams({
    section: "technology|science",
    "show-fields": "thumbnail,trailText,byline",
    "page-size": "30",
    "order-by": "newest",
    "api-key": apiKey,
  });

  const response = await fetch(
    `https://content.guardianapis.com/search?${params}`
  );

  if (!response.ok) {
    throw new Error(`Guardian API error: ${response.status}`);
  }

  const data: {
    response: {
      results: Article[];
    };
  } = await response.json();

  return data.response.results
    .filter((article) => Boolean(article.fields?.thumbnail))
    .slice(0, 9);
}