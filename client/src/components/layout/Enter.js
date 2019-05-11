import React, { Component } from "react";

export default class Enter extends Component {
  render() {
    return (
      <div>
        <div class="jumbotron jumbotron-fluid ">
          <div class="container">
            <form className="search-photo" action="submit">
              <input
                type="text"
                class="display-4"
                placeholder="Find your perfect photo ..."
              />
              <button type="submit">
                <i class="fas fa-search" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
