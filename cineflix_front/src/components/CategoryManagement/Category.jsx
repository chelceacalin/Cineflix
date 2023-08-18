import { Button } from '@mui/material'
import DeleteCategoryModalWindow from "./DeleteCategoryModalWindow";
import React from 'react'

import EditCategoryNameModalWindow from "./EditCategoryNameModalWindow";

function Category({id, name, classes, updateCategory, signal, setErrorMessage, errorMessage}) {
    const [open, setOpen] = React.useState(false);
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const closeEditModal = () => {
        setEditModalOpen(false);
        signal();
    }
    const openEditModal = () => setEditModalOpen(true);

    const handleOpen = () => {
        setErrorMessage("");
        setOpen(true);
    }
    
      const handleClose = () => {
        setErrorMessage("");
        setOpen(false);
    }

  return (
    <tr>
        <td className={classes}>
            {name}
        </td>
        <td className={classes}>
            <Button onClick={handleOpen} className="outlined-button font-normal w-full" variant="outlined">
                Edit
            </Button>
            <EditCategoryNameModalWindow
            isModalOpen={open}
            closeModal={handleClose}
            id={id}
            name={name}
            updateCategory={updateCategory}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            />
        </td>
        <td className={classes}>
            <Button className="contained-button font-normal w-full" variant="contained" onClick={openEditModal}>
                Remove
            </Button>
            <DeleteCategoryModalWindow
            isEditModalOpen={isEditModalOpen}
            closeEditModal={closeEditModal}
            name={name}
            signal={signal}
            />
        </td>
    </tr>
  )
}

export default Category