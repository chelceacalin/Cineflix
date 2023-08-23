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
  rentedOn,
    rentedDate
}) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  let handleDetailsOpen = () => setDetailsModalOpen(true);
  let handleDetailsClose = () => setDetailsModalOpen(false);
  let handleDeleteOpen = () => setDeleteModalOpen(true);
  let handleDeleteClose = () => setDeleteModalOpen(false);
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
              title={title}
              category={category}
              director={director}
              isAvailable={isAvailable}
              rentedUntil={rentedUntil}
              rentedOn={rentedOn}
              rentedBy={rentedBy}
              rentedDate={rentedDate}
              id={id}
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
