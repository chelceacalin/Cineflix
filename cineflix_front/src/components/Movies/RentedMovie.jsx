import React, { useEffect, useState } from "react";

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

          {/* {detailsModalOpen && (
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
            )} */}

          <button
            onClick={handleDeleteOpen}
            className="inline-block rounded px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white contained-button"
          >
            Delete
          </button>

          {/* {deleteModalOpen && (
              <DeleteMovieModalView
                isModalOpen={deleteModalOpen}
                closeModal={handleDeleteClose}
                title={title}
                category={category}
                deleteMovie={""}
              />
            )} */}
        </div>
      </td>
    </tr>
  );
}

export default RentedMovie;
