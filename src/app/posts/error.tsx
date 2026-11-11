"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./error.css";

/** Displays an error state for article pages. */
interface PostsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PostsError({
  error,
  reset,
}: PostsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="postsErrorPage">
      <div className="postsErrorContent">
        <span className="postsErrorEyebrow">
          SOMETHING WENT WRONG
        </span>

        <h1>We couldn&apos;t load the posts.</h1>

        <p>
          Something unexpected happened while loading the content.
          Please try again in a moment.
        </p>

        <div className="postsErrorActions">
          <button type="button" onClick={reset}>
            Try again
          </button>

          <Link href="/">Back to home</Link>
        </div>
      </div>
    </main>
  );
}