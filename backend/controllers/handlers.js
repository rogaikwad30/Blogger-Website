const userModel = require("../models/User");
const dbValidator = require("../services/db-validations");

module.exports.getDashboardData = async (req,res) => {
    try {
        res.status(200).json({
            "blogs_by_other_users" : [
                {
                    "title" : "one"
                }
            ],
            "blogs_by_me" : [
                {
                    "title" : "mine"
                }
            ]
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
            await userModel.create({
                "email" : req.body.email,
                "googleId" : req.body.googleId,
                "name" : req.body.name
            })

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