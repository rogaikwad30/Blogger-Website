const blogsModel = require("../models/Blog");
const dbValidator = require("../services/db-validations");
const mongoose = require('mongoose');

module.exports.createBlog = async (req,res) => {
    try {
        req.body["email"] = req.email;
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
        const blog = await blogsModel.aggregate([
            {
              "$match": {
                "_id": new mongoose.Types.ObjectId(req.params.id)
              }
            },
            {
              "$lookup": {
                "from": "comments",
                "localField": "_id",
                "foreignField": "blogId",
                "as": "comments"
              }
            },
            {
              "$unwind": {
                  "path" : "$comments",
                  "preserveNullAndEmptyArrays": true
              }
            },
            {
              "$sort": {
                "comments.updatedAt": -1
              }
            },
            {
              "$group": {
                "_id": "$_id",
                "email": { "$first":  "$email" },
                "imgUrl": { "$first": "$imgUrl"},
                "title": { "$first": "$title" },
                "likes": { "$first": "$likes" },
                "body": { "$first": "$body" },
                "createdAt": { "$first": "$createdAt" },
                "updatedAt": { "$first": "$updatedAt" },
                "comments": { "$push": "$comments" }
              }
            }
          ]);
        if(!blog){
            return res.status(400).json({
                "status" : 400,
                "error" : "No such blog found"
            })
        }
        res.status(200).json({
            "status" : 200,
            "blog" : blog[0]
        })
    } catch (error) {
        res.status(400).json({
            "status" : 400,
            "error" : error.message
        })
    }
}

module.exports.updateBlog = async (req,res) => {
    try {
        const blog = await blogsModel.findOneAndUpdate({
            "_id" : req.params.id,
            "email": req.email
        },{
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
            "error" : "No such blog found or blog doesn't belongs to you"
        })
    }
}

module.exports.deleteBlog = async (req,res) => {
    try {
        const email = req.email;
        const blog = await blogsModel.findOneAndDelete({
            "_id" : req.params.id,
            "email" : email
        });
        res.status(200).json({
            "status" : 200,
            "message" : "Blog deleted successfully",
            "id" : blog._id
        })
    } catch (error) {
        res.status(400).json({
            "status" : 400,
            "error" : "No such blog found or blog doesn't belongs to you"
        })
    }
}

module.exports.LikeBlog = async (req, res) => {
  try {
    const email = req.email;
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
