import {
  faAngleRight,
  faBars,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentMap } from "../../../redux/mapSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="top_bar">
        <Link href="/">
          <div className="logo">
            <img
              className="logo-img"
              src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/src/public/used_assets/logo_white.svg"
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
          <a href="#" className="nav-bars" onClick={() => setMenuOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      </div>
      <div className={clsx("mobile-nav", menuOpen && "-active")}>
        <a href="#">
          <FontAwesomeIcon
            className="mobile-nav-close"
            icon={faCircleXmark}
            onClick={() => setMenuOpen(false)}
          />
        </a>
        <div className="mobile-nav-item">
          <Link href="/world">
            <p
              className="nav-link"
              onClick={() => {
                dispatch(updateCurrentMap("world"));
                setMenuOpen(false);
              }}
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
              onClick={() => {
                dispatch(updateCurrentMap("europe"));
                setMenuOpen(false);
              }}
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
              onClick={() => {
                dispatch(updateCurrentMap("north-america"));
                setMenuOpen(false);
              }}
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
              onClick={() => {
                dispatch(updateCurrentMap("south-america"));
                setMenuOpen(false);
              }}
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
              onClick={() => {
                dispatch(updateCurrentMap("africa"));
                setMenuOpen(false);
              }}
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
              onClick={() => {
                dispatch(updateCurrentMap("asia"));
                setMenuOpen(false);
              }}
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
