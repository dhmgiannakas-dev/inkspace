import Link from "next/link";
import { cacheLife } from "next/cache";

import "./MainFooter.css";


async function getCurrentYear() {
    "use cache";

    cacheLife("days");

    return new Date().getFullYear();
}

export default async function MainFooter() {

    const currentYear = await getCurrentYear();

    return (
        <footer className="mainFooter">
            <div className="footerContainer">
                <div className="footerTop">
                    <div className="footerBrand">
                        <Link href="/" className="footerLogo">
                            INKSPACE
                        </Link>

                        <p className="footerDescription">
                            A space for thoughtful stories, fresh perspectives,
                            and ideas worth sharing.
                        </p>
                    </div>

                    <nav className="footerNavigation" aria-label="Footer navigation">
                        <h2 className="footerHeading">Explore</h2>

                        <Link href="/">Home</Link>
                        <Link href="/explore">Explore stories</Link>
                        <Link href="/about">About us</Link>
                    </nav>

                    <div className="footerNavigation">
                        <h2 className="footerHeading">Account</h2>

                        <Link href="/login">Log in</Link>
                        <Link href="/register">Get started</Link>
                    </div>
                </div>

                <div className="footerBottom">
                    <p>© {currentYear} INKSPACE. All rights reserved.</p>

                    <p>
                        Articles provided by{" "}
                        <a
                            href="https://www.theguardian.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            The Guardian
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}