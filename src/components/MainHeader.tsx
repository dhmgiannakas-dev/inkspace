"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./MainHeader.css";

/**
 * Main navigation header with active route highlighting.
 */
export default function MainHeader() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="mainHeader">
      <Link href="/" className="logo">
        INKSPACE
      </Link>

      <nav className="navigation" aria-label="Main navigation">
        <Link
          href="/"
          className={`navLink ${isActive("/") ? "active" : ""}`}
          aria-current={isActive("/") ? "page" : undefined}
        >
          Home
        </Link>

        <Link
          href="/explore"
          className={`navLink ${isActive("/explore") ? "active" : ""}`}
          aria-current={isActive("/explore") ? "page" : undefined}
        >
          Explore
        </Link>

        <Link
          href="/about"
          className={`navLink ${isActive("/about") ? "active" : ""}`}
          aria-current={isActive("/about") ? "page" : undefined}
        >
          About
        </Link>
      </nav>

      <div className="headerActions">
        <Link href="/login" className="loginLink">
          Log in
        </Link>

        <Link href="/register" className="signupButton">
          Get started
        </Link>
      </div>
    </header>
  );
}