import { useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

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
    <div className="App">
      <Profile />
    </div>
  );
}

export default App;
