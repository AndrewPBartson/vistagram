const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProfileSchema = new Schema({
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
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
  }
})

module.exports = Profile = mongoose.model('profiles', ProfileSchema)