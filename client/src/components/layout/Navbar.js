import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import "../main.css";

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul class="navbar-nav ml-auto ">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Explore
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">
              Photos
            </a>
            <a class="dropdown-item" href="#">
              Videos
            </a>
            <Link class="dropdown-item" to="/profiles">
              Photographers
            </Link>
            <div class="dropdown-divider" />
            <a class="dropdown-item" href="#">
              Popular Images
            </a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle dropdown-toggle1"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src="https://www.talaka.org/assets/img/userpic-fallback.svg"
              style={{ borderRadius: "50%", width: "30px", height: "30px" }}
              alt=""
            />
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">
              My Images
            </a>
            <Link class="dropdown-item" to="/upload-file">
              Upload
            </Link>
            <Link class="dropdown-item" to="/edit-profile">
              Favorites
            </Link>
            <Link class="dropdown-item" to="/feed">
              Messages
            </Link>
            <Link class="dropdown-item" to="/create-profile">
              My Profile
            </Link>
            <div class="dropdown-divider" />

            <a
              href="#"
              onClick={this.onLogoutClick.bind(this)}
              className="dropdown-item"
            >
              LOGOUT
            </a>
          </div>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto ">
        <li className="nav-item ">
          <Link className="nav-link text-light" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        style={{ background: "rgba(3, 3, 3, 0.75)" }}
        class="navbar navbar-expand-lg navbar-dark pl-5 pr-5"
      >
        <a class="navbar-brand ml-5 pl-5" href="/">
          Monesh Pics
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>

        <div
          class="collapse navbar-collapse mr-5 pr-5"
          id="navbarSupportedContent"
        >
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
