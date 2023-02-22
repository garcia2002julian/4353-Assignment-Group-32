import './App.css';
import Home from './Home';
import SignUp from './SignUp';
import Quota from './Quota'
import Profile from './Profile'
import History from './History'
import LoginForm from './LoginForm'
import {Link, Route, Routes} from "react-router-dom";
function App() {
 

  return (
    
    <div className="App">
      
    

      {/* <RegisterPage/> */}
      {/* <Home/>  */}
      <Routes>
        
        <Route path="/" element={<LoginForm/>}/>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path="/Quota" element={<Quota/>}/>
        <Route path="/History" element={<History/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes> 
      </div>
  );
}

export default App;
