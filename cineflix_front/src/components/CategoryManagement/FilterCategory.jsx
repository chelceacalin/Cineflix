import { TextField } from '@mui/material';
import React from 'react';
import { useEffect, useState } from "react";

function FilterCategory({ filterInput }) {
  let [name, setName] = useState("");
  useEffect(() => {
    let array = [];
    array.push(name);
    filterInput(array);
  }, [name]);
  return (
    <div className="w-72 ml-6 border-r-2">
      <div className="mt-10 mr-6">
        <div>
        <label>Name: </label>
        </div>
        <TextField
          id="outlined-search"
          name="name"
          type="search"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  )
}

export default FilterCategory