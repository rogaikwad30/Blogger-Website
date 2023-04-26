import React , { useState, useEffect } from "react";
import helpers from "../../services/common.service";

const PreviewBlog = (props) => {
  const id = props.id;
  const [blog,setBlog] = useState(null);

  useEffect(() => {
    helpers.PreviewBlog(id).then(data => {
      if(data.status === 200){  
        setBlog(data.blog)
      }
    });
  },[id]);

  if(blog){
    return (
        <div>
          <img src={blog.imgUrl} alt={blog.title} />
          <h1>{blog.title}</h1>
          <p>{blog.body}</p>
          <p>{blog.likes.length} likes</p>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment._id}>
                <p>{comment.text}</p>
                <p>by {comment.email}</p>
                <p>created at {comment.createdAt.toString()}</p>
              </li>
            ))}
          </ul>
          <p>created at {blog.createdAt.toString()}</p>
          <p>updated at {blog.updatedAt.toString()}</p>
        </div>
      );
  }
  return (
    <div>
    </div>
  );
};

export default PreviewBlog;
