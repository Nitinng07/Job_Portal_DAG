import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import "../styles/auth.css"; // Ensure styling matches Login page

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:9091/api/users/forgot-password?email=" + email, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        setMessage("Reset link sent! Check your email.");
      } else {
        setMessage("Error sending reset link.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center">Forgot Password?</h3>
        <p className="text-center">Enter your email to receive a reset link.</p>
        {message && <p className="alert alert-info">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success w-100" type="submit">
            Send Reset Link
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login" className="text-success">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
