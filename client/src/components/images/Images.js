import React, { Component } from "react";
import image1 from "./1.jpg";

export default class Images extends Component {
  render() {
    return (
      <div>
        <div class="card" style={{ width: "18rem" }}>
          <img src={image1} alt="" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}
