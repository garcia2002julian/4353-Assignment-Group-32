import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

const LoginForm = () => {
  const [popupStyle, showPopup] = useState("hide");
  const [usernamelog, setUsername] = useState("");
  const [passwordlog, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const [logInStatus, setLoginStatus] = useState("");
  const popup = () => {
    showPopup("login-p");
    setTimeout(() => showPopup("hide"), 3000);
  };

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: usernamelog,
        password: passwordlog,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          
          axios
            .get(`http://localhost:3001/getUserInfo/${usernamelog}`, {})
            .then((response) => {
              console.log(response.data[0].password);
              auth.login_(usernamelog);
              navigate('/Profile')
              
            });
        }
        console.log(response.data);
      });

    // if(usernamelog == "student1" && passwordlog == "123456"){

    // }
  };

  return (
    <section className="section">
      <div className="cover">
        <h1>Log In</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button onClick={login}>Login</button>

        <Link to="/signup" className="btn">
          Don't have an account? Sign up here!
        </Link>
      </div>
      <h1>{logInStatus}</h1>
    </section>
  );
};

export default LoginForm;
