import React, { useState, createContext } from "react";

export const UserLoginContext = createContext();

function LoginProvider({ children }) {
  let [isLogged, setIsLoggedIn] = useState(localStorage.getItem("isLogged") === "true");
  let [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  let [username, setUsername] = useState(localStorage.getItem("username") === "true");
  let [token, setToken] = useState(localStorage.getItem("token") === "true");

  let setIsAdminHandler = (value) => {
    setIsAdmin(value);
    localStorage.setItem("isAdmin", value);
  };

  let setUsernameHandler = (value) => {
    setUsername(value);
    localStorage.setItem("username", value);
  };

  let setTokenHandler = (value) => {
    setToken(value);
    localStorage.setItem("token", value);
  };

  let setIsLoggedInHandler = (value) => {
    setIsLoggedIn(value);
    localStorage.setItem("isLogged", value);
  }

  return (
    <UserLoginContext.Provider
      value={{
        isAdmin,
        setIsAdmin: setIsAdminHandler,
        username,
        setUsername: setUsernameHandler,
        token,
        setToken: setTokenHandler,
        isLogged,
        setIsLoggedIn: setIsLoggedInHandler
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
}

export default LoginProvider;
