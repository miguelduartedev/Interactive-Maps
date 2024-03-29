import {
  faAngleRight,
  faBars,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { initialState, updateCurrentCountry } from "../../../redux/mapSlice"

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navData = [
    { route: "/world", label: "World" },
    { route: "/europe", label: "Europe" },
    { route: "/north-america", label: "North America" },
    { route: "/south-america", label: "South America" },
    { route: "/africa", label: "Africa" },
    { route: "/asia", label: "Asia" },
  ]

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
          {navData.map((nav, index) => (
            <div key={index} className="nav-item">
              <Link href={nav.route}>
                <p
                  className="nav-link"
                  onClick={() =>
                    dispatch(updateCurrentCountry(initialState.currentCountry))
                  }
                >
                  {nav.label}
                </p>
              </Link>
            </div>
          ))}
          <a
            href="#"
            className="nav-bars"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={clsx("burguer-menu line-one", menuOpen && "-close")}
            ></span>
            <span
              className={clsx("burguer-menu line-two", menuOpen && "-close")}
            ></span>
            <span
              className={clsx("burguer-menu line-three", menuOpen && "-close")}
            ></span>
          </a>
        </div>
      </div>
      <div className={clsx("mobile-nav", menuOpen && "-active")}>
        {navData.map((nav, index) => (
          <div key={index} className="mobile-nav-item">
            <Link href={nav.route}>
              <p
                className="nav-link"
                onClick={() => {
                  dispatch(updateCurrentCountry(initialState.currentCountry))
                  setMenuOpen(false)
                }}
              >
                {nav.label}
                <FontAwesomeIcon
                  className="mobile-nav-icon-arrow-right"
                  icon={faAngleRight}
                />
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Navigation
