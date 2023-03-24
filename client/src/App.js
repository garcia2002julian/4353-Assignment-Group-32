import './App.css';
import Home from './Home';
import SignUp from './SignUp';
import Quota from './Quota'
import Profile from './Profile'
import History from './History'
import LoginForm from './LoginForm'
import {Link, Route, Routes} from "react-router-dom";
import { Navbar_ } from './Nav';
import { AuthProvider } from './Auth';
import { RequireAuth } from './RequireAuth';
function App() { 


  return (
    <div className="App">
      {/* <RegisterPage/> */}
      {/* <Home/>  */}
      <AuthProvider>
      <Navbar_/>
      <Routes>   
        <Route path="/" element={<LoginForm/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        {/* <Route path='/home' element={<Home/>}></Route> */}
        <Route path="/Quota" element={
        <RequireAuth>
          <Quota/>
        </RequireAuth>}/>
        <Route path="/History" element={
        <RequireAuth>
        <History/>
        </RequireAuth>
        }/>
        <Route path="/Profile" element={
        <RequireAuth>
        <Profile/>
        </RequireAuth>
        }/>
\      </Routes> 
    </AuthProvider>
      </div>

  );
}

export default App;

/*Replaced RegisterPage and LoginPage for -- LoginForm and SignUp
in:

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage'

<Route path="/" element={<RegisterPage/>}/>
<Route path="/Login" element={<LoginPage/>}/>
*/
