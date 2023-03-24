import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const [loginStatus, setloginStatus] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setloginStatus(response.data.message);
        } else {
          axios
            .get("http://localhost:3001/getUserInfo/${username}", {})
            .then((response) => {
              //console.log(response.data[0].password);
              auth.login_(username);
              navigate("/Profile");
            });
        }
        console.log(response.data);
      });
  };

  return (
    <section className="section">
      <p class="header">Login Page</p>
      <div className="cover">
        <h1>Log In</h1>

        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button onClick={login}>Log In</button>

        <Link to="/signup" className="btn">
          Don't have an account? Sign up here!
        </Link>

        <h1>{loginStatus}</h1>
      </div>
    </section>
  );
};

export default LoginForm;
