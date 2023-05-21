import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    const { username, password, email } = formData;
    if (!(username && password && email)) {
      setError("resolve errors");
      return;
    }
    const apiEndPoint = "http://localhost:3030/dummy/register";
    axios
      .post(apiEndPoint, formData)
      .then((res) => {
        const { data } = res;
        console.log("register data", data);
        localStorage.setItem("token", data.token);
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
        const {
          response: {
            data: { description },
          },
        } = err;
        setError(description);
      });
    setError("");
  };

  return (
    <form>
      {error ? error : null}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <label htmlFor="email">Username</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" onClick={submitForm}>
        Submit
      </button>
    </form>
  );
}

export default Register;
