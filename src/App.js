import React from "react";
import EuropeMap from "./components/organisms/EuropeMap/europeMap";
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
      <Route path="/europe">
        <div className="europe h-100">
          <header className="App-header">
            <Header />
          </header>
          <div className="container">
            <div className="row">
              <EuropeMap />
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
