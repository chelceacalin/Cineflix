import {
  Checkbox,
  TextField,
} from "@mui/material";
import React from "react";
import "./css/FilterComponent.css";
import { useEffect, useState } from "react";

function FilterComponent({ filterInput }) {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [admin, setAdmin] = useState(true);
  let [user, setUser] = useState(true);

  useEffect(() => {
    let array = [];
    if ((admin == true && user == true) || (admin == false && user == false)){
      array.push(firstName, lastName, email, "BOTH");
    } else if (admin == true && user == false) {
      array.push(firstName, lastName, email, "ADMIN");
    } else if (admin == false && user == true) {
      array.push(firstName, lastName, email, "USER");
    }
    else array.push(firstName, lastName, email, "");
    filterInput(array);
  }, [firstName, lastName, email, admin, user]);

  return (
    <div className="border-r-2 space-y-4 ml-6">
      <div className="mt-10 mr-6">
        <label>First Name:</label>
        <TextField
          id="outlined-search"
          name="firstName"
          type="search"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mt-10 mr-6">
        <label>Last Name:</label>
        <TextField
          id="outlined-search"
          name="lastName"
          type="search"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mt-4 mr-6">
        <label>Email:</label>
        <TextField
          id="outlined-search"
          name="email"
          slabel="Search email"
          type="search"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="p-1">
        <div className="mb-2">Role: </div>
        <div className="flex gap-2">
          <div>
            <label name="user">User</label>
            <Checkbox
              name="type"
              label="User"
              defaultChecked
              onClick={(e) => {
                setUser(e.target.checked);
              }}
            />
          </div>
          <div>
            <label name="admin">Admin</label>
            <Checkbox
              name="type"
              label="Admin"
              defaultChecked
              onClick={(e) => {
                setAdmin(e.target.checked);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
