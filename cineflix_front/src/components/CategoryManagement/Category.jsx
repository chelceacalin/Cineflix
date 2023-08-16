import { Button } from '@mui/material'
import React from 'react'

function Category({name, classes}) {
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
            <Button className="contained-button font-normal w-full" variant="contained">
                Remove
            </Button>
        </td>
    </tr>
  )
}

export default Category