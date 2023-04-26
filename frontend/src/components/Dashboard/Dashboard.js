import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import helpers from '../../services/common.service';
import { useSelector } from "react-redux";

function Dashboard() {
  helpers.validateLogin();
  const user = useSelector((state) => state.user);
  const [blogsByOtherUsers, setBlogsByOtherUsers] = useState([]);
  const [blogsByMe, setBlogsByMe] = useState([]);

  useEffect(() => {
    helpers.getDashboardData(user.email).then(data => {
      setBlogsByOtherUsers(data.blogs_by_other_users);
      setBlogsByMe(data.blogs_by_me);
    });
  }, [user.email]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Blogs by other users:</h2>
      <ul>
        {blogsByOtherUsers.map(blog => (
          <div key={blog._id}>
            <a href={"/blog/" + blog._id + "/preview"}>
              <li>{blog.title}</li>
            </a>
            <a style={{"margin":"10px"}} href={"/blog/" + blog._id + "/preview"}>preview</a>
          </div>
        ))}
      </ul>
      <h2>My blogs:</h2>
      <button>
        <a href="/blog/new/edit">Add New blog</a>
      </button>
      <ul>
        {blogsByMe.map(blog => (
          <div key={blog._id}>
            <a href={"/blog/" + blog._id + "/preview"}>
              <li>{blog.title}</li>
            </a>
            <a style={{"margin":"10px"}} href={"/blog/" + blog._id + "/preview"}>preview</a>
            <a style={{"margin":"10px"}} href={"/blog/" + blog._id + "/edit"}>edit</a>
            <button style={{"margin":"10px"}}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
