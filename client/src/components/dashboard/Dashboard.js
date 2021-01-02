import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import EditProfile from "../edit-profile/EditProfile";
import CreateProfile from "../create-profile/CreateProfile";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // if current user has profile -
      if (profile && !profile.noprofile) {
        console.log('inside second IF');
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Hello <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <p className="lead text-muted">
              Here's your Profile. Please update as needed.
            </p>
            <p>Add "Edit Profile" component here</p>
            {/* <EditProfile /> */}
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>

        );
      } else {
        // current user has no profile -
        console.log('inside second ELSE');

        dashboardContent = (
          <div>
            <h3 className="lead text-muted">Welcome {user.name}! Tell us about yourself!</h3>
            <CreateProfile />
          </div>

        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
