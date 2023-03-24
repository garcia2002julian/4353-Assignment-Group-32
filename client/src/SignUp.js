import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

import "./SignUp.css";

const SignUp = () => {


    const [user, setUsername] = useState("");
    const [pass, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("")
    const register = ()=>{
        axios.post("http://localhost:3001/register", {
            username:user,
            password: pass
        }).then((response)=>{
            console.log(response.data.message)

            if(response.data.message){
                setRegisterStatus(response.data.message)
            }
            else{
                setRegisterStatus(response.data.messageRegister)
            }


        });


    };




    return(
        <section className='section'>
            <div className="cover">
                <h1>Sign Up form</h1>
                <input type="text" placeholder="Create username" onChange={(event)=>{setUsername(event.target.value);}}/>
                <input type="password1" placeholder="Enter password" onChange={(event)=>{setPassword(event.target.value);}}/>
                {/* <input type="password2" placeholder="Re-enter password" /> */}

                <div className="signup-btn">
                    <button onClick={register}>
                    Sign Up
                    </button>
                   
                    
                    </div>
                <Link to='/' className='btn'>
                    Already have an account? Log in!
                </Link>

                <h1>{registerStatus}</h1>
            </div>
            
        </section>
    );
};

export default SignUp;