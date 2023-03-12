import { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';

import React from "react";

function LoginPage() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");



  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <div>
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(event) => {
            setUsernameReg(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(event) => {
            setPasswordReg(event.target.value);
          }}
        />
        <button onClick={register}>Register</button>
        <a href="/Login">Already Have an account?</a>
      </div>

    </div>
  );
}

export default LoginPage;
