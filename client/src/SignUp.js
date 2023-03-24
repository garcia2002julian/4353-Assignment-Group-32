import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios"
import "./SignUp.css";




const SignUp = () => {


    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const register = () => {
        axios.post('http://localhost:3001/register', {
            username: usernameReg, 
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };


    return(
        <section className='section'>
            <p className="title">Sign Up Page</p>
            <div className="cover">
                <h1>Sign Up form</h1>
                <input 
                    type="text" 
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }}
                />

                <input 
                    type="password" 
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }}
                />

                <button onClick={register}>Sign Up</button>


                <Link to='/' className='btn'>
                    Already have an account? Log in!
                </Link>
            </div>
            
        </section>
    );
};

export default SignUp;
