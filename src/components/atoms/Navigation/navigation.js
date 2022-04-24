import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCircleXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./styles/navigation.scss";

const Navigation = () => {
  // TODO instead of manipulating DOM use the store/state
  const mobileMenuHandler = () => {
    const mobileNav = document.querySelector(".mobile-nav");
    mobileNav.className === "mobile-nav"
      ? (mobileNav.className += " -active")
      : (mobileNav.className = "mobile-nav");
  };
  return (
    <>
      <div className="top_bar">
        <div className="logo">
          <img
            className="logo-img"
            src="https://luisconceicaodev.github.io/Interactive-Maps/logo.svg"
            alt="logo"
          />
        </div>
        <div className="nav">
          <div className="nav-item">
            <Link to="/Interactive-Maps/europe">
              <p>Europe</p>
            </Link>
          </div>
          <div className="nav-item">
            <a href="#">
              <p>The Americas</p>
            </a>
          </div>
          <div className="nav-item">
            <a href="#">
              <p>Africa</p>
            </a>
          </div>
          <div className="nav-item">
            <a href="#">
              <p>Asia</p>
            </a>
          </div>
          <div className="nav-item">
            <a href="#">
              {" "}
              <p>Oceania</p>
            </a>
          </div>
          <a href="#" className="nav-bars" onClick={() => mobileMenuHandler()}>
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      </div>
      <div className="mobile-nav">
        <a href="#">
          <FontAwesomeIcon
            className="mobile-nav-close"
            icon={faCircleXmark}
            onClick={() => mobileMenuHandler()}
          />
        </a>
        <div className="mobile-nav-item">
          <Link to="/Interactive-Maps/europe">
            <p>
              Europe
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <a href="#">
            <p>
              The Americas
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </a>
        </div>
        <div className="mobile-nav-item">
          <a href="#">
            {" "}
            <p>
              Africa
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </a>
        </div>
        <div class="mobile-nav-item">
          <a href="#">
            <p>
              Asia
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </a>
        </div>
        <div class="mobile-nav-item">
          <a href="#">
            <p>
              Oceania
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
