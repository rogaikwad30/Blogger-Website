const express = require('express');
const cors = require('cors');
const db = require('./services/mongodb');
const controllers = require('./controllers/handlers');
const blogControllers = require('./controllers/blogs');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;


const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: allowedOrigins,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/dashboard-data", controllers.getDashboardData);
app.post("/login", controllers.loginUser);

app.post("/blog", blogControllers.createBlog);
app.get("/blog/:id", blogControllers.readBlog);
app.put("/blog/:id", blogControllers.updateBlog);
app.delete("/blog/:id", blogControllers.deleteBlog);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
