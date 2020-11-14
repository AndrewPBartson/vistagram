const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProfileSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  superpower: {
    type: String
  },
  gender: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  }
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)