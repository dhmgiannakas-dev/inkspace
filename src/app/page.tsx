import Link from "next/link";
import { getLatestArticles } from "@/lib/articles";
import Image from "next/image";

import "./page.css";


export default async function HomePage() {
  const articles = await getLatestArticles();

  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1);

  return (
    <main className="homePage">
      <section className="hero">
        <span className="eyebrow">A space for ideas and stories</span>

        <h1 className="heroTitle">
          Stories worth <span>sharing.</span>
        </h1>

        <p className="heroDescription">
          Explore fresh perspectives, thoughtful ideas, and stories
          from the world of technology and science.
        </p>

        <a href="#latest-posts" className="exploreButton">
          Explore stories
        </a>
      </section>

      <section className="featuredSection">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">Editor's pick</span>
            <h2>Featured story</h2>
          </div>
        </div>

        {featuredArticle && (
          <article className="featuredPost">
            {featuredArticle.fields?.thumbnail && (
              <div className="featuredImage">
                <Image
                  src={featuredArticle.fields.thumbnail}
                  alt={featuredArticle.webTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
              </div>
            )}

            <div className="featuredContent">
              <span className="postCategory">
                {featuredArticle.sectionName}
              </span>

              <h3>{featuredArticle.webTitle}</h3>

              <p>
                {featuredArticle.fields?.trailText?.replace(
                  /<[^>]*>/g,
                  ""
                )}
              </p>

              <Link
                href={featuredArticle.webUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read article
              </Link>
            </div>
          </article>
        )}
      </section>

      <section className="latestSection" id="latest-posts">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">Fresh perspectives</span>
            <h2>Latest stories</h2>
          </div>
        </div>

        <div className="postsGrid">
          {latestArticles.map((article) => (
            <article key={article.id} className="postCard">
              {article.fields?.thumbnail && (
                <div className="postImage">
                  <Image
                    src={article.fields.thumbnail}
                    alt={article.webTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}

              <div className="postContent">
                <span className="postCategory">
                  {article.sectionName}
                </span>

                <h3>{article.webTitle}</h3>

                <p>
                  {article.fields?.trailText?.replace(/<[^>]*>/g, "")}
                </p>

                <div className="postFooter">
                  <span>
                    {article.fields?.byline ?? "The Guardian"}
                  </span>

                  <Link
                    href={article.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}