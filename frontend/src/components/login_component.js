import React, { Component, useState } from "react";
import {useNavigate} from "react-router-dom";
import linkedinLogo from '../assets/images/linkedin.png'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./css/login-signup.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./loggedIn";
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  const LoginLinkedin = () => {
    window.location.href = "http://localhost:5000/auth/linkedin";
  };

  return (
    <div className="loginWrapper">
      <div className="innerLoginWrapper">
        <form onSubmit={handleSubmit} className="custom-form-main-container">
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            Don't have an account? <a href="/sign-up">Sign Up</a>
          </p>
          
          <h6>Or</h6>

          <div className="d-grid">
            <button onClick={LoginLinkedin} className="btn btn-primary">
              <LinkedInIcon style={{fontSize:'30'}}/>
              &nbsp;
              Continue with <b>LinkedIn</b>
              {/* <img src={linkedinLogo} width={25}></img> */}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
