import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import ReturnMovieModal from "./ReturnMovieModal";
import "./css/Movie.css";

function Movie_MyRentedMovies({
  title,
  director,
  category,
  rentedUntil,
  rentedBy,
  rentedDate,
  owner,
  classes,
  id,
  triggerRefresh,
  setTriggerRefresh,
}) {
  const [returnModalOpen, setReturnModalOpen] = React.useState(false);
  const handleReturnOpen = () => setReturnModalOpen(true);
  const handleReturnClose = () => setReturnModalOpen(false);

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
        <div variant="small" color="blue-gray" className="font-normal">
          {!rentedDate ? "N/A" : rentedDate}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {!rentedUntil ? "N/A" : rentedUntil}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {owner}
        </div>
      </td>
      <td className={classes}>
        <button
          onClick={handleReturnOpen}
          className="inline-block w-full rounded px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white contained-button"
        >
          Return movie
        </button>

        <ReturnMovieModal
            isModalOpen={returnModalOpen}
            closeModal={handleReturnClose}
            title={title}
            triggerRefresh={triggerRefresh}
            setTriggerRefresh={setTriggerRefresh}
            id={id}
          />
      </td>
    </tr>
  );
}

export default Movie_MyRentedMovies;
