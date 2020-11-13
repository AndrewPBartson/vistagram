const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User');
const keys = require('../../config/keys')

router.get('/test', (req, res) => res.json({
  msg: 'User api works'
}))

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: 'Email already exists'
        })
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // 200 x 200
          r: 'pg', // rating
          d: 'mm' // if no gravatar for user, send dummy img
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        })
        // tells bcrypt to generate a salt and
        // run ten rounds before stopping
        bcrypt.genSalt(10, (err, salt) => {
          // when salt comes back, give it plus password to hash()
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
    .catch(err => console.log(err))
});

// @route   POST api/users/login
// @desc    Login user / return JWT token
// @access  Public
router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'User not found' })
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(isMatch => {
            if (isMatch) {
              const payload = {
                // user.id is alias for _id in mongodb
                // underscore indicates _id was the system variable
                // generated by database, right?
                id: user.id,
                name: user.name,
                avatar: user.avatar
              }
              // sign jwt
              jwt.sign(payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  return res.json({ token: 'Bearer ' + token })
                })
            } else {
              res.json({ msg: 'Invalid' })
            }
          })
      }
    })
})

module.exports = router;