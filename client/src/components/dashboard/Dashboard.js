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

    if (profile === null || profile === undefined || loading) {
      dashboardContent = <Spinner />;
    } else {
      // if current user has profile -
      if (profile && !profile.noprofile) {
        dashboardContent = (
          <div>
            <p className="h5 text-muted">
              Hello <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <p className="lead">
              This is your Profile. Please update as needed.
            </p>
            <EditProfile />
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
        dashboardContent = (
          <div>
            <p className="h5 text-muted">Welcome <span className="text-primary">{user.name}</span></p>
            <p className="lead">
              Tell us about yourself !
            </p>
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
