import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    InputLabel,
    NativeSelect
  } from "@mui/material";
  import React from "react";
  import "./css/MyProfileFilterComponent.css";
  import "react-datepicker/dist/react-datepicker.css";
  import { useEffect, useState } from "react";
  import DatePicker from "react-datepicker";
  
  function MyProfileFilterComponent({ filterInput }) {
    let [title, setTitle] = useState("");
    let [director, setDirector] = useState("");
    let [category, setCategory] = useState("");
    let [available, setAvailable] = useState(true);
    let [unavailable, setUnavailable] = useState(true);
    let [rentedUntil, setRentedUntil] = useState("");
    let [rentedBy, setRentedBy] = useState("");
  
    useEffect(() => {
      let date = rentedUntil ? `${rentedUntil.getFullYear()}-${(rentedUntil.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${rentedUntil.getDate().toString().padStart(2, "0")}` : "";
      let array = [];
      if (
        (available == true && unavailable == true) ||
        (available == false && unavailable == false)
      ) {
        array.push(category, director, title, "BOTH", date, rentedBy);
      } else if (available == true && unavailable == false) {
        array.push(category, director, title, "true", date, rentedBy);
      } else if (available == false && unavailable == true) {
        array.push(category, director, title, "false", date, rentedBy);
      } else array.push(category, director, title, "", date, rentedBy);
      filterInput(array);
    }, [
      category,
      director,
      title,
      available,
      unavailable,
      rentedUntil,
      rentedBy,
    ]);
  
    return (
      <div className="filterContainer space-y-4 ml-6">
        <div className="mt-4 mr-6">
          <TextField
            id="outlined-search"
            name="title"
            label="Search title"
            type="search"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-10 mr-6">
          <TextField
            id="outlined-search"
            name="director"
            label="Search director"
            type="search"
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>
        <div className="mt-10 mr-6">
          <TextField
            id="outlined-search"
            name="category"
            label="Search category"
            type="search"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="p-1">
          <div className="mb-2">Availability: </div>
          <div className="flex gap-2">
            <div>
              <label name="unavailable">Unavailable</label>
              <Checkbox
                name="type"
                label="Unavailable"
                defaultChecked
                onClick={(e) => {
                  setUnavailable(e.target.checked);
                }}
              />
            </div>
            <div>
              <label name="available">Available</label>
              <Checkbox
                name="type"
                label="Available"
                defaultChecked
                onClick={(e) => {
                  setAvailable(e.target.checked);
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mr-6">
          <label>Rented Until:</label>
          <DatePicker
            selected={rentedUntil}
            placeholderText={"Select the date"}
            onChange={(date) => setRentedUntil(date)}
          />
        </div>
        <div className="mt-4 mr-6">
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Rented By
            </InputLabel>
            <NativeSelect
              defaultValue={"username"}
              onChange={(e) => ""}
              placeholder=""
            >
              <option value="USER">User1</option>
              <option value="ADMIN">User2</option>
            </NativeSelect>
        </div>
      </div>
    );
  }
  
  export default MyProfileFilterComponent;
  