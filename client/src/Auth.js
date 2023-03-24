import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [newuser, setnewUser] = useState(localStorage.getItem("newuser"));

  const login_ = (user) => {
    localStorage.setItem("user", user);
    setUser(user);
  };
  const newUserLogin = (newuser) => {
    localStorage.setItem("newuser", newuser);
    setnewUser(newuser);
  };
  const logout_ = () => {
    localStorage.clear();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, login_, logout_, newUserLogin, newuser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
