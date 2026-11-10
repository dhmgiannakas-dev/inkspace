import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles } from "@/lib/articles";
import PostsSearch from "@/components/PostsSearch";
import "../page.css";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  const titles: Record<string, string> = {
    technology: "Technology",
    science: "Science",
    culture: "Culture",
  };

  const title = titles[category] ?? "Stories";

  return {
    title: `${title} Stories | INKSPACE`,
    description: `Explore the latest ${title.toLowerCase()} stories, news, and perspectives on INKSPACE.`,
  };
}

/**
 * Displays Guardian articles filtered by category.
 */
interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <Suspense fallback={<div className="skeleton skeletonSearch" />}>
      <CategoryContent {...props} />
    </Suspense>
  );
}

async function CategoryContent({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const query = await searchParams;

  const categories = [
    { label: "All Posts", href: "/posts" },
    { label: "Technology", href: "/posts/technology" },
    { label: "Science", href: "/posts/science" },
    { label: "Culture", href: "/posts/culture" },
  ];

  const activeCategory = categories.find(
    (item) => item.href === `/posts/${category}`
  );

  if (!activeCategory) {
    notFound();
  }

  const search = query.search ?? "";
  const page = Math.max(1, Math.floor(Number(query.page) || 1));

  const articles = await getArticles({ category, search, page });

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    params.set("page", String(pageNumber));

    return `/posts/${category}?${params.toString()}`;
  };

  return (
    <main className="postsPage">
      <section className="postsHero">
        <span className="postsEyebrow">EXPLORE INKSPACE</span>
        <h1>{activeCategory.label} posts.</h1>
        <p>
          Explore the latest stories and perspectives in{" "}
          {activeCategory.label.toLowerCase()}.
        </p>
      </section>

      <section className="postsContainer">
        <Suspense fallback={<div className="skeleton skeletonSearch" />}>
          <PostsSearch />
        </Suspense>

        <nav className="postsCategories" aria-label="Article categories">
          {categories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.href === `/posts/${category}`
                  ? "categoryLink activeCategory"
                  : "categoryLink"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="postsHeading">
          <h2>
            {search
              ? `Results for "${search}"`
              : `Latest ${activeCategory.label.toLowerCase()} posts`}
          </h2>
          <span>Page {page}</span>
        </div>

        {articles.length > 0 ? (
          <div className="postsList">
            {articles.map((article) => (
              <article key={article.id} className="articleCard">
                {article.fields?.thumbnail && (
                  <div className="articleImage">
                    <Image
                      src={article.fields.thumbnail}
                      alt={article.webTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                <div className="articleContent">
                  <span className="articleCategory">
                    {article.sectionName}
                  </span>

                  <h3>{article.webTitle}</h3>

                  <p>
                    {article.fields?.trailText?.replace(/<[^>]*>/g, "")}
                  </p>

                  <div className="articleFooter">
                    <span>
                      {new Intl.DateTimeFormat("en", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      }).format(new Date(article.webPublicationDate))}
                    </span>

                    <Link href={`/posts/article/${article.id}`}>
                      Read article
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="postsEmpty">
            No articles found. Try a different search.
          </p>
        )}

        <div className="postsPagination">
          {page > 1 && (
            <Link href={createPageUrl(page - 1)}>Previous</Link>
          )}

          {articles.length === 10 && (
            <Link href={createPageUrl(page + 1)}>Next</Link>
          )}
        </div>
      </section>
    </main>
  );
}