import React, { Component } from "react";
import ImageContainer from "../images/ImageContainer";

export default class Enter extends Component {
  render() {
    return (
      <div>
        <div class="jumbotron jumbotron-fluid ">
          <div class="container">
            <form className="search-photo" action="submit">
              <input
                type="text"
                className="display-4"
                placeholder="Find your perfect photo ..."
              />
              <button type="submit">
                <i class="fas fa-search" />
              </button>
            </form>
            <p className="text-light pt-5">
              Monesh pics is the best photo free website in the worl Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quibusdam commodi
              doloribus atque fugit velit repudiandae temporibus neque molestiae
              deleniti libero.
            </p>
          </div>
        </div>
        <ImageContainer />
      </div>
    );
  }
}
