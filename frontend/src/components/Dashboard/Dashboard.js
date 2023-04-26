import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import helpers from '../../services/common.service';

function Dashboard() {
  helpers.validateLogin();

  const [blogsByOtherUsers, setBlogsByOtherUsers] = useState([]);
  const [blogsByMe, setBlogsByMe] = useState([]);

  useEffect(() => {
    helpers.getDashboardData().then(data => {
      setBlogsByOtherUsers(data.blogs_by_other_users);
      setBlogsByMe(data.blogs_by_me);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Blogs by other users:</h2>
      <ul>
        {blogsByOtherUsers.map(blog => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
      <h2>My blogs:</h2>
      <button>
        <a href="/blog/new">Add New blog</a>
      </button>
      <ul>
        {blogsByMe.map(blog => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
