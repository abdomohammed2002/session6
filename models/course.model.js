const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: String,
  },
});
module.exports = mongoose.model("Course", courseSchema);
