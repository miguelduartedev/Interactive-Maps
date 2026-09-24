export default function HeroGlobe() {
  return (
    <div
      className="hero-globe"
      role="img"
      aria-label="An animated globe with clouds moving across its surface"
    >
      <div className="hero-globe__orbit hero-globe__orbit--outer" aria-hidden="true" />
      <div className="hero-globe__orbit hero-globe__orbit--inner" aria-hidden="true" />
      <div className="hero-globe__coordinate hero-globe__coordinate--top" aria-hidden="true">
        38.7223° N&nbsp;&nbsp;9.1393° W
      </div>
      <div className="hero-globe__coordinate hero-globe__coordinate--bottom" aria-hidden="true">
        Live cartographic canvas
      </div>
      <span className="hero-globe__marker hero-globe__marker--one" aria-hidden="true" />
      <span className="hero-globe__marker hero-globe__marker--two" aria-hidden="true" />
      <span className="hero-globe__marker hero-globe__marker--three" aria-hidden="true" />

      <div className="earth-container">
        <div className="earth">
          <img className="earth-cloud1" src="/used_assets/simple_cloud.svg" alt="" />
          <img className="earth-cloud2" src="/used_assets/simple_cloud.svg" alt="" />
        </div>
      </div>
    </div>
  )
}
