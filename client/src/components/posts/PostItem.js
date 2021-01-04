import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
  constructor() {
    super();
    this.state = {
      image: null
    }
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  render() {
    const { post, auth, showActions } = this.props;
    let imageFinal = 'data: image/jpeg;base64,'
      + (this.arrayBufferToBase64(this.props.post.image.data.data));

    return (
      <div className="col-md-4">
        <div className="card mb-3">
          <img
            className="card-img-top"
            src={imageFinal}
            alt=""
          />

          <div className="card-body">
            <p className="card-text">{post.text}</p>
            <div className="row">
              <div className="col-12">
                <Link
                  to="/profile"
                >
                  <img
                    className="rounded-circle"
                    src={post.avatar}
                    alt={post.name}
                    style={{ width: "25px", marginRight: "5px" }}
                    title="You must have a gravatar connected to your email to display an image"
                  />
                  {post.name}
                </Link>
              </div>
            </div>
            {showActions ? (
              <div className="row">
                <div className="d-flex justify-content-end col-12">
                  <div className="btn-group">
                    <button
                      onClick={this.onLikeClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-sm"
                    >
                      <i
                        className={classnames('fas fa-thumbs-up fa-lg', {
                          'text-info': this.findUserLike(post.likes)
                        })}
                      />
                      <span className="badge badge-light">{post.likes.length}</span>
                    </button>
                    <button
                      onClick={this.onUnlikeClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-sm"
                    >
                      <i className="text-secondary fas fa-thumbs-down fa-lg" />
                    </button>
                  </div>
                  <div className="btn-group">
                    <Link
                      to={`/post/${post._id}`}
                      style={{
                        maxHeight: "31px",
                        marginTop: "auto",
                        marginBottom: "auto"
                      }}
                      className="btn btn-sm btn-outline-secondary mr-2 ml-1"
                    >Comments</Link>
                  </div>
                  <div className="btn-group">
                    {post.user === auth.user.id ? (
                      <button
                        onClick={this.onDeleteClick.bind(this, post._id)}
                        type="button"
                        className="btn btn-sm btn-danger"
                      >
                        <i className="fas fa-times" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

          </div>
        </div>
      </div>

    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
