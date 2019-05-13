import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { addImage, getImages } from "../../actions/imageActions";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

class UploadFile extends Component {
  state = {
    image: null
  };
  image1Change = event => {
    this.setState({
      image: event.target.files[0]
    });
  };
  componentDidMount() {
    this.props.getImages();
  }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const fd = new FormData();
    if (this.state.image !== null) {
      fd.append("image", this.state.image, this.state.image.name);
    }

    this.props.addImage(fd, this.props.history);
  };
  render() {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-5">Upload An Image</h1>

        <form onSubmit={this.onSubmit}>
          <input type="file" name="image" onChange={this.image1Change} />
          <br />
          <input type="submit" className="btn btn-block btn-info mb-5 mt-3" />
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { addImage, getImages }
)(withRouter(UploadFile));
