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
  triggerRefresh,
  setTriggerRefresh,
  rentedOn,
}) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isRentModalOpen, setRentModalOpen] = useState(false);
  let handleDetailsOpen = () => setDetailsModalOpen(true);
  let handleDetailsClose = () => setDetailsModalOpen(false);


  const handleOpenRentModal = () => {
    setRentModalOpen(true);
  };

  const handleCloseRentModal = () => {
    setRentModalOpen(false);
  };


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
          {rentedOn}
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
          className="inline-block rounded  px-3 mr-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-marine outlined-button"
        >
          Details
        </Button>
          <ViewMovieDetailsModalWindow
              isModalOpen={detailsModalOpen}
              closeModal={handleDetailsClose}
          />
      </td>
      <td>
        <Button
          onClick={handleOpenRentModal}
          className="contained-button font-normal w-full" variant="contained"
        >
          Rent Movie
        </Button>
        <RentMovieModalView
                  isRentModalOpen={isRentModalOpen}
                  closeRentModal={handleCloseRentModal}
        />
      </td>
    </tr>
  );
}

export default RentedMovie;
