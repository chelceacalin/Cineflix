import React,{useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {UserLoginContext} from '../context/LoginProvider'
import { useParams } from 'react-router-dom'

const ProfileRoute = () => {

  let { id } = useParams();

  const { username } = useContext(UserLoginContext);
  const route = "/myprofile/" + username;
  return (id === username) ? <Outlet/> :<Navigate to={route}/>
}

export default ProfileRoute