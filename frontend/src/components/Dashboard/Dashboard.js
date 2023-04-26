import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <ul>
        <li><Link to="/blog/1">Blog post 1</Link></li>
        <li><Link to="/blog/2">Blog post 2</Link></li>
        <li><Link to="/blog/3">Blog post 3</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;