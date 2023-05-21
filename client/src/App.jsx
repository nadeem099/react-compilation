import { useState, useEffect, useContext } from "react";
import AuthenticationForm from "./topics/Authentication/AuthenticationForm";
import Users from "./topics/Authentication/Users";
import AuthContext from "./topics/Authentication/AuthContext";
import "./App.css";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <AuthenticationForm /> : <Users />;
}

export default App;
