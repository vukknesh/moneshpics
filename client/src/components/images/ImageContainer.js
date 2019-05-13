import React, { Component } from "react";
import Images from "./Images";
import { connect } from "react-redux";
import { getImages } from "../../actions/imageActions";
class ImageContainer extends Component {
  componentDidMount() {
    this.props.getImages();
  }
  render() {
    return (
      <div>
        <Images images={this.props.images} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  images: state.image.images
});
export default connect(
  mapStateToProps,
  { getImages }
)(ImageContainer);
