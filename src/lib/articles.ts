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

/**
 * Fetches paginated Guardian articles with optional search and category.
 */
export async function getArticles({
  search = "",
  category = "",
  page = 1,
}: {
  search?: string;
  category?: string;
  page?: number;
}): Promise<Article[]> {
  "use cache";

  cacheLife("hours");

  const apiKey = process.env.GUARDIAN_API_KEY;

  if (!apiKey) {
    throw new Error("GUARDIAN_API_KEY is missing");
  }

  const params = new URLSearchParams({
    "api-key": apiKey,
    "show-fields": "thumbnail,trailText,byline",
    "page-size": "10",
    "order-by": "newest",
  });

  if (search) {
    params.set("q", search);
  }

  if (category) {
    params.set("section", category);
  }

  if (page) {
    params.set("page", String(page));
  }

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

  return data.response.results;
}

/**
 * Fetches a single Guardian article by its ID.
 */
export async function getArticleById(
  id: string
): Promise<Article | null> {
  "use cache";
  cacheLife("hours");

  const apiKey = process.env.GUARDIAN_API_KEY;

  if (!apiKey) {
    throw new Error("GUARDIAN_API_KEY is missing");
  }

  const params = new URLSearchParams({
    "api-key": apiKey,
    "show-fields": "thumbnail,trailText,byline",
  });

  const response = await fetch(
    `https://content.guardianapis.com/${id}?${params.toString()}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Guardian API error: ${response.status}`);
  }

  const data: {
    response: {
      content: Article;
    };
  } = await response.json();

  return data.response.content;
}