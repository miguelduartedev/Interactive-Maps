import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCircleXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./styles/navigation.scss";
import { updateCurrentMap } from "../../../redux/mapSlice";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
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
            src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/public/logo.svg"
            alt="logo"
          />
        </div>
        <div className="nav">
          <div className="nav-item">
            <Link
              to="/Interactive-Maps/world"
              onClick={() => dispatch(updateCurrentMap("world"))}
            >
              <p>The World</p>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              to="/europe"
              onClick={() => dispatch(updateCurrentMap("europe"))}
            >
              <p>Europe</p>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              to="/Interactive-Maps/north-america"
              onClick={() => dispatch(updateCurrentMap("north-america"))}
            >
              <p>North America</p>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              to="/Interactive-Maps/south-america"
              onClick={() => dispatch(updateCurrentMap("south-america"))}
            >
              <p>South America</p>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              to="/Interactive-Maps/africa"
              onClick={() => dispatch(updateCurrentMap("africa"))}
            >
              <p>Africa</p>
            </Link>
          </div>
          <div className="nav-item">
            <Link
              to="/Interactive-Maps/asia"
              onClick={() => dispatch(updateCurrentMap("asia"))}
            >
              <p>Asia</p>
            </Link>
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
          <Link
            to="/Interactive-Maps/world"
            onClick={() => dispatch(updateCurrentMap("world"))}
          >
            <p>
              The World
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link
            to="/Interactive-Maps/europe"
            onClick={() => dispatch(updateCurrentMap("europe"))}
          >
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
          <Link
            to="/Interactive-Maps/north-america"
            onClick={() => dispatch(updateCurrentMap("north-america"))}
          >
            <p>
              North America
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link
            to="/Interactive-Maps/south-america"
            onClick={() => dispatch(updateCurrentMap("south-america"))}
          >
            <p>
              South America
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link
            to="/Interactive-Maps/africa"
            onClick={() => dispatch(updateCurrentMap("africa"))}
          >
            <p>
              Africa
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link
            to="/Interactive-Maps/asia"
            onClick={() => dispatch(updateCurrentMap("asia"))}
          >
            <p>
              Asia
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
