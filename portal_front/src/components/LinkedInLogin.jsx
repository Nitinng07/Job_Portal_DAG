import React from "react";
import LinkedIn from "react-linkedin-login-oauth2";

const LinkedInLogin = () => {
  return (
    <LinkedIn
      clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
      redirectUri={process.env.REACT_APP_LINKEDIN_REDIRECT_URI}
      onSuccess={(code) => console.log("LinkedIn Code:", code)}
      onError={(error) => console.error(error)}
    >
      {({ linkedInLogin }) => (
        <button className="linkedin-signin-button" onClick={linkedInLogin}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
          Sign in with LinkedIn
        </button>
      )}
    </LinkedIn>
  );
};

export default LinkedInLogin;
