import { TextField } from '@mui/material'
import React from 'react'

function FilterCategory() {
  return (
    <div className="filterContainer w-56 ml-6">
      <div className="mt-10 mr-6">
        <div>
        <label>Name: </label>
        </div>
        <TextField
          id="outlined-search"
          name="name"
          type="search"
        //   onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
    </div>
  )
}

export default FilterCategory