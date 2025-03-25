import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import {useGitHubLogin} from "react-github-login-button";
import { LinkedIn } from "react-linkedin-login-oauth2";
import Footer from "./Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    workStatus: "fresher",
    role: "job_seeker",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkStatusChange = (status) => {
    setFormData({ ...formData, workStatus: status });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("clicked") ;
      const response = await axios.post(
        "http://localhost:9091/api/users/register",
        JSON.stringify(formData),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("User registered successfully:", response.data);
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data || "Failed to register"));
    }
  };

  const handleGitHubSuccess = async (response) => {
    console.log("GitHub Auth Code:", response.code);
    // Here, you will send 'response.code' to your backend for token exchange
  };

  const handleGitHubFailure = (error) => {
    console.error("GitHub Login Failed:", error);
  };

  const handleGitHubLogin = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_GITHUB_REDIRECT_URI;
    // const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    const githubAuthUrl = `http://localhost:9091/oauth2/authorization/github`;
    window.location.href = githubAuthUrl;
};

  
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
          DAG Job Portal
        </div>
        <div className="navbar-login" style={{ marginRight: "50px" }}>
          Already Registered? <a href="Login" style={{ color: "black" }}>Login here</a>
        </div>
      </nav>

      <div className="register-page" style={{ marginBottom: "75px" }}>
        {/* Left Section: Info Panel */}
        <div className="register-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="User"
            className="register-info-img"
          />
          <h3>On registering, you can</h3>
          <ul>
            <li>✅ Build your profile and let recruiters find you</li>
            <li>✅ Get job postings delivered right to your email</li>
            <li>✅ Find a job and grow your career</li>
          </ul>
        </div>

        {/* Right Section: Registration Form */}
        <div className="register-container">
          <h2>Create your DAG Profile</h2>

          {/* Google Signup Button */}
          <button className="google-button">
            <img
              src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
              alt="Google"
              className="google-icon"
            />
            Continue with Google
          </button>

          <LinkedIn
            clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
            redirectUri={process.env.REACT_APP_LINKEDIN_REDIRECT_URI}
            scope="r_emailaddress r_liteprofile"
            onSuccess={(code) => console.log("LinkedIn Code:", code)}
            onError={(error) => console.error(error)}
          >
            {({ linkedInLogin }) => (
              <button className="linkedin-signin-button" onClick={linkedInLogin}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                  alt="LinkedIn"
                />
                Sign in with LinkedIn
              </button>
            )}
          </LinkedIn>

          <div className="github-signin-container">
  <button className="github-signin-button" onClick={handleGitHubLogin}>
    <img
      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      alt="GitHub"
    />
    Sign in with GitHub
  </button>
</div>


          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="What is your name?"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Mobile Number */}
            <label>Mobile No.</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            {/* Role Selection */}
            <div className="role-container">
              <label htmlFor="role">Role</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="job_seeker">Job Seeker</option>
                <option value="recruiter">Recruiter</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Work Status Selection */}
            <label>Work status</label>
            <div className="work-status-container">
              <label
                className={`work-status-option ${formData.workStatus === "experienced" ? "selected" : ""}`}
                onClick={() => handleWorkStatusChange("experienced")}
              >
                <div className="work-status-content">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="Experienced"
                    className="work-status-icon"
                  />
                  <div>
                    <h4>I'm Experienced</h4>
                    <p>I have work experience (excluding internships)</p>
                  </div>
                </div>
              </label>

              <label
                className={`work-status-option ${formData.workStatus === "fresher" ? "selected" : ""}`}
                onClick={() => handleWorkStatusChange("fresher")}
              >
                <div className="work-status-content">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3069/3069170.png"
                    alt="Fresher"
                    className="work-status-icon"
                  />
                  <div>
                    <h4>I'm a Fresher</h4>
                    <p>I am a student/Haven't worked after graduation</p>
                  </div>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
