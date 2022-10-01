import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateCurrentMap } from "../../../redux/mapSlice";

const Hero = () => {
  const dispatch = useDispatch();
  return (
    <div className="hero row">
      <div className="col-12 hero-alignment">
        <div className="text-container d-flex flex-column justify-content-center">
          <h1 className="title">Interactive Maps</h1>
          <div className="subtitle">
            <h2>Showcase your data through custom maps 🗺️</h2>
            <p className="pt-4">
              Maps are a great tool to display a multitude of country related
              data, such as election results, GDP data and much more.
            </p>
            <p>
              Or instead you can just show off all the countries you've been to!
            </p>
            <p className="hero__credits">
              <span className="hero__credits--main">
                This is a tool developed by&nbsp;
              </span>
              <a
                className="hero__credits--anchor"
                href="https://www.linkedin.com/in/lu%C3%ADs-miguel-d-619364108/"
              >
                Luís Miguel
              </a>
            </p>
          </div>

          <div className="earth-container">
            <Link href="/world">
              <div
                className="earth"
                onClick={() => dispatch(updateCurrentMap("world"))}
              >
                <img
                  className="earth-cloud1"
                  src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/dfa31cb1242ce1152ce9fe561fc97354a8658214/src/public/used_assets/simple_cloud.svg"
                  alt="An image of a cloud"
                />
                <img
                  className="earth-cloud2"
                  src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/dfa31cb1242ce1152ce9fe561fc97354a8658214/src/public/used_assets/simple_cloud.svg"
                  alt="An image of a cloud"
                />
              </div>
            </Link>
          </div>
          <button
            className="scroller"
            onClick={() =>
              document.querySelector(".options-grid").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <FontAwesomeIcon
              className="fa-solid fa-arrow-down-to-line"
              icon={faArrowDown}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
