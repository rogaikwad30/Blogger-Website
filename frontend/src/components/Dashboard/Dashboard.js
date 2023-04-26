import React, { useState, useEffect } from 'react';
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

  const DeleteBlog = async (id) => {
    try {
      await helpers.DeleteBlog(id)
      setBlogsByMe(blogsByMe.filter((blog) => {
        return blog._id !== id
      }))
    } catch (error) {
      console.log("Error Deleting - ",error);
    }
  }

  const LikeBlog = async (id,email) => {
    try {
      const resp = await helpers.LikeBlog(id,email)
      if(resp.status === 200){        
        const data = [];
        for(let i of blogsByOtherUsers){
          if(i["_id"] === id){
            data.push(resp.blog)
          }
          else{
            data.push(i)
          }
        }
        setBlogsByOtherUsers(data)
      }
    } catch (error) {
      console.log("Error liking blog - ",error);
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
            <button onClick={() => LikeBlog(blog._id,user.email)}>Like - {blog.likes.length}</button>
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
