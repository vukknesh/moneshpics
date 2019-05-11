import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../main.css";

export default class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    console.log("a");
  }
  render() {
    const authLinks = (
      <ul class="navbar-nav ml-auto ">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Home <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Link
          </a>
        </li>
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
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <div class="dropdown-divider" />
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </li>
        <li class="nav-item">
          <a
            class="nav-link disabled"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >
            Disabled
          </a>
        </li>

        <li className="nav-item ">
          <a
            href="#"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link text-light"
          >
            LOGOUT
          </a>
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
        <a class="navbar-brand" href="/">
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

        <div class="collapse navbar-collapse " id="navbarSupportedContent">
          {guestLinks}
        </div>
      </nav>
    );
  }
}
