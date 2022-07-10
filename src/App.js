import React from "react";
import SVGMap from "./components/organisms/SVGMap/svgMap";
import Footer from "./components/atoms/Footer/footer";
import Header from "./components/atoms/Header/header";
import ControlPanel from "./components/organisms/ControlPanel/controlPanel";
import Hero from "./components/organisms/Hero/hero";
import "./components/_common/global.scss";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route path={["/", "/Interactive-Maps"]} exact>
        <div className="hero row">
          <Hero />
        </div>
      </Route>
      <Route
        path={[
          "/world",
          "/Interactive-Maps/world",
          "/europe",
          "/Interactive-Maps/europe",
          "/africa",
          "/Interactive-Maps/africa",
          "/asia",
          "/Interactive-Maps/asia",
          "/south-america",
          "/Interactive-Maps/south-america",
          "/north-america",
          "/Interactive-Maps/north-america",
        ]}
        exact
      >
        <div className="europe h-100">
          <header className="App-header">
            <Header />
          </header>
          <div className="container">
            <div className="row">
              <SVGMap />
              <ControlPanel />
            </div>
          </div>
          <Footer />
        </div>
      </Route>
    </>
  );
}

export default App;
