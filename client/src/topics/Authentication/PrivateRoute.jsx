import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import AuthContext from "./AuthContext";

function PrivateRoute({ component: Component, ...props }) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        {...props}
        element={isAuthenticated ? <Component /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default PrivateRoute;
