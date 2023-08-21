import React from "react";
import { useNavigate } from "react-router-dom";
function Login() {

  return (
    <>
      <div>Login</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "http://localhost:8081";
        }}
      >
        Go to login
      </button>
    </>
  );
}

export default Login;
