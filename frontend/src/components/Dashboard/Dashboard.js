import React, { useState, useEffect, useRef } from "react";
import helpers from "../../services/common.service";
import { useSelector } from "react-redux";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

import "./Dashboard.css";

function Dashboard() {
  helpers.validateLogin();
  const carouselRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [blogsByOtherUsers, setBlogsByOtherUsers] = useState([]);
  const [blogsByMe, setBlogsByMe] = useState([]);

  useEffect(() => {
    helpers.getDashboardData(user.token).then((data) => {
      if (data.status === 200) {
        setBlogsByOtherUsers(data.blogs_by_other_users);
        setBlogsByMe(data.blogs_by_me);
      }
      if (carouselRef.current) {
        new Glide(carouselRef.current, {
          type: "carousel",
          perView: 3,
          gap: 20,
          breakpoints: {
            768: {
              perView: 2,
            },
            576: {
              perView: 1,
            },
          },
        }).mount();
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

  return (
    <div className="row">
      <h1 className="title">Howdy, {user.name}!</h1>
      <h2>Checkout Latest Blogs by your peers,</h2>
      {blogsByOtherUsers.map((blog) => (
        <div key={blog._id} className="example-2 card">
          <div
            className="wrapper"
            style={{ backgroundImage: `url(${blog.imgUrl})` }}
          >
            <div className="header">
              <div className="date">
                <span className="day">{blog.updatedAt.split("T")[0]}</span>
                {/* <span className="month">Aug</span>
          <span className="year">2016</span> */}
              </div>
              <ul className="menu-content">
                <li>
                  <a href="#" className="fa fa-bookmark-o"></a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => LikeBlog(blog._id)}
                    className="fa fa-thumbs-up"
                  >
                    <span>{blog.likes.length}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={"/blog/" + blog._id + "/preview"}
                    className="fa fa-comment"
                  >
                    <span>Click</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="data">
              <div className="content">
                <span className="author">{blog.email}</span>
                <h2 className="title">
                  <a href={"/blog/" + blog._id + "/preview"}>{blog.title}</a>
                </h2>
                <p className="text">{blog.title}</p>
                <a href={"/blog/" + blog._id + "/preview"} className="button">
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <h2>Checkout your own blogs : </h2>
      {blogsByMe.map((blog) => (
        <div key={blog._id} className="example-2 card">
          <div
            className="wrapper"
            style={{ backgroundImage: `url(${blog.imgUrl})` }}
          >
            <div className="header">
              <div className="date">
                <span className="day">{blog.updatedAt.split("T")[0]}</span>
                {/* <span className="month">Aug</span>
          <span className="year">2016</span> */}
              </div>
              <ul className="menu-content">
                <li>
                  {/* <a href="#" className="fa fa-bookmark-o"></a> */}
                </li>
                <li>
                  <p
                    onClick={() => DeleteBlog(blog._id)}
                    className="fa fa-trash"
                  >
                    <span>{blog.likes.length}</span>
                  </p>
                </li>
                <li>
                  <a
                    href={"/blog/" + blog._id + "/edit"}
                    className="fa fa-pen"
                  >
                    <span></span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="data">
              <div className="content">
                <span className="author">{blog.email}</span>
                <h2 className="title">
                  <a href={"/blog/" + blog._id + "/preview"}>{blog.title}</a>
                </h2>
                <p className="text">{blog.title}</p>
                <a href={"/blog/" + blog._id + "/preview"} className="button">
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
  </div>
  );
}

export default Dashboard;
