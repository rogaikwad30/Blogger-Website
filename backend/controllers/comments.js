const commentsModel = require("../models/Comments");
const blogsModel = require("../models/Blog");
const dbValidator = require("../services/db-validations");

module.exports.createComment = async (req,res) => {
    try {
        req.body["email"] = req.email;
        const blog = await blogsModel.findById(req.body.blogId)
        if(blog){
            const comment = await commentsModel.create(req.body)
            res.status(200).json({
                "status" : 200,
                "message" : "comment added successfully",
                "id": comment._id
            })
        }
        else{
            res.status(400).json({
                "status" : 400,
                "error" : "Can't comment on this blog, might be deleted."
            })
        }
    } catch (error) {
        const errors = dbValidator.checkErrors(error)
        res.status(400).json({
            "status" : 400,
            "error" : errors
        })
    }
}

module.exports.readCommentsForParticularBlog = async (req, res) => {
    try {
        const comments = await commentsModel.find({
            blogId : req.body.blogId
        })
        res.status(200).json({
            "status" : 200,
            "comments" : comments
        })
    } catch (error) {
        res.status(400).json({
            "status" : 400,
            "error" : error.message
        })
    }
}

module.exports.updateComment = async (req,res) => {
    try {
        const comment = await commentsModel.findOneAndUpdate({
            "_id" : req.body.commentId,
            "email": req.email
        },{
            "$set": {
                "actualComment" : req.body.actualComment
            }
        })
        if(comment){
            res.status(200).json({
                "status": 200,
                "message" : "comment updated successfully"
            })
        }
        else{
            res.status(400).json({
                "status" : 400,
                "message" : "Comment update failed , comment doesn't exists or doesn't belongs to you"
            })
        }
    } catch (error) {
        res.status(400).json({
            "status" : 400,
            "error" : "Comment update failed , comment doesn't exists or doesn't belongs to you"
        })
    }
}

module.exports.deleteComment = async (req,res) => {
    try {
        const email = req.email;
        const comment = await commentsModel.findOneAndDelete({
            "_id" : req.body.commentId,
            "email" : email
        });
        res.status(200).json({
            "status" : 200,
            "message" : "Comment deleted successfully",
            "id" : comment._id
        })
    } catch (error) {
        res.status(400).json({
            "status" : 400,
            "error" : "No such comment found or comment doesn't belongs to you"
        })
    }
}
