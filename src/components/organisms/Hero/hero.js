import Navigation from "../../atoms/Navigation/navigation";
import "./styles/hero.scss";

const Hero = () => {
  return (
    <>
      <Navigation />
      <div className="col-12 col-lg-6 column-left">
        <div className="earth-container">
          <div id="earth"> </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 column-right">
        <div className="text-container">
          <h1>Interactive Maps</h1>
          <h4>Showcase your data through custom maps</h4>
          <p className="pt-4">
            Maps are a great tool to display a multitude of country/region
            related data, such as election results, GDP data and much more.
          </p>
          <p>Or you can just show off all the countries you've been to!</p>
          <p className="footer__text">
            <span className="footer__text--main">
              Interactive Maps developed by&nbsp;
            </span>
            <a
              className="footer__text--anchor"
              href="https://www.linkedin.com/in/lu%C3%ADs-c-619364108/"
            >
              Luís Conceição
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
