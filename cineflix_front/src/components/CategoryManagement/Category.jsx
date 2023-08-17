import { Button } from '@mui/material'
import DeleteCategoryModalWindow from "./DeleteCategoryModalWindow";
import React from 'react'

function Category({name, classes, signal}) {
  const [isEditModalOpen, setEditModalOpen] = React.useState(false);  
  const closeEditModal = () => setEditModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);

  return (
    <tr>
        <td className={classes}>
            {name}
        </td>
        <td className={classes}>
            <Button  className="outlined-button font-normal w-full" variant="outlined"> 
                Edit
            </Button>
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