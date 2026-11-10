import Link from "next/link";
import "./not-found.css";

/**
 * Displays the page for unknown routes.
 */
export default function NotFound() {
  return (
    <main className="notFoundPage">
      <span className="notFoundEyebrow">PAGE NOT FOUND</span>

      <h1>404</h1>

      <h2>This post doesn't exist.</h2>

      <p>
        The page you're looking for may have been moved,
        removed, or never existed.
      </p>

      <Link href="/" className="notFoundLink">
        Back to home
      </Link>
    </main>
  );
}