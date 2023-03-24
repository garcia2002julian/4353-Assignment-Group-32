import "./App.css";
import Home from "./Home";
import SignUp from "./SignUp";
import Quota from "./Quota";
import Profile from "./Profile";
import History from "./History";
import LoginForm from "./LoginForm";
import { Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Auth";
import { RequireAuth } from "./RequireAuth";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        {/* <RegisterPage/> */}
        {/* <Home/>  */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Navbar />
                <Home />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/Quota"
            element={
              <RequireAuth>
                <Navbar />

                <Quota />
              </RequireAuth>
            }
          />
          <Route
            path="/History"
            element={
              <RequireAuth>
                <Navbar />

                <History />
              </RequireAuth>
            }
          />
          <Route
            path="/Profile"
            element={
              <RequireAuth>
                <Navbar />
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
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
