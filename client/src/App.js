import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { clearCurrentProfile } from "./actions/profileActions";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Enter from "./components/layout/Enter";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import UploadFile from "./components/common/UploadFile";

import EditProfile from "./components/profile/EditProfile";

import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Post from "./components/posts/Post";
import Post1 from "./components/Post/Post";

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser);
    //clear current profile
    store.dispatch(clearCurrentProfile);
    //redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />

          <Route exact path="/" component={Enter} />

          <div>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/edit-profile" component={EditProfile} />
            <Route exact path="/upload-file" component={UploadFile} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            {/* <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch> */}
            {/* <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch> */}
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>

            <Switch>
              <PrivateRoute exact path="/feed" component={Post} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/post/:id" component={Post1} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
          </div>
        </div>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
