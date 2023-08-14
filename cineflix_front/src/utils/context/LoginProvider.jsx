import React, { useState, createContext } from "react";

export const UserLoginContext = createContext();

function LoginProvider({ children }) {
  let [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  let setIsAdminHandler=(value)=>{
    setIsAdmin(value);
    localStorage.setItem('isAdmin',value);
}

  return <UserLoginContext.Provider value={{isAdmin,setIsAdmin:setIsAdminHandler}}>{children}</UserLoginContext.Provider>;
}

export default LoginProvider;
