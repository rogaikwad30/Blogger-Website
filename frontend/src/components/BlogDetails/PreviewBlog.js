import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import helpers from "../../services/common.service";

const PreviewBlog = (props) => {
  const id = props.id;
  const user = useSelector((state) => state.user);
  const [blog,setBlog] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSubmitError, setCommentSubmitError] = useState(null);

  useEffect(() => {
    helpers.PreviewBlog(id).then(data => {
      if(data.status === 200){  
        setBlog(data.blog)
      }
    });
  },[id]);

  const deleteComment = (commentId) => {
    helpers.deleteComment(commentId,{"access-token": user.token }).then(data => {
      if(data.status === 200){  
        setBlog(prevBlog => {
          const updatedComments = prevBlog.comments.filter(comment => comment._id !== commentId);
          return {
            ...prevBlog,
            comments: updatedComments
          }
        });
      }
    });
  };

  const updateComment = (commentId, updatedComment) => {
    helpers.updateComment(commentId, updatedComment, {"access-token": user.token }).then(data => {
      if(data.status === 200){  
        setBlog(prevBlog => {
          const updatedComments = prevBlog.comments.map(comment => {
            if (comment._id === commentId) {
              return {...comment, actualComment: updatedComment, updatedAt: new Date()}
            } else {
              return comment;
            }
          });
          return {
            ...prevBlog,
            comments: updatedComments
          }
        });
      }
    });
  };
  
  const handleNewCommentSubmit = (event) => {
    event.preventDefault();
    if(!newComment){
      setCommentSubmitError("Please type comment first.");
      return;
    }
    setSubmittingComment(true);
    setCommentSubmitError(null);
    helpers.addComment(blog._id, newComment, {"access-token": user.token }).then(data => {
      if (data.status === 200) {
        setBlog(prevBlog => {
          return {
            ...prevBlog,
            comments: [data.comment,...prevBlog.comments]
          }
        });
        setNewComment("");
        setSubmittingComment(false);
      } else {
        setCommentSubmitError("Error submitting comment. Please try again later.");
        setSubmittingComment(false);
      }
    });
  };

  if(blog){
    return (
        <div>
          <img src={blog.imgUrl} alt={blog.title} />
          <h1>{blog.title}</h1>
          <p>{blog.body}</p>
          <p>{blog.likes.length} likes</p>
          <ul>
            <li>
              <form onSubmit={handleNewCommentSubmit}>
                <input type="text" placeholder="Type your comment here" value={newComment} onChange={(event) => { setCommentSubmitError(""); setNewComment(event.target.value)}} />
                <button type="submit" disabled={submittingComment}>Submit</button>
                {commentSubmitError && <p>{commentSubmitError}</p>}
              </form>
            </li>
            {blog.comments.map((comment) => (
              <li key={comment._id}>
                <p>{comment.actualComment}</p>
                <p>by {comment.email}</p>
                <p>comment last updated at {comment.updatedAt.toString()}</p>
                {comment.email === user.email ? (
                    <div>
                      <button onClick={() => deleteComment(comment._id)}>
                        Delete comment
                      </button>
                      <button onClick={() => updateComment(comment._id)}>
                        Update comment
                      </button>
                    </div>
                    ) : null}
              </li>
            ))}
          </ul>
          <p>blog created at {blog.createdAt.toString()}</p>
          <p>blog updated at {blog.updatedAt.toString()}</p>
        </div>
      );
  } else {
    return <p>Loading blog...</p>
  }
}

export default PreviewBlog;
