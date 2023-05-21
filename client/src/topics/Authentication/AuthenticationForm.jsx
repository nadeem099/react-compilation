import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthenticationForm() {
  const [activeForm, setActiveForm] = useState(true);
  return (
    <>
      {activeForm ? <Login /> : <Register />}
      <button onClick={() => setActiveForm((p) => !p)}>
        {activeForm
          ? "Not registered? Click to Register"
          : "Already have an account? Click to Login"}
      </button>
    </>
  );
}

export default AuthenticationForm;
