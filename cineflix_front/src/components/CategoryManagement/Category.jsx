import { Button } from '@mui/material'
import React from 'react'

import EditCategoryNameModalWindow from "./EditCategoryNameModalWindow";

function Category({id, name, classes, updateCategory}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            />
        </td>
        <td className={classes}>
            <Button className="contained-button font-normal w-full" variant="contained">
                Remove
            </Button>
        </td>
    </tr>
  )
}

export default Category