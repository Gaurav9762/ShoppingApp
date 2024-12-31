import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { getBaseURL } from "../apiConfig";
import TokenRefresher from "../Utils/token";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const changePass = (e) => {
    setPassword(e.target.value);
  };

  const handlecheck = () => {
    console.log("clicked");
    if (validateInputs()) {
      console.log("Login Successful");
    } else {
      console.log("Login Failed");
    }
    // console.log("Login Failed");
  };
  const validateInputs = () => {
    if (!validateEmail(email)) {
      setError("Please provide a valid email address.");
      return false;
    } else if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  function handleClick() {
    if (validateInputs()) {
      const user = {
        email: email,
        password: password,
      };
      let url = `${getBaseURL()}api/users/login`;
      axios
        .post(url, { ...user })
        .then((res) => {
          console.log(res);
          if (res.data.length > 0) {
            console.log("Logged in successfully");
            sessionStorage.setItem("isUserAuthenticated", true);
            const user = res.data[0].isAdmin;
            sessionStorage.setItem("customerId", res.data[0].userId);
            sessionStorage.setItem("isAdmin", user ? true : false);
            sessionStorage.setItem("jwt_token", res.data[0].token);
            sessionStorage.setItem(
              "jwt_refresh_token",
              res.data[0].refreshToken
            );
            TokenRefresher(res.data[0].refreshToken);
            props.setUserAuthenticatedStatus(
              user ? true : false,
              res.data[0].userId
            );
          } else {
            console.log("User not available");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log("error");
        });
    }
  }
  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <div>
          <label>E-Mail</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={changePass}></input>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button onClick={handlecheck}>Login</button>
      </div>
    </>
  );
}
