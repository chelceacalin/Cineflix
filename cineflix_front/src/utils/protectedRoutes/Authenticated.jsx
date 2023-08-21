import React,{useContext,useEffect,useState} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {UserLoginContext} from '../context/LoginProvider'

import axios from 'axios'
const Authenticated = () => {

  const { isLoggedIn } = useContext(UserLoginContext);
  

 return isLoggedIn? <Outlet/>:<Navigate to={"/login"}/>
}

export default Authenticated