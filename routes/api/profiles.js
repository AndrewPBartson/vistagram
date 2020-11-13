const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../../models/User');
const keys = require('../../config/keys')

router.get('/test', (req, res) => res.json({
  msg: 'Profile api works'
}))

module.exports = router;