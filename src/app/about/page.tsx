import Link from "next/link";
import "./page.css";


export default function AboutPage() {
  return (
    <main className="aboutPage">
      <section className="aboutHero">
        <span className="aboutEyebrow">ABOUT INKSPACE</span>

        <h1 className="aboutTitle">
          Every story starts <span>somewhere.</span>
        </h1>

        <p className="aboutIntroduction">
          INKSPACE is a place to discover ideas, explore new perspectives,
          and connect through the power of storytelling.
        </p>
      </section>

      <section className="aboutContent">
        <div className="aboutSection">
          <span className="aboutSectionNumber">01 / OUR STORY</span>

          <div className="aboutSectionBody">
            <h2>A space for curious minds.</h2>

            <p>
              We believe that great ideas deserve to be shared. Whether
              it&apos;s an exploration of emerging technology, a scientific
              discovery, or a fresh perspective on the world, every story
              has something valuable to offer.
            </p>

            <p>
              INKSPACE brings together interesting articles and thoughtful
              conversations in a clean, distraction-free reading experience.
            </p>
          </div>
        </div>

        <div className="aboutSection">
          <span className="aboutSectionNumber">02 / OUR MISSION</span>

          <div className="aboutSectionBody">
            <h2>Ideas that inspire discovery.</h2>

            <p>
              Our mission is simple: make discovering and sharing knowledge
              an enjoyable experience.
            </p>

            <p>
              From technology and science to new ways of thinking, we want
              to create a welcoming space where curiosity leads the way.
            </p>
          </div>
        </div>
      </section>

      <section className="aboutCallToAction">
        <span className="aboutEyebrow">KEEP EXPLORING</span>

        <h2>Your next great read awaits.</h2>

        <p>
          Discover stories that challenge your thinking and spark new ideas.
        </p>

        <Link href="/explore" className="aboutButton">
          Explore stories
        </Link>
      </section>
    </main>
  );
}