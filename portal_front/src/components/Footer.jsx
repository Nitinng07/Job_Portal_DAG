import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h4>About Us</h4>
          <p>
            DAG Job Portal connects job seekers with top employers, 
            providing a seamless job application experience. 
            Get personalized job recommendations and career growth opportunities.
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>📞 +91 90961 74933</p>
          <p>✉️ careers@directadmissionguideline.com</p>
          <p>📍 Offc. No. - 72, 1st floor, Gol Market, Near YCM Hospital, Pimpri, Pune - 18</p>
        </div>

        {/* Social Media Links */}
<div className="footer-section social-media">
  <h4 className="text-white">Follow Us</h4> {/* Title in white */}
  <div className="social-icons d-flex flex-column" >
    <a href="#" className="text-white mb-1" style={{fontSize:"18px"}}>
      <i className="bi bi-linkedin me-2"></i> LinkedIn
    </a>
    <a href="#" className="text-white mb-1" style={{fontSize:"18px"}}>
      <i className="bi bi-twitter me-2"></i> Twitter
    </a>
    <a href="#" className="text-white" style={{fontSize:"18px"}}>
      <i className="bi bi-instagram me-2"></i> Instagram
    </a>
  </div>
</div>



        {/* Help & Policy */}
        <div className="footer-section policy">
          <h4>Quick Links</h4>
          <a href="/help">Help Center</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 DAG Job Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer ;
