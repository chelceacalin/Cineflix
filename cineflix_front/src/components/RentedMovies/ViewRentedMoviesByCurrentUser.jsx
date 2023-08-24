import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import MyProfileFilterComponent from "../MyProfile/MyProfileFilterComponent";
import Pagination from "../RoleManagement/Pagination";
import Movie from "../MyProfile/Movie";
import AddNewMovieModalWindow from "../MyProfile/AddNewMovieModalWindow";
import { UserLoginContext } from "../../utils/context/LoginProvider";
import RentedMovie from "./RentedMovie";
function ViewRentedMoviesByCurrentUser() {
    const { username } = useContext(UserLoginContext);
    const [rentedMovies, setRentedMovies] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    useEffect(() => {
        axios.get(`http://localhost:8081/users?owner_username=${username}`)
        .then((data)=>{
           
            if(data){
                axios.get(`http://localhost:8081/movies/rented?userId=${data.data.id}`)
                .then((res)=>{
                    setRentedMovies(res.data.content)
                    console.log(res.data.content)
                })
            }
        })
        
       
    }, []);



    return (<>

    {
       rentedMovies.map((
        {
          category,
          director,
          title,
          isAvailable,
          rentedUntil,
          rentedBy,
          id,
          rentedDate,
        },
        index
      )=>{
        return <RentedMovie key={index} title={title} director={director} category={category} />
       })
    }
    
    </>);
}
export default ViewRentedMoviesByCurrentUser;
