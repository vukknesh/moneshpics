import React, { Component } from "react";

export default class Images extends Component {
  render() {
    let content;
    const { images } = this.props;
    content = images.map(image => (
      <div
        key={image._id}
        class="card ml-2 mr-2 mb-2"
        style={{ width: "18rem" }}
      >
        <img src={image.imageUrl} alt="" />
        <div class="card-body">
          <h5 class="card-title">{image.user}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="btn btn-info">
            Go somewhere
          </a>
        </div>
      </div>
    ));

    return <div className="d-flex  flex-wrap">{content}</div>;
  }
}
