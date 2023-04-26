import React, { useState, useEffect } from 'react';
import helpers from '../../services/common.service';
import { useSelector } from "react-redux";

function Dashboard() {
  helpers.validateLogin();
  const user = useSelector((state) => state.user);
  const [blogsByOtherUsers, setBlogsByOtherUsers] = useState([]);
  const [blogsByMe, setBlogsByMe] = useState([]);
  
  const FetchData = () => {
    helpers.getDashboardData(user.email).then(data => {
      setBlogsByOtherUsers(data.blogs_by_other_users);
      setBlogsByMe(data.blogs_by_me);
    });
  }

  useEffect(() => {
    helpers.getDashboardData(user.email).then(data => {
      setBlogsByOtherUsers(data.blogs_by_other_users);
      setBlogsByMe(data.blogs_by_me);
    });
  }, [user.email]);

  const DeleteBlog = async (id) => {
    try {
      const resp = await helpers.DeleteBlog(id)
      setBlogsByMe(blogsByMe.filter((blog) => {
        return blog._id !== id
      }))
      FetchData()
    } catch (error) {
      console.log("Error Deleting - ",error);
    }
  }

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
            <button style={{"margin":"10px"}} onClick={() => DeleteBlog(blog._id)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
