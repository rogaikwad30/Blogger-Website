const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: [String],
    default: [],
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
