import React from "react";
import { useAuth } from "./Auth";
import { Navigate } from "react-router-dom";
export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  console.log("RequireAuth", auth);

  if (!auth.user && auth.newuser) {
    return <Navigate to="/profile" />;
  } else if (!auth.user) {
    return <Navigate to="/" />;
  }

  return children;
};
