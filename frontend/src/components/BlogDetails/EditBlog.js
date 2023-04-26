import React , { useState, useEffect } from "react";
import helpers from '../../services/common.service';
import { useSelector } from "react-redux";

const EditBlog = (props) => {
  const user = useSelector((state) => state.user);
  const [blogData, setBlogData] = useState({
    title: "",
    imgUrl: "",
    body: "",
    email: user.email
  });

  const id = props.id;

  useEffect(() => {
    helpers.PreviewBlog(id).then(data => {
      if(data.status === 200 && data.blog["email"] === user.email){  
        setBlogData(data.blog)
      }
      else{
          setmessage("This blog doesn't belongs to you")
      }
    });
  },[id,user.email]);

  const [message, setmessage] = useState('');

  const handleInputChange = (e) => {
    setmessage('')
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setmessage('')
        const blog = await helpers.UpdateBlog(id,blogData,{"access-token": user.token})
        setmessage(blog.message)
    } catch (err) {
      console.error("Failed to update blog", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={blogData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="imgUrl">Image URL:</label>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={blogData.imgUrl}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          name="body"
          value={blogData.body}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      <h6>{message}</h6>
      <button type="submit">Update</button>
      <a href="/dashboard">Move to dashboard</a>
    </form>
  );
};


export default EditBlog;