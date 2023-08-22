import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
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
          {rentedBy == "available" && isAvailable ? "" : rentedBy}
        </div>
      </td>
      <td className={classes}>
        <Button
          className="contained-button font-normal w-full"
          variant="contained"
          onClick={handleDetailsOpen}
        >
          Details
        </Button>
      </td>
      <td>
        <Button
          className="contained-button font-normal w-full"
          variant="contained"
          onClick={handleDeleteOpen}
        >
          Rent Movie
        </Button>
      </td>
    </tr>
  );
}

export default RentedMovie;
