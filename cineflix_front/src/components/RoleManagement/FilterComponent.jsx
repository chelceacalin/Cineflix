import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React from "react";
import "./css/FilterComponent.css";

function FilterComponent() {
  return (
    <div className="filterContainer space-y-4 ml-6">

      <div className="mt-10 mr-6">
        <label>First Name:</label>
        <TextField id="outlined-search" label="Search first name" type="search" />
      </div>
      <div className="mt-10 mr-6">
      <label>Last Name:</label>
        <TextField id="outlined-search" label="Search last name" type="search" />
      </div>
      <div className="mt-4 mr-6">
      <label>Email:</label>
        <TextField id="outlined-search" label="Search email" type="search" />
      </div>
      <div className="p-4">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Admin" />
          <FormControlLabel control={<Checkbox />} label="User" />
        </FormGroup>
      </div>
    </div>
  );
}

export default FilterComponent;
