import React from 'react'
import Quota from './Quota'
import Profile from './Profile'
import History from './History'
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";

import {Route, Routes} from "react-router-dom"

function Home() {
  return (
    // <routes>
    //     <a href="/User Proflie"> User Profile</a>
    //     <div></div>
    //     <a href="/Quota History"> Quota History</a>
    // </routes>
    

    <div>
    <Button variant="contained" color="primary" href="/profile">Profile</Button>
    <Button variant="contained" color="primary" href="/quota">Quota</Button>
    <Button variant="contained" color="primary" href="/history">History</Button>

    {/* <Routes>
      <Route path="/Quota" element={<Quota/>}/>
      <Route path="/History" element={<History/>}/>
      <Route path="/Profile" element={<Profile/>}/>
    </Routes>  */}
    </div>
  )
}

export default Home