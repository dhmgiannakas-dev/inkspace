import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/articles";
import PostsSearch from "@/components/PostsSearch";
import { Suspense } from "react";

import "./page.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Posts | INKSPACE",
  description:
    "Discover the latest posts in technology, science, and culture on INKSPACE.",
};

interface PostsPageProps {
    searchParams: Promise<{
        search?: string;
        page?: string;
    }>;
}

/**
 * Displays searchable, paginated Guardian articles.
 */
export default async function PostsPage({
    searchParams,
}: PostsPageProps) {
    const params = await searchParams;

    const search = params.search ?? "";
    const page = Math.max(1, Number(params.page) || 1);

    const articles = await getArticles({ search, page });

    const categories = [
        { label: "All posts", href: "/posts" },
        { label: "Technology", href: "/posts/technology" },
        { label: "Science", href: "/posts/science" },
        { label: "Culture", href: "/posts/culture" },
    ];

    return (
        <main className="postsPage">
            <section className="postsHero">
                <span className="postsEyebrow">EXPLORE INKSPACE</span>
                <h1>Discover Posts.</h1>
                <p>
                    Explore ideas, discoveries and perspectives from around the world.
                </p>
            </section>

            <section className="postsContainer">
                <Suspense fallback={<div className="skeleton skeletonSearch" />}>
                    <PostsSearch />
                </Suspense>

                <nav className="postsCategories" aria-label="Article categories">
                    {categories.map((category) => (
                        <Link
                            key={category.href}
                            href={category.href}
                            className={
                                category.href === "/posts"
                                    ? "categoryLink activeCategory"
                                    : "categoryLink"
                            }
                        >
                            {category.label}
                        </Link>
                    ))}
                </nav>

                <div className="postsHeading">
                    <h2>{search ? `Results for "${search}"` : "Latest Posts"}</h2>
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

                                        <Link
                                            href={article.webUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
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
                        <Link
                            href={`/posts?${new URLSearchParams({
                                search,
                                page: String(page - 1),
                            })}`}
                        >
                            Previous
                        </Link>
                    )}

                    {articles.length === 10 && (
                        <Link
                            href={`/posts?${new URLSearchParams({
                                search,
                                page: String(page + 1),
                            })}`}
                        >
                            Next
                        </Link>
                    )}
                </div>
            </section>
        </main>
    );
}