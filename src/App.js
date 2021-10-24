import React from "react";
import EuropeMap from "./components/organisms/EuropeMap/europeMap";
import Footer from "./components/atoms/Footer/footer";
import Header from "./components/atoms/Header/header";
import ControlPanel from "./components/organisms/ControlPanel/controlPanel";

function App() {
  return (
    <div className="App h-100">
      <header className="App-header">{Header()}</header>
      <div className="container">
        <div className="row">
          {EuropeMap()}
          {ControlPanel()}
        </div>
      </div>
      {Footer()}
    </div>
  );
}

export default App;
