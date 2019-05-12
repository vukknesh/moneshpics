import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles, findGuides } from "../../actions/profileActions";
import ProfileItems from "./ProfileItems";
import Searchbar from "../common/Searchbar";

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: "",

      errors: {}
    };
  }
  onChange = e => {
    this.setState({ searchBar: e.target.value });
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let filteredProducts;
    if (profiles === null || loading) {
      filteredProducts = <Spinner />;
    } else {
      if (profiles.length > 0) {
        filteredProducts = profiles
          .filter(profile =>
            profile.user.name
              .toLowerCase()
              .includes(this.state.searchBar.toLowerCase())
          )
          .map(prof => <ProfileItems key={prof._id} profile={prof} />);
      }
    }

    // profileItems = profiles.map(profile => (
    //   <ProfileItems key={profile._id} profile={profile} />
    // ))

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Search for Guides</h1>
              <p className="lead text-center">
                Browse and connect Guides with Watchers
              </p>
              <Searchbar onChange={this.onChange} onFind={this.onFind} />
              {filteredProducts}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  findGuides: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfiles, findGuides }
)(Profiles);
