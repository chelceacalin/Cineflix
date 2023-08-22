import React from "react";
import { useEffect } from "react";

function Login() {

  useEffect(() => {
    document.body.style.background="#C64432";

    return () => {
      document.body.style.background="white";
    };
  }, []);

  return (
      <div className="login-bg" style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "100%",
        maxHeight: "100%",
      }}>
        <img
          src="./Images/LoginImage.png"
          alt="Login Image"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "http://localhost:8081";
          }}
        >
          Go to login
        </button>
      </div>   

  );
}

export default Login;
