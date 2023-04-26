const blogsModel = require("../models/Blog");
const dbValidator = require("../services/db-validations");

module.exports.createBlog = async (req,res) => {
    try {
        const blog = await blogsModel.create(req.body);
        res.status(200).json({
            "status" : 200,
            "message" : "Blog added successfully",
            "id" : blog._id
        })
    } catch (error) {
        const errors = dbValidator.checkErrors(error)
        res.status(400).json({
            "status" : 400,
            "error" : errors
        })
    }
}

module.exports.readBlog = async (req, res) => {
    try {
        const blog = await blogsModel.findById(req.params.id)
        res.status(200).json({
            "status" : 200,
            "blog" : blog
        })
    } catch (error) {
        res.status(400).json({
            "status" : 400,
            "error" : "No Such Blog Found"
        })
    }
}

module.exports.updateBlog = async (req,res) => {
    try {
        const blog = await blogsModel.findByIdAndUpdate(req.params.id,{
            "$set" : req.body
        });
        
        res.status(200).json({
            "status" : 200,
            "message" : "Blog updated successfully",
            "id" : blog._id
        })
    } catch (error) {
        res.status(400).json({
            "status" : 400,
            "error" : "No such blog found"
        })
    }
}

module.exports.deleteBlog = async (req,res) => {
    try {
        const blog = await blogsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "status" : 200,
            "message" : "Blog deleted successfully",
            "id" : blog._id
        })
    } catch (error) {
        res.status(400).json({
            "status" : 400,
            "error" : "No such blog found"
        })
    }
}

module.exports.LikeBlog = async (req, res) => {
  try {
    const email = req.headers["email"];
    const blogId = req.params.id;

    const blog = await blogsModel.findById(blogId);
    if (!blog) {
      throw new Error(`Blog with ID ${blogId} not found`);
    }

    const likes = blog.likes;
    const index = likes.indexOf(email);
    if (index === -1) {
      likes.push(email);
    } else {
      likes.splice(index, 1);
    }

    const updatedBlog = await blogsModel.findOneAndUpdate(
      { _id: blogId },
      { likes: likes }
    );

    const updated = await blogsModel.findById(blogId)

    res.status(200).json({
      status: 200,
      blog: updated,
    });
  } catch (error) {
    console.error(`Error toggling like: ${error.message}`);
    res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
};
