import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import helpers from "../../services/common.service";
import "./blogPreview.css";

const PreviewBlog = (props) => {
  const id = props.id;
  const user = useSelector((state) => state.user);
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSubmitError, setCommentSubmitError] = useState(null);
  const [commentMode, setCommentMode] = useState("view");
  const [commentId, setCommentId] = useState(null);
  const [originalComment, setOriginalComment] = useState(null);

  useEffect(() => {
    helpers.PreviewBlog(id).then((data) => {
      if (data.status === 200) {
        setBlog(data.blog);
      }
    });
  }, [id]);

  const deleteComment = (commentId) => {
    helpers
      .deleteComment(commentId, { "access-token": user.token })
      .then((data) => {
        if (data.status === 200) {
          setBlog((prevBlog) => {
            const updatedComments = prevBlog.comments.filter(
              (comment) => comment._id !== commentId
            );
            return {
              ...prevBlog,
              comments: updatedComments,
            };
          });
        }
      });
  };

  const changeCommentMode = (id) => {
    if (commentMode === "view") {
      setCommentMode("edit");
      setCommentId(id);
      for (let i of blog.comments) {
        if (i["_id"] === id) {
          setOriginalComment(i["actualComment"]);
          break;
        }
      }
    } else {
      setCommentMode("view");
    }
  };

  const updateComment = (commentId, updatedComment) => {
    helpers
      .updateComment(commentId, updatedComment, { "access-token": user.token })
      .then((data) => {
        if (data.status === 200) {
          setBlog((prevBlog) => {
            const updatedComments = prevBlog.comments.map((comment) => {
              if (comment._id === commentId) {
                return data.comment;
              } else {
                return comment;
              }
            });
            return {
              ...prevBlog,
              comments: updatedComments,
            };
          });
          setCommentMode("view");
        }
      });
  };

  const handleNewCommentSubmit = (event) => {
    event.preventDefault();
    if (!newComment) {
      setCommentSubmitError("Please type comment first.");
      return;
    }
    setSubmittingComment(true);
    setCommentSubmitError(null);
    helpers
      .addComment(blog._id, newComment, { "access-token": user.token })
      .then((data) => {
        if (data.status === 200) {
          setBlog((prevBlog) => {
            return {
              ...prevBlog,
              comments: [data.comment, ...prevBlog.comments],
            };
          });
          setNewComment("");
          setSubmittingComment(false);
        } else {
          setCommentSubmitError(
            "Error submitting comment. Please try again later."
          );
          setSubmittingComment(false);
        }
      });
  };

  if (blog) {
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

        <div className="blog-post">
          <div className="blog-header">
            <img src={blog.imgUrl} alt="Blog Cover" />
            <h1 className="blog-title">{blog.title}</h1>
          </div>
          <div className="blog-body">
            <div class="blog-info">
              <p class="blog-likes">Total likes: {blog.likes.length}</p>
              <p class="blog-updated-at">
                Last updated: {blog.updatedAt.split("T")[0]}{" "}
                {blog.updatedAt.split("T")[1].split(".")[0]}
              </p>
            </div>
            <p>{blog.body}</p>
          </div>
          <div className="blog-comments">
            <h2 className="comments-heading">Recent Comments</h2>

            
              <form style={{"left":"0%","margin":"22px 0px"}} className="newBlogForm" onSubmit={handleNewCommentSubmit}>
                <input type="text" placeholder="Type your comment here" value={newComment} onChange={(event) => { setCommentSubmitError(""); setNewComment(event.target.value)}} />
                <button type="submit" disabled={submittingComment}>Submit</button>
                {commentSubmitError && <p>{commentSubmitError}</p>}
              </form>
            

            <ul className="comments-list">
              {blog.comments.map((comment) => (
                <li className="comment" key={comment._id}>
                  {commentMode === "edit" && commentId === comment._id ? (
                    <input
                      value={originalComment}
                      onChange={(event) => {
                        setOriginalComment(event.target.value);
                      }}
                    />
                  ) : (
                    <p className="comment-text">{comment.actualComment}</p>
                  )}

                  <p className="comment-author">Posted by: {comment.email}</p>
                  <p className="comment-date">
                    Last updated At: {comment.updatedAt.toString()}
                  </p>
                  {comment.email === user.email ? (
                    <div>
                      <button onClick={() => deleteComment(comment._id)}>
                        Delete comment
                      </button>
                      <button onClick={() => changeCommentMode(comment._id)}>
                        Edit comment
                      </button>
                      {commentMode === "edit" && commentId === comment._id ? (
                        <button
                          onClick={() =>
                            updateComment(comment._id, originalComment)
                          }
                        >
                          Update comment
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Error Fetching Data from Server</p>;
  }
};

export default PreviewBlog;
