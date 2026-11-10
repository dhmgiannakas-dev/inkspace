import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/articles";
import "./page.css";

/**
 * Displays the details of a Guardian article.
 */
interface ArticlePageProps {
  params: Promise<{ id: string[] }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id.join("/"));

  if (!article) {
    return { title: "Article Not Found | INKSPACE" };
  }

  return {
    title: `${article.webTitle} | INKSPACE`,
    description: article.fields?.trailText?.replace(/<[^>]*>/g, ""),
  };
}

export default function ArticlePage(props: ArticlePageProps) {
  return (
    <Suspense fallback={<div className="articleLoading">Loading article...</div>}>
      <ArticleContent {...props} />
    </Suspense>
  );
}

async function ArticleContent({ params }: ArticlePageProps) {
  const { id } = await params;

  const article = await getArticleById(id.join("/"));

  if (!article) {
    notFound();
  }

  return (
    <main className="articlePage">
      <div className="articleContainer">
        <Link href="/posts" className="articleBack">
          ← Back to posts
        </Link>

        <header className="articleHeader">
          <span className="articleSection">{article.sectionName}</span>

          <h1>{article.webTitle}</h1>

          <div className="articleMeta">
            {article.fields?.byline && (
              <span>By {article.fields.byline}</span>
            )}

            <span>
              {new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              }).format(new Date(article.webPublicationDate))}
            </span>
          </div>
        </header>

        {article.fields?.thumbnail && (
          <div className="articleHeroImage">
            <Image
              src={article.fields.thumbnail}
              alt={article.webTitle}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        )}

        <div className="articleBody">
          <p>
            {article.fields?.trailText?.replace(/<[^>]*>/g, "")}
          </p>

          <div className="articleSource">
            <p>
              This article was originally published by The Guardian.
            </p>

            <a
              href={article.webUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read full article on The Guardian
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}