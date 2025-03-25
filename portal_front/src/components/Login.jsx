import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:9091/api/users/login", { email, password });
    
      console.log("API Response:", response.data); // Check what data is returned
    
      const { token, role, isProfileComplete, userId } = response.data; // Ensure userId is extracted
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role?.trim().toLowerCase());
      localStorage.setItem("userId", userId); // Store userId
      localStorage.setItem("isProfileComplete", isProfileComplete);
    
      console.log("UserId after login:", userId); // Debugging
    
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "job_seeker") {
          if (isProfileComplete) {
            navigate("/JobListingDashboard"); 
          } else {
            navigate("/JobListingDashboard");
          }
        } else if (role === "recruiter") {
          navigate("/recruiter-dashboard");
        } else {
          navigate("/home");
        }
      }, 500);
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password");
    }
    
  };
  

  

  return (
    <>
      {/* Navbar */}
<nav className="navbar">
  <div className="navbar-left">
    <div className="navbar-logo">
      <img src="/logo.png" alt="Logo" className="logo-img" />
      <span className="portal-name">DAG Job Portal</span>
    </div>
  </div>

  {/* Login & Signup on Right */}
  <div className="navbar-right">
    <a href="/" className="signup-button" style={{marginRight:"50px"}}>Sign Up</a>
  </div>
</nav>



      <div className="login-combined-container" style={{margin: "50px 50px 150px 50px"}}>
        <div className="new-to-naukri">
          <h2>New to DAG?</h2>
          <ul>
            <li>✓ One click apply using DAG profile.</li>
            <li>✓ Get relevant job recommendations.</li>
            <li>✓ Showcase profile to top companies and consultants.</li>
            <li>✓ Know application status on applied jobs.</li>
          </ul>
          <button className="register-free-button" onClick={() => navigate("/register")}>
            Register for Free
          </button>
        </div>

        <div className="login-container">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <label>Email ID/Username</label>
            <input type="text" placeholder="Enter Email ID/Username" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password</label>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <a href="/forgot-password" className="forgot-password">Forgot Password?</a> <br />
            <button type="submit" className="login-button">Login</button> <br />
          </form>

          
          <div className="or-divider">Or</div> 
          <a href="#otp" className="otp">Use OTP to Login</a>
        </div>

        </div>
      <Footer />
    </>
  );
}

export default Login;