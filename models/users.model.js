const mongoose = require("mongoose");
const validator = require("validator");
const usersRoles = require("../utils/usersRoles");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  roles: {
    type: String,
    enum: [usersRoles.USER, usersRoles.ADMIN],
    default: usersRoles.USER,
  },
  avatar: {
    type: String,
    default: "uploads/default.jpg",
  },
});

module.exports = mongoose.model("User", userSchema);
