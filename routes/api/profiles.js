const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');

router.get('/test', (req, res) => res.json({
  msg: 'Profile api works'
}))

// @route   POST api/profiles/create
// @desc    Create profile
// @access  Private
router.post('/create', (req, res) => {
  // if (!isValidJwt) - res.json('please login')
  // else - create user profile
  const newProfile = new Profile({
    userId: req.body.userId,
    experience: req.body.experience,
    education: req.body.education,
    superpower: req.body.superpower,
    gender: req.body.gender,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country
  })
  newProfile.save()
    .then(profile => res.json(profile))
    .catch(err => console.log(err))
})

// @route   POST api/profiles/read
// @desc    Read profile
// @access  Public
router.post('/read', (req, res) => {
  Profile.findOne({ userId: req.body.userId })
    .then(profile => res.json(profile))
    .catch(err => console.log(err))
})

// @route   POST api/profiles/update
// @desc    Update profile
// @access  Private
router.post('/update', (req, res) => {
  // if (!isValidJwt) - res.json('please login')
  // else - find and update user profile
  let updateItems = {};
  Object.entries(req.body).forEach(([key, value]) => {
    updateItems[key] = value;
  })
  Profile.updateOne({ userId: req.body.userId }, updateItems)
    .then(updateInfo => res.json(updateInfo))
    .catch(err => console.log(err))
})

// @route   POST api/profiles/delete
// @desc    Delete profile
// @access  Private
router.post('/delete', (req, res) => {
  // if (!isValidJwt) - res.json('please login')
  // else - find and delete user profile
  Profile.deleteOne({ userId: req.body.userId })
    .then(deleteInfo => res.json(deleteInfo))
    .catch(err => console.log(err))
})

module.exports = router;