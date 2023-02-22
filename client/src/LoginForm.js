import {Link} from "react-router-dom";
import React, {useState} from "react";
import "./LoginForm.css";

const LoginForm = () => {
    const[popupStyle, showPopup] = useState("hide")

    const popup = () => {
        showPopup("login-p")
        setTimeout(() => showPopup("hide"), 3000)
    }

    return (
        <section className='section'>
            <p class='header'>Login Page</p>
            <div className="cover">
                
                <h1>Log In</h1>
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>

                <div className="login-btn" onClick={popup}>Sign In</div>
                

                <Link to='/signup' className='btn'>
                    Don't have an account? Sign up here!
                </Link>

            </div>
        </section>

            
    );
};


export default LoginForm 