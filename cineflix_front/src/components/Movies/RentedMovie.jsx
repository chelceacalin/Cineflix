import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ViewMovieDetailsModalWindow from "./ViewMovieDetailsModalWindow.jsx";
import RentMovieModalView from "./RentMovieModalView";

function RentedMovie({
  id,
  title,
  category,
  director,
  isAvailable,
  rentedUntil,
  rentedBy,
  classes,
  rentedOn,
  rentedDate,
  owner_username,
  setTriggerRefresh,
  triggerRefresh
}) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isRentModalOpen, setRentModalOpen] = useState(false);

  const handleDetailsOpen = () => setDetailsModalOpen(true);
  const handleDetailsClose = () => setDetailsModalOpen(false);

  const handleOpenRentModal = () => {
    setRentModalOpen(true);
  };

  const handleCloseRentModal = () => {
    setRentModalOpen(false);
    setTriggerRefresh(!triggerRefresh)
  };


  return (
    <tr key={title}>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal max-w-[150px] break-words">
          {title}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal max-w-[200px]">
          {director}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {category}
        </div>
      </td>
      <td className={classes}>
        <div
          variant="small"
          style={{ color: isAvailable ? "green" : "red" }}
          className="font-normal"
        >
          {isAvailable ? "Available" : "Unavailable"}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {owner_username}
        </div>
      </td>

      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {rentedDate}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {rentedUntil}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {rentedBy === "available" && isAvailable ? "" : rentedBy}
        </div>
      </td>
      <td className={classes}>
        <Button
          onClick={handleDetailsOpen}
          className="outlined-button w-full font-normal"
          variant="outlined"
        >
          Details
        </Button>
        {detailsModalOpen&&
         <ViewMovieDetailsModalWindow
         isModalOpen={detailsModalOpen}
         closeModal={handleDetailsClose}
         title={title}
         category={category}
         director={director}
         isAvailable={isAvailable}
         rentedUntil={rentedUntil}
         rentedOn={rentedOn}
         rentedBy={rentedBy}
         rentedDate={rentedDate}
         id={id}
     />}
         
      </td>
      <td className={classes}>
        <Button
          onClick={handleOpenRentModal}
          className="contained-button font-normal"
          variant="contained" disabled={!isAvailable}
        >
          Rent Movie
        </Button>
        {
          isRentModalOpen&&
          <RentMovieModalView
          isRentModalOpen={isRentModalOpen}
          closeRentModal={handleCloseRentModal}
          title={title}
          director={director}
          owner={owner_username}
          id={id}
          setTriggerRefresh={setTriggerRefresh}
          triggerRefresh={triggerRefresh}
        />
        }
       
      </td>
    </tr>
  );
}

export default RentedMovie;
