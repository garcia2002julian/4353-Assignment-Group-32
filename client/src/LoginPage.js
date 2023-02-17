import { useState } from "react";
import axios from "axios";

import React from "react";

function LoginPage() {


  const [usernamelog, setUsername] = useState("");
  const [passwordlog, setPassword] = useState("");

  const [logInStatus, setLoginStatus] = useState("");

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
          setLoginStatus(response.data[0].username);
        }
        console.log(response.data);
      });
  };
  
  return (
    <div>
      
      <div className="login">
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={login}>Login</button>
        <h1>{logInStatus}</h1>
        <a href="/">Don't Have a account?</a>
      </div>
      
    </div>
  );
}

export default LoginPage;
