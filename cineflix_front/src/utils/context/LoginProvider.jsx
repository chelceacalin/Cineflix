import React, { useState, createContext } from "react";

export const UserLoginContext = createContext();

function LoginProvider({ children }) {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);
  let [username, setUsername] = useState(false);
  let [token, setToken] = useState(false);

  let setIsAdminHandler = (value) => {
    setIsAdmin(value);
  };

  let setUsernameHandler = (value) => {
    setUsername(value);
  };

  let setTokenHandler = (value) => {
    setToken(value);
  };

  let setIsLoggedInHandler = (value) => {
    setIsLoggedIn(value);
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
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
}

export default LoginProvider;
