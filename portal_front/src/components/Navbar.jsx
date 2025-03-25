import React from 'react';
import './Navbar.css'; // Import your Navbar.css file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="naukri-logo.png" // Replace with your logo path
          alt="Naukri Logo"
          className="navbar-logo"
        />
        <ul className="navbar-links">
          <li>
            <a href="#jobs">Jobs</a>
          </li>
          <li>
            <a href="#companies">Companies</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search jobs here"
            className="search-input"
          />
          <button className="search-button"></button>
        </div>
        <ul className="navbar-actions">
          <li>
            <a href="#login">Login</a>
          </li>
          <li>
            <button className="register-button">Register</button>
          </li>
          <li>
            <a href="#employers">For employers ▾</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;