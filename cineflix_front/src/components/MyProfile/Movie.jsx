import React, { useEffect } from "react";
import Button from '@mui/material/Button';

import DetailsMovieModalView from "./DetailsMovieModalView";
import DeleteMovieModalView from "./DeleteMovieModalView";

function Movie({ title, director, category, isAvailable, rentedUntil, rentedBy, rating, classes, updateMovie }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <tr key={title}>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {title}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {director}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {category}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" style={{color: isAvailable? 'green' : 'red'}} className="font-normal">
          {isAvailable? "Available" : "Unavailable"}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {!rentedUntil ? "N/A" : rentedUntil}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {rentedBy == "available" && isAvailable ? "" : rentedBy}
        </div>
      </td>
      <td className={classes}>
        <div>
            <button onClick={handleOpen} className="font-normal bg-white hover:border-hover-cream hover:text-hover-cream text-blue-marine border border-blue-marine py-2 px-3 mr-3">
                Details
            </button>
          {/* <DetailsMovieModalView
            isModalOpen={open}
            closeModal={handleClose}
            firstName={firstName}
            lastName={lastName}
            name={name}
            role={role}
            email={email}
            username={username}
            updateMovie={updateMovie}
          /> */}
            <button onClick={handleOpen} className="font-normal bg-blue-marine hover:border-hover-cream hover:bg-hover-cream text-white border border-blue-marine py-2 px-3">
                Delete
            </button>
          { <DeleteMovieModalView
            isModalOpen={open}
            closeModal={handleClose}
            title={title}
            movieId={""}
            deleteMovie={""}
          /> }        
        </div>
      </td>
    </tr>
  );
}

export default Movie;
