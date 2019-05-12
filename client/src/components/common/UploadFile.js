import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
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
    // this.props.getCurrentProfile(this.props.user.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.hotel) {
      const hotel = nextProps.hotel;

      hotel.image = !isEmpty(hotel.image) ? hotel.image : false;

      this.setState({
        image: hotel.image
      });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const fd = new FormData();
    if (this.state.image !== null) {
      fd.append("image", this.state.image, this.state.image.name);
    }

    // let id = this.props.match.params.id;
    // let token = this.props.token;
    // this.props.updateHotel(fd, id, token, this.props.history);
    console.log("hello");
  };
  render() {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-5">Upload An Image</h1>

        <form onSubmit={this.onSubmit}>
          <input type="file" name="image1" onChange={this.image1Change} />
          <br />
          <input type="submit" className="btn btn-block btn-info mb-5 mt-3" />
        </form>
      </div>
    );
  }
}
export default UploadFile;
