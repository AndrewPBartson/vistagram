const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.get('/test', (req, res) => res.json({
  msg: 'Post api works'
}))

// @route   POST api/posts/create
// @desc    Create post
// @access  Private
router.post('/create', (req, res) => {
  // if (!isValidJwt) - res.json('please login')
  // else - create post
  const newPost = new Post({
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    date: req.body.date
  })
  newPost.save()
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

// @route   POST api/posts/read
// @desc    Read post
// @access  Public
router.post('/read', (req, res) => {
  Post.findOne({ userId: req.body.userId })
    .then(post => res.json(post))
    .catch(err => console.log(err))
})

// @route   POST api/posts/update
// @desc    Update post
// @access  Private
router.post('/update', (req, res) => {
  // if (!isValidJwt) - res.json('please login')
  // else - find and update post
  let updateItems = {};
  Object.entries(req.body).forEach(([key, value]) => {
    updateItems[key] = value;
  })
  Post.updateOne({ userId: req.body.userId }, updateItems)
    .then(updateInfo => res.json(updateInfo))
    .catch(err => console.log(err))
})

// @route   POST api/posts/delete
// @desc    Delete post
// @access  Private
router.post('/delete', (req, res) => {
  // if (!isValidJwt) - res.json('please login')
  // else - find and delete post
  Post.deleteOne({ userId: req.body.userId })
    .then(deleteInfo => res.json(deleteInfo))
    .catch(err => console.log(err))
})

module.exports = router;