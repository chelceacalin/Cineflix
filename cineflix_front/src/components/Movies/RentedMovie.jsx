import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ViewMovieDetailsModalWindow from "./ViewMovieDetailsModalWindow.jsx";

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
  rentedDate,
  owner_username
}) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDetailsOpen = () => setDetailsModalOpen(true);
  const handleDetailsClose = () => setDetailsModalOpen(false);
  const handleDeleteOpen = () => setDeleteModalOpen(true);
  const handleDeleteClose = () => setDeleteModalOpen(false);
  
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
        <button
          onClick={handleDeleteOpen}
          className="inline-block rounded px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white contained-button"
        >
          Rent Movie
        </button>
      </td>
    </tr>
  );
}

export default RentedMovie;
