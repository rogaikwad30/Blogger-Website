import React, { useState, useEffect } from "react";
import helpers from "../../services/common.service";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import "./Dashboard.css";
import { setUserLogout } from '../../redux-store/store';

function Dashboard() {
  helpers.validateLogin();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [blogsByOtherUsers, setBlogsByOtherUsers] = useState([]);
  const [blogsByMe, setBlogsByMe] = useState([]);

  useEffect(() => {
    helpers.getDashboardData(user.token).then((data) => {
      if (data.status === 200) {
        setBlogsByOtherUsers(data.blogs_by_other_users);
        setBlogsByMe(data.blogs_by_me);
      }
    });
  }, [user.token]);

  const DeleteBlog = async (id) => {
    try {
      const headers = {
        "access-token": user.token,
      };
      const resp = await helpers.DeleteBlog(id, headers);
      if (resp.status === 200) {
        setBlogsByMe(
          blogsByMe.filter((blog) => {
            return blog._id !== id;
          })
        );
      }
    } catch (error) {
      console.log("Error Deleting - ", error);
    }
  };

  const LikeBlog = async (id) => {
    try {
      const resp = await helpers.LikeBlog(id, user.token);
      if (resp.status === 200) {
        const data = [];
        for (let i of blogsByOtherUsers) {
          if (i["_id"] === id) {
            data.push(resp.blog);
          } else {
            data.push(i);
          }
        }
        setBlogsByOtherUsers(data);
      }
    } catch (error) {
      console.log("Error liking blog - ", error);
    }
  };

  const LogOut = () => {
    dispatch(setUserLogout());
  }

  return (
    <div className="cards">
      <h1>Howdy, <strong>{user.name.split(" ")[0]}!</strong></h1>
      <section>
        <a className="new_blog" href="/blog/new/edit">Create a New Blog</a>
        <a className="logout"  onClick={() => LogOut()} href="/">Logout</a>
      </section>
      <h2>Checkout Blogs by your peers,</h2>

      {blogsByOtherUsers.map((blog) => (
        <div key={Blob._id} className="card card__one">
          <div className="card__bg"></div>
          <img height="100%" width="100%" alt={blog.title + "source"}  className="card__img" src={blog.imgUrl} />
          <div className="card__text">
          <a href={"/blog/" + blog._id + "/preview"}>
          <p className="card__title">{blog.title}</p>
          </a>
          <div className="card_buttons" onClick={() => LikeBlog(blog._id)}>
            <i class="fa-regular fa-heart"></i>
            <br></br>
            {blog.likes.length}
          </div>
         
          </div>
        </div>
      ))}

      <br></br>
      <br></br>
      <h2>My Blogs,</h2>

      {blogsByMe.map((blog) => (
        <div key={blog._id} className="card card__one">
          <div className="card__bg"></div>
          <img alt={"blog cover link"} className="card__img" src={blog.imgUrl} />
          <div className="card__text">
          <a href={"/blog/" + blog._id + "/preview"}>
          <p className="card__title">{blog.title}</p>
          </a>
          <div className="card_buttons2">
            <i class="fa-regular fa-heart"></i>
            <a href={"/blog/" + blog._id + "/edit"}> <i class="fa-regular fa-edit" ></i></a>
            <i  onClick={() => DeleteBlog(blog._id)} class="fa fa-trash"></i>
          </div>
         
          </div>
        </div>
      ))}
  </div>
  );
}

export default Dashboard;
