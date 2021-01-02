import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      image: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newPost = new FormData();
    newPost.append('image', this.state.image, this.state.name);

    const { user } = this.props.auth;

    newPost.append('text', this.state.text)
    newPost.append('name', user.name)
    newPost.append('avatar', user.avatar)

    this.props.addPost(newPost);
    this.setState({ text: '' });
    //this.setState({ image: '' }); 
  }

  onChange = (e) => {
    if (e.target.name === 'text') {
      this.setState({ [e.target.name]: e.target.value });
      console.log('e.target ', e.target);
    };
    if (e.target.name === 'image') {
      this.setState({ [e.target.name]: e.target.files[0] });
    };
    //this.setState({ "image": e.target.files[0] });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div id="accordion">
          <div className="card card-info">
            <div
              style={{
                padding: "2px"
              }}
              id="headingOne"
              className="card-header bg-info">
              <button
                style={{
                  color: "white",
                  fontSize: "20px"
                }}
                className="btn btn-link text-decoration-none"
                data-toggle="collapse"
                data-target="#collapseOne"

                aria-controls="collapseOne">
                Click to Add a Being
              </button>
            </div>
            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="image">Select a photo to upload:</label>
                    <input
                      style={{ border: "none" }}
                      type="file"
                      className={classnames("mb-2 form-control form-control-lg", {
                        'is-invalid': errors.image
                      })}
                      id="image"
                      name="image"
                      icon="fa fa-picture-o fa-2x"
                      onChange={this.onChange}
                      accept="image/jpg, image/png"
                    />
                    {errors.image && (
                      <div className="invalid-feedback">
                        {errors.image}
                      </div>
                    )}

                    <textarea
                      className={classnames("form-control form-control-lg", {
                        'is-invalid': errors.text
                      })}
                      placeholder="Describe this Being"
                      name="text"
                      value={this.state.text}

                      onChange={this.onChange}
                    />
                    {errors.text && (
                      <div className="invalid-feedback">
                        {errors.text}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Submit
              </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
