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
