import "./page.css";

export default function PostsLoading() {
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
        <div className="skeletonSearch skeleton" />

        <div className="skeletonCategories">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="skeletonCategory skeleton" />
          ))}
        </div>

        <div className="postsHeading">
          <h2>Latest stories</h2>
        </div>

        <div className="postsList">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="articleCard">
              <div className="skeletonImage skeleton" />

              <div className="skeletonContent">
                <div className="skeletonTag skeleton" />
                <div className="skeletonTitle skeleton" />
                <div className="skeletonTitleShort skeleton" />
                <div className="skeletonText skeleton" />
                <div className="skeletonText skeleton" />
                <div className="skeletonFooter skeleton" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}