import './App.css';
import LoginPage from './LoginPage';
import Home from './Home';
import Quota from './Quota'
import Profile from './Profile'
import History from './History'
import RegisterPage from './RegisterPage'
import {Link, Route, Routes} from "react-router-dom";
function App() {
 

  return (
    
    <div className="App">
      
    

      {/* <RegisterPage/> */}
      {/* <Home/>  */}
      <Routes>
        <Route path="/" element={<RegisterPage/>}/>
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path='/home' element={<Home/>}></Route>
        <Route path="/Quota" element={<Quota/>}/>
        <Route path="/History" element={<History/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes> 
      </div>
  );
}

export default App;
