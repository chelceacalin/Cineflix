import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import DetailsMovieModalView from "./DetailsMovieModalView";
import DeleteMovieModalView from "./DeleteMovieModalView";
import "./css/Movie.css";

function Movie({
  title,
  director,
  category,
  isAvailable,
  rentedUntil,
  rentedBy,
  rating,
  classes,
  updateMovie,
  id,
  triggerRefresh,
  setTriggerRefresh,
}) {
  const [detailsModalOpen, setDetailsModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
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
          <button
            onClick={handleDetailsOpen}
            className="inline-block rounded  px-3 mr-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-marine outlined-button"
          >
            Details
          </button>

          {detailsModalOpen && (
            <DetailsMovieModalView
              isModalOpen={detailsModalOpen}
              closeModal={handleDetailsClose}
              defaultTitle={title}
              defaultDirector={director}
              defaultCategory={category}
              id={id}
              setTriggerRefresh={setTriggerRefresh}
              triggerRefresh={triggerRefresh}
            />
          )}

          <button
            onClick={handleDeleteOpen}
            className="inline-block rounded px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white contained-button"
          >
            Delete
          </button>

          {deleteModalOpen && (
            <DeleteMovieModalView
              isModalOpen={deleteModalOpen}
              closeModal={handleDeleteClose}
              title={title}
              category={category}
              deleteMovie={""}
            />
          )}
        </div>
      </td>
    </tr>
  );
}

export default Movie;
