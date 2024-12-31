import React, { useState } from "react";
import Register from "../register/Register";
import Login from "../Login/Login";

export default function LoginRegisterContainer(props) {
  const [isRegisterUser, setRegisteredUser] = useState(true);
  const navigateToLoginPage = () => {
    setRegisteredUser(true);
  };

  const navigateToRegisterPage = () => {
    setRegisteredUser(false);
  };

  return (
    <div className="login-Register-container">
      <div className="form-container">
        <div className="logo">{/* <img src={logo} alt="Logo" /> */}</div>
        {isRegisterUser ? (
          <Login
            navigateToRegisterPage={navigateToRegisterPage}
            setUserAuthenticatedStatus={props.setUserAuthenticatedStatus}
          />
        ) : (
          <Register navigateToLoginPage={navigateToLoginPage} />
        )}
      </div>
    </div>
  );
}
