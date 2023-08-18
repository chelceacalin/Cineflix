import React,{useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {UserLoginContext} from '../context/LoginProvider'

const Authenticated = () => {
  const { isLoggedIn } = useContext(UserLoginContext);

  if(!isLoggedIn){
    return <Outlet/>
  }
  else{
    // return <Navigate to="/" replace/>
    window.location.href='http://localhost:8081/'
  }
}

export default Authenticated