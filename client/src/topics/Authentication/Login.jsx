import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { loginUser, loginError, setLogginError } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!(username && password)) {
      setLogginError("resolve errors");
      return;
    }
    loginUser({ username, password });
  };

  return (
    <form>
      {loginError ? loginError : null}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" onClick={login}>
        Submit
      </button>
    </form>
  );
}

export default Login;
