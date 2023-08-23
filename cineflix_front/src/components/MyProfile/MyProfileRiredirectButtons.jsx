import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './css/MyProfileFilterComponent.css'
function MyProfileRiredirectButtons() {
  const location = useLocation();
  const navigate=useNavigate();


  const myMoviesClass=location.pathname.includes('myprofile')?'aBackgroundClick text-white':"";
  const myRentedMoviesClass=location.pathname.includes('myrentedMovies')?'aBackgroundClick text-white':"";
  return (
      <div >
        <button
          className={`p-4 w-60 border text-black ${myMoviesClass}  mt-8 ml-4 `}
          onClick={(e) => {
            e.preventDefault();
            //  navigate(`/myprofile/${username}`)
          }}
        >
          {" "}
          My Movies
        </button>

        <button className={`p-4  w-60 border text-black ${myRentedMoviesClass} mt-8 `}
        onClick={(e)=>{
          e.preventDefault()
          //navigate('/roleManagement')
        }}
        > My Rented Movies</button>
      </div>
  );
}

export default MyProfileRiredirectButtons;
