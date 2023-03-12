import {Link} from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
    return(
        <section className='section'>
            <p className="title">Sign Up Page</p>
            <div className="cover">
                <h1>Sign Up form</h1>
                <input type="text" placeholder="Create username" />
                <input type="password1" placeholder="Enter password" />
                <input type="password2" placeholder="Re-enter password" />

                <div className="signup-btn">Sign Up</div>
                <Link to='/' className='btn'>
                    Already have an account? Log in!
                </Link>
            </div>
            
        </section>
    );
};

export default SignUp;