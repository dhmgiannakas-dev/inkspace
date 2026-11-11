"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import "./MainHeader.css";

/** Responsive navigation with Better Auth and mobile menu. */
export default function MainHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
  if (!menuOpen) return;

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [menuOpen]);

useEffect(() => {
  if (!menuOpen) return;

  function handleOutsideClick(event: PointerEvent) {
    const target = event.target;

    if (
      target instanceof Node &&
      !headerRef.current?.contains(target)
    ) {
      setMenuOpen(false);
    }
  }

  document.addEventListener("pointerdown", handleOutsideClick);

  return () => {
    document.removeEventListener("pointerdown", handleOutsideClick);
  };
}, [menuOpen]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleLogout() {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    closeMenu();
    router.push("/");
    router.refresh();
  }

  return (
    <header ref={headerRef} className="mainHeader">
      <Link href="/" className="logo" onClick={closeMenu}>
        INKSPACE
      </Link>

      <button
        type="button"
        className="menuToggle"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="main-navigation"
        className={`headerContent ${menuOpen ? "menuOpen" : ""}`}
      >
        <nav className="navigation" aria-label="Main navigation">
          <Link
            href="/"
            className={`navLink ${isActive("/") ? "active" : ""}`}
            aria-current={isActive("/") ? "page" : undefined}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            href="/posts"
            className={`navLink ${isActive("/posts") ? "active" : ""}`}
            aria-current={isActive("/posts") ? "page" : undefined}
            onClick={closeMenu}
          >
            Posts
          </Link>

          <Link
            href="/about"
            className={`navLink ${isActive("/about") ? "active" : ""}`}
            aria-current={isActive("/about") ? "page" : undefined}
            onClick={closeMenu}
          >
            About
          </Link>
        </nav>

        <div className="headerActions">
          {!isPending &&
            (session ? (
              <>
                <span className="userGreeting">
                  Hello, {session.user.name}
                </span>

                <button
                  type="button"
                  className="logoutButton"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="loginLink"
                  onClick={closeMenu}
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  className="signupButton"
                  onClick={closeMenu}
                >
                  Get started
                </Link>
              </>
            ))}
        </div>
      </div>
    </header>
  );
}