import React, { useState, createContext } from "react";
import PropTypes from 'prop-types';

export const UserLoginContext = createContext();

function LoginProvider({ children }) {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [isAdmin, setIsAdmin] = useState(false);
  let [username, setUsername] = useState("");
  let [token, setToken] = useState("");


  let loginHandler = (value) => {
    setIsLoggedIn(value)
   sessionStorage.setItem('isLoggedIn', value);
  }
  
  return (
    <UserLoginContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        username,
        setUsername,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn:loginHandler
      }}
    >
      {children}
    </UserLoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
