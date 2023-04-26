const userModel = require("../models/User");
const blogsModel = require("../models/Blog");
const config = require("../config.json");
const jwt = require("../services/jwt");
const dbValidator = require("../services/db-validations");

module.exports.getDashboardData = async (req,res) => {
    try {
        const data = await blogsModel.aggregate([
            {
              $facet: {
                myBlogs: [
                  { $match: { email: req.email} },
                  { $sort: { createdAt: -1 } }
                ],
                otherBlogs: [
                  { $match: { email: { $ne: req.email } } },
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
        const token = jwt.generateToken(req.body.email)
        if(user){
            res.status(200).json({
                "message" : "user already exists, please proceed",
                "token" : token,
                "status": 200
            })   
        }
        else{
            await userModel.create(req.body)
            res.status(200).json({
                "message" : "user registered succesfully",
                "token" : token,
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
