import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogin = localStorage.getItem("Login");
  return isLogin ? children : <Navigate to="/" />;
};

export default PrivateRoute;