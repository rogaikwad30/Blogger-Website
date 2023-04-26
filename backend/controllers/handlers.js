const userModel = require("../models/User");
const blogsModel = require("../models/Blog");
const dbValidator = require("../services/db-validations");

module.exports.getDashboardData = async (req,res) => {
    try {
        const data = await blogsModel.aggregate([
            {
              $facet: {
                myBlogs: [
                  { $match: { email: req.headers['email']} },
                  { $sort: { createdAt: -1 } }
                ],
                otherBlogs: [
                  { $match: { email: { $ne: req.headers['email'] } } },
                  { $sort: { createdAt: -1 } }
                ]
              }
            }
        ]);          
        res.status(200).json({
            "blogs_by_other_users" : data[0].otherBlogs,
            "blogs_by_me" : data[0].myBlogs
        })
    } catch (error) {
        res.status(400).json({
            "error" : error.message,
            "blogs_by_other_users" : [],
            "blogs_by_me" : []
        })
    }
}


module.exports.loginUser = async (req,res) => {
    try {
        const user = await userModel.findOne({
            "email" : req.body.email
        })
        if(user){
            res.status(200).json({
                "message" : "user already exists, please proceed",
                "status": 200
            })   
        }
        else{
            await userModel.create(req.body)
            res.status(200).json({
                "message" : "user registered succesfully",
                "status": 200
            })  
        }
    } catch (error) {
        const errors = dbValidator.checkErrors(error);
        res.status(400).json({
            "errors" : errors,
            "status" : 400
        })
    }
}

module.exports.addBlog = async (req,res) => {
    try {
        const blog = await blogsModel.create(req.body);
        res.status(200).json({
            "status" : 200,
            "message" : "Blog added successfully"
        })
    } catch (error) {
        const errors = dbValidator.checkErrors(error)
        res.status(400).json({
            "status" : 400,
            "error" : errors
        })
    }
}