import { useState } from "react";
import helpers from "../../services/common.service";
import { useSelector } from "react-redux";
import "./blogForm.css";

const AddNewBlog = () => {
  const user = useSelector((state) => state.user);
  const [blogData, setBlogData] = useState({
    title: "",
    imgUrl: "",
    body: "",
    email: user.email,
  });
  const [message, setmessage] = useState("");

  const handleInputChange = (e) => {
    setmessage("");
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setmessage("");
      const blog = await helpers.addNewBlog(blogData, {
        "access-token": user.token,
      });
      setmessage(blog.message);
      setBlogData({
        title: "",
        imgUrl: "",
        body: "",
        email: user.email,
      });
    } catch (err) {
      console.error("Failed to add blog", err);
    }
  };

  return (
    <div className="cards">
      <h1>
        Howdy, <strong>{user.name.split(" ")[0]}!</strong>
      </h1>
      <section>
        <a className="new_blog" href="/dashboard">
          Dashboard
        </a>
      </section>
      <h2>Create a new Blog</h2>

      <form className="newBlogForm" onSubmit={handleSubmit}>
        <label>{message}</label>
        <label>Blog Title:</label>
        <input
          placeholder="Enter the title of your blog post"
          type="text"
          id="title"
          name="title"
          value={blogData.title}
          onChange={handleInputChange}
          required
        />

        <label>Cover Image Link:</label>
        <input
          placeholder="Enter the URL of your cover image"
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={blogData.imgUrl}
          onChange={handleInputChange}
          required
        />

        <label>Blog Body:</label>
        <textarea
          rows="10"
          placeholder="Enter the body of your blog post"
          id="body"
          name="body"
          value={blogData.body}
          onChange={handleInputChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddNewBlog;
