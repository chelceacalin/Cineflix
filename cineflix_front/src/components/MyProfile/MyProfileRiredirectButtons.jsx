import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/MyProfileFilterComponent.css";
import { UserLoginContext } from "../../utils/context/LoginProvider";

function MyProfileRiredirectButtons() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useContext(UserLoginContext);

  const myMoviesClass = location.pathname.includes("myprofile")&&!location.pathname.includes("myRentedMovies")
    ? "aBackgroundClick text-white"
    : "";
  const myRentedMoviesClass = location.pathname.includes("myRentedMovies")
    ? "aBackgroundClick text-white"
    : "";
  return (
      <div >
        <button
          className={`p-4 w-60 border text-black ${myMoviesClass} mt-8`}
          onClick={(e) => {
            e.preventDefault();
             navigate(`/myprofile/${username}`)
          }}
        >
          {" "}
          My Movies
        </button>

        <button className={`p-4  w-60 border text-black ${myRentedMoviesClass} mt-8`}
        onClick={(e)=>{
          e.preventDefault()
          navigate(`/myprofile/myRentedMovies/${username}`)
        }}
      >
        {" "}
        My Rented Movies
      </button>
    </div>
  );
}

export default MyProfileRiredirectButtons;
