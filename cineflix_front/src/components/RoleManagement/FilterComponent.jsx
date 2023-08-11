import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React from "react";
import "./css/FilterComponent.css";
import { useEffect, useState } from "react";

function FilterComponent({filterInput}) {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [isAdmin, setIsAdmin] = useState(false);
   
    useEffect(() => {
        let array = [];
        array.push(firstName, lastName, email);
        filterInput(array);
    },[firstName, lastName, email]);

  return (
    <div className="filterContainer space-y-4 ml-6">

      <div className="mt-10 mr-6">
        <label>First Name:</label>
        <TextField id="outlined-search" name="firstName" label="Search first name" type="search" onChange={e => setFirstName(e.target.value)} />
      </div>
      <div className="mt-10 mr-6">
      <label>Last Name:</label>
        <TextField id="outlined-search" name="lastName" label="Search last name" type="search" onChange={e => setLastName(e.target.value)} />
      </div>
      <div className="mt-4 mr-6">
      <label>Email:</label>
        <TextField id="outlined-search" name="email" slabel="Search email" type="search" onChange={e => setEmail(e.target.value)} />
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
