import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";

function Login() {
  const url = "http://localhost:8081";

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
        top: "45%",
        transform: "translate(-50%, -50%)",
        maxWidth: "100%",
        maxHeight: "100%",
      }}>
        <img
          src="./Images/LoginImage.png"
          alt="Login Image"
        />

        <Button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = url;
          }}

          className="contained-button font-normal w-full "
          variant="contained"
        >
          LOG IN WITH KEYCLOAK
        </Button>
      </div>   

  );
}

export default Login;
