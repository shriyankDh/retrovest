import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // optional CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🌀 RetroVest</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/time-machine">Time Machine</Link></li>
        {/* Added Market Analysis link */}
        <li><Link to="/market-analysis">Market Analysis</Link></li>
        <li><a href="#about">About</a></li>
        <li><Link to="/SignupPage">Sign Up</Link></li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
