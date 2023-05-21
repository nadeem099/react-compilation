import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./AuthContext";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { setUser, setLogginError } = useContext(AuthContext);

  useEffect(() => {
    const apiEndPoint = "http://localhost:3030/dummy/users";
    // const token = localStorage.getItem("token");
    axios
      .get(
        apiEndPoint,
        // { headers: { Authorization: `Bearer ${token}` } }
        { withCredentials: true }
      )
      .then((res) => {
        const { data } = res;
        console.log(data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
        const { response: { status } = {} } = err;
        if (status === 403) {
          setUser(null);
          localStorage.removeItem("user");
          setLogginError("");
          navigate("/login");
        }
      });
  }, []);

  return users
    ? users.map((user) => (
        <div key={user["_id"]}>
          <p>{user.username}</p>
        </div>
      ))
    : "no users";
}

export default Users;
