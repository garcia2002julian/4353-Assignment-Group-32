import { useState } from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const [usernamelog, setUsername] = useState('')
  const [passwordlog, setPassword] = useState('')

  const [logInStatus, setLoginStatus] = useState("")


  const login = () => {
    axios.post('http://localhost:3001/login', {
      username:usernamelog,
      password:passwordlog

    }).then((response)=>{
      if (response.data.message){
        setLoginStatus(response.data.message)
      } 
      else{
        setLoginStatus(response.data[0].username)
      }
      console.log(response.data)
    })


  };
  const register = ()=>{
    axios.post('http://localhost:3001/register', {
      username:usernameReg,
      password:passwordReg
      
    }).then((response)=>{
      console.log(response.data)
    })

    };

  return (
    
    <div className="App">
      <div className='registration'>
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" onChange={(event)=>{
          setUsernameReg(event.target.value);
        }}/>
        <label>Password</label>
        <input type="text" onChange={(event)=>{
          setPasswordReg(event.target.value);
        }}/>
        <button onClick={register}>Register</button>
      </div>
      <div className='login'>
        <h1>Login</h1>
        <label>Username</label>
        <input type="text" placeholder='Enter username' onChange={(event)=>{
          setUsername(event.target.value);
        }}/>
        <label>Password</label>
        <input type="text" placeholder='Enter password' onChange={(event)=>{
          setPassword(event.target.value)
        }} />
        <button onClick={login}>Login</button>
        <h1>{logInStatus}</h1>
      </div>
     
      </div>
  );
}

export default App;
