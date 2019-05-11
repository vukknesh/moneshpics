import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Enter from "./components/layout/Enter";

import ImageContainer from "./components/images/ImageContainer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Enter />
      <ImageContainer />
    </div>
  );
}

export default App;
