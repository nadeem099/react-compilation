import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [loginError, setLogginError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = (payload) => {
    const apiEndPoint = "http://localhost:3030/dummy/login";
    axios
      .post(apiEndPoint, payload, { withCredentials: true })
      .then((res) => {
        const { data = {} } = res;
        setIsAuthenticated(true);
        setUser(data);
        setLogginError("");
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        const {
          response: { data: { description, message } = {}, status } = {},
        } = err;
        setIsAuthenticated(false);
        setUser(null);
        setLogginError(description || message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        isAuthenticated: user ? true : false,
        loginError,
        currentUser: user,
        setUser,
        setLogginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
