import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import isEmpty from '../../validation/is-empty';

class PostFeed extends Component {

  render() {
    const { posts } = this.props;

    if (isEmpty(posts)) {
      return <div></div>
    } else {
      return posts.map(post => <PostItem key={post._id} post={post} />)
    }
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
