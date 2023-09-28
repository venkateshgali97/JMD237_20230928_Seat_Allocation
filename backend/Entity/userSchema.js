const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: Number,
    default: 0,
  },
  roomName: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "$2b$10$WhM8DclBj7RLfZYGHskcxeWkaucNSI/a9EZV4ZWgwPHm1w2HAs/fK",
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}
    
