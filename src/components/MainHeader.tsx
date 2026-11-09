"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./MainHeader.css";

export default function MainHeader() {
  const pathname = usePathname();

  return (
    <header className="main-header">
      <Link href="/" className="main-header__logo">
        INKSPACE
      </Link>

      <nav className="main-header__nav">
        <Link
          href="/"
          className={pathname === "/" ? "main-header__nav--active" : ""}
        >
          Home
        </Link>

        <Link
          href="/explore"
          className={pathname === "/explore" ? "main-header__nav--active" : ""}
        >
          Explore
        </Link>

        <Link
          href="/about"
          className={pathname === "/about" ? "main-header__nav--active" : ""}
        >
          About
        </Link>
      </nav>

      <div className="main-header__actions">
        <Link href="/login" className="main-header__login">
          Log in
        </Link>

        <Link href="/register" className="main-header__signup">
          Get started
        </Link>
      </div>
    </header>
  );
}