const express = require('express');
const cors = require('cors');
const db = require('./services/mongodb');
const controllers = require('./controllers/handlers');
const blogControllers = require('./controllers/blogs');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const jwt = require("./services/jwt");


const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: allowedOrigins,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.post("/login", controllers.loginUser);
app.get("/dashboard-data", jwt.validateJwt ,controllers.getDashboardData);

app.post("/blog", jwt.validateJwt, blogControllers.createBlog);
app.get("/blog/:id", blogControllers.readBlog);
app.put("/blog/:id", jwt.validateJwt, blogControllers.updateBlog);
app.delete("/blog/:id", jwt.validateJwt, blogControllers.deleteBlog);

app.get("/like/blog/:id", jwt.validateJwt, blogControllers.LikeBlog)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
