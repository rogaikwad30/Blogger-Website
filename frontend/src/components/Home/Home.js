import React from "react";
import "./Home.css";
import Login from "../GoogleLogin/GoogleLogin";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to <b className="name">rohan-blogger.com!</b></h1>
      <p>
        Feel free to explore rohan-blogger.com and contact us for further details.
      </p>
      <div>
        <a href="/dashboard"> Already Logged In ? Move to dashboard</a>
      </div>
      <br />
      <b className="googleBtn">
        <Login />
      </b>
    </div>
  );
}

export default Home;
