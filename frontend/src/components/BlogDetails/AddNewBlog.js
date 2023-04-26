import { useState } from "react";
import helpers from '../../services/common.service';
import { useSelector } from "react-redux";

const AddNewBlog = () => {
  const user = useSelector((state) => state.user);
  const [blogData, setBlogData] = useState({
    title: "",
    imgUrl: "",
    body: "",
    email: user.email
  });
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
      const blog = await helpers.addNewBlog(blogData,{"access-token": user.token})
      setmessage(blog.message)
      setBlogData({
        title: "",
        imgUrl: "",
        body: "",
        email: user.email
      })
    } catch (err) {
      console.error("Failed to add blog", err);
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
      <button type="submit">Submit</button>
      <a href="/dashboard">Move to dashboard</a>
    </form>
  );
};

export default AddNewBlog;
