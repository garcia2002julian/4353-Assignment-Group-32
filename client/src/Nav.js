import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useAuth } from "./Auth";
export const Navbar_=()=>{
    
    const auth = useAuth()
    return (
        
        <nav className='primary-nav'>

            <NavLink  to='/Quota'>
            <Button variant="contained" color="primary">Quota</Button>
            </NavLink>
            <NavLink  to='/History'>
            <Button variant="contained" color="primary">History</Button>
            </NavLink>
            <NavLink  to='/Profile'>
            <Button variant="contained" color="primary">Profile</Button>
            </NavLink>
            {!auth.user && (
                    <NavLink to ='/'>
                        <Button variant="contained" color="primary">Login</Button>
                    </NavLink>
                )}
        
        {/* <Button variant="contained" color="primary" href="/quota">Quota</Button>
        <Button variant="contained" color="primary" href="/history">History</Button> */}
        </nav>
    
    
    
    )
}

