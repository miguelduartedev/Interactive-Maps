import {
  faAngleRight,
  faBars,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateCurrentMap } from "../../../redux/mapSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  // TODO instead of manipulating DOM use the store/state
  const mobileMenuHandler = () => {
    const mobileNav = document.querySelector(".mobile-nav");
    if (mobileNav.className === "mobile-nav") {
      mobileNav.className += " -active";
      document.body.classList.add("overflow-hidden");
    } else {
      mobileNav.className = "mobile-nav";
      document.body.classList.remove("overflow-hidden");
    }
  };
  return (
    <>
      <div className="top_bar">
        <Link href="/">
          <div className="logo">
            <img
              className="logo-img"
              src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/public/used_assets/logo_white.svg"
              alt="logo"
            />
          </div>
        </Link>
        <div className="nav">
          <div className="nav-item">
            <Link href="/world">
              <p
                className="nav-link"
                onClick={() => dispatch(updateCurrentMap("world"))}
              >
                The World
              </p>
            </Link>
          </div>
          <div className="nav-item">
            <Link href="/europe">
              <p
                className="nav-link"
                onClick={() => dispatch(updateCurrentMap("europe"))}
              >
                Europe
              </p>
            </Link>
          </div>
          <div className="nav-item">
            <Link href="/north-america">
              <p
                className="nav-link"
                onClick={() => dispatch(updateCurrentMap("north-america"))}
              >
                North America
              </p>
            </Link>
          </div>
          <div className="nav-item">
            <Link href="/south-america">
              <p
                className="nav-link"
                onClick={() => dispatch(updateCurrentMap("south-america"))}
              >
                South America
              </p>
            </Link>
          </div>
          <div className="nav-item">
            <Link href="/africa">
              <p
                className="nav-link"
                onClick={() => dispatch(updateCurrentMap("africa"))}
              >
                Africa
              </p>
            </Link>
          </div>
          <div className="nav-item">
            <Link href="/asia">
              <p
                className="nav-link"
                onClick={() => dispatch(updateCurrentMap("asia"))}
              >
                Asia
              </p>
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
          <Link href="/world">
            <p
              className="nav-link"
              onClick={() => dispatch(updateCurrentMap("world"))}
            >
              The World
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link href="/europe">
            <p
              className="nav-link"
              onClick={() => dispatch(updateCurrentMap("europe"))}
            >
              Europe
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link href="/north-america">
            <p
              className="nav-link"
              onClick={() => dispatch(updateCurrentMap("north-america"))}
            >
              North America
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link href="/south-america">
            <p
              className="nav-link"
              onClick={() => dispatch(updateCurrentMap("south-america"))}
            >
              South America
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link href="/africa">
            <p
              className="nav-link"
              onClick={() => dispatch(updateCurrentMap("africa"))}
            >
              Africa
              <FontAwesomeIcon
                className="mobile-nav-icon-arrow-right"
                icon={faAngleRight}
              />
            </p>
          </Link>
        </div>
        <div className="mobile-nav-item">
          <Link href="/asia">
            <p
              className="nav-link"
              onClick={() => dispatch(updateCurrentMap("asia"))}
            >
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
