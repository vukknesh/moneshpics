import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Enter from "./components/layout/Enter";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import ImageContainer from "./components/images/ImageContainer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Route exact path="/" component={Enter} />

        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
      </div>
    </Router>
  );
}

export default App;
