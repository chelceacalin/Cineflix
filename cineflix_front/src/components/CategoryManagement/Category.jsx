import { Button } from '@mui/material'
import React from 'react'

function Category({name, classes}) {
  return (
    <tr>
        <td className={classes}>
            {name}
        </td>
        <td className={classes}>
            <Button> 
                Edit
            </Button>
        </td>
        <td className={classes}>
            <Button>
                Remove
            </Button>
        </td>
    </tr>
  )
}

export default Category