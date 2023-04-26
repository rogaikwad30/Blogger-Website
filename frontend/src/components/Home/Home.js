import React from 'react';
import './Home.css';
import Login from '../GoogleLogin/GoogleLogin';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to my home page!</h1>
      <p>Feel free to explore my website and learn more about me.</p>
      <a href="/dashboard">Move to dashboard</a>
      <br />
      <Login />
    </div>
  );
}

export default Home;
