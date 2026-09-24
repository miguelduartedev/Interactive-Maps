import type { MouseEvent } from "react"
import HeroGlobe from "./HeroGlobe"

const scrollToSection = (
  event: MouseEvent<HTMLAnchorElement>,
  sectionId: string,
) => {
  event.preventDefault()
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20">
    <path d="M4 10h11m-4-4 4 4-4 4" />
  </svg>
)

export default function Hero() {
  return (
    <section className="hero hero--v2" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__atmosphere hero__atmosphere--cyan" aria-hidden="true" />
      <div className="hero__atmosphere hero__atmosphere--teal" aria-hidden="true" />

      <div className="hero__shell">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span aria-hidden="true" />
            Geospatial storytelling, made simple
          </p>
          <h1 id="hero-title" className="hero__title">
            Showcase your data through <em>custom maps</em>
          </h1>
          <p className="hero__copy">
            Color countries and regional groups, add a clear title and legend,
            then export a polished map ready for your story, report, or next idea.
          </p>

          <div className="hero__actions" aria-label="Explore Interactive Maps">
            <a
              className="hero__button hero__button--primary"
              href="#available-maps"
              onClick={(event) => scrollToSection(event, "available-maps")}
            >
              Choose a Map
              <ArrowIcon />
            </a>
            <a
              className="hero__button hero__button--secondary"
              href="#how-it-works"
              onClick={(event) => scrollToSection(event, "how-it-works")}
            >
              How it works
            </a>
          </div>

          <p className="hero__coverage">
            World <span /> Europe <span /> Americas <span /> Africa <span /> Asia
          </p>
        </div>

        <HeroGlobe />
      </div>

      <a
        className="hero__scroll-cue"
        href="#how-it-works"
        onClick={(event) => scrollToSection(event, "how-it-works")}
        aria-label="Scroll to learn how Interactive Maps works"
      >
        <span>Discover the workflow</span>
        <svg aria-hidden="true" viewBox="0 0 20 20">
          <path d="m5 8 5 5 5-5" />
        </svg>
      </a>
    </section>
  )
}
