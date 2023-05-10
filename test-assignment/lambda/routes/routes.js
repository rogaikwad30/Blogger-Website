const express = require('express');
const controllers = require('../controllers/handlers');
const blogControllers = require('../controllers/blogs');
const commentControllers = require('../controllers/comments');
const jwt = require("../services/jwt");

const router = express.Router();

router.post("/login", controllers.loginUser);
router.get("/dashboard-data", jwt.validateJwt ,controllers.getDashboardData);

router.get("/blog/:id", blogControllers.readBlog);
router.post("/blog", jwt.validateJwt, blogControllers.createBlog);
router.put("/blog/:id", jwt.validateJwt, blogControllers.updateBlog);
router.delete("/blog/:id", jwt.validateJwt, blogControllers.deleteBlog);
router.get("/like/blog/:id", jwt.validateJwt, blogControllers.LikeBlog)

router.post("/comment", jwt.validateJwt, commentControllers.createComment)
router.put("/comment", jwt.validateJwt, commentControllers.updateComment)
router.delete("/comment", jwt.validateJwt, commentControllers.deleteComment)
router.post("/get-comment-for-blog", jwt.validateJwt, commentControllers.readCommentsForParticularBlog)

router.get("/health", (req,res)=>{
    res.json({
        "message" : "test works"
    })
})

router.get("/", (req,res)=>{
    res.json({
        "message" : "It worked fine"
    })
})

module.exports = router;
