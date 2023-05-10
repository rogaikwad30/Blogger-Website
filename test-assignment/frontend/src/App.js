import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import BlogDetails from './components/BlogDetails/BlogDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/:id/:mode" element={<BlogDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
