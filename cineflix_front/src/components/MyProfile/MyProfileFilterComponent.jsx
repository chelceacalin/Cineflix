import {
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import axios from "axios";
import "./css/MyProfileFilterComponent.css";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { UserLoginContext } from "../../utils/context/LoginProvider";

function MyProfileFilterComponent({ filterInput }) {
  let [title, setTitle] = useState("");
  let [director, setDirector] = useState("");
  let [category, setCategory] = useState("");
  let [available, setAvailable] = useState(true);
  let [unavailable, setUnavailable] = useState(true);
  let [rentedUntil, setRentedUntil] = useState("");
  let [rentedBy, setRentedBy] = useState("");
  let [url, setUrl] = useState("");
  const [usersWhoRented, setUsersWhoRented] = useState([]);
  const { username } = useContext(UserLoginContext);

  useEffect(() => {
    url = `/movies?owner_username=${username}`;
    axios.get(url).then((elems) => {
      setUsersWhoRented(elems.data.content);
    });
  }, [url]);

  useEffect(() => {
    let date = rentedUntil
      ? `${rentedUntil.getFullYear()}-${(rentedUntil.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${rentedUntil
          .getDate()
          .toString()
          .padStart(2, "0")}`
      : "";
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
    <div className="filterContainer border-r-2 space-y-4 ml-6">
      <div className="mt-10 mr-6">
        <TextField
          id="outlined-search"
          name="title"
          label="Search title"
          type="search"
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            style: { fontFamily: "Sanchez" }
          }}
          InputLabelProps={{
            style: { fontFamily: "Sanchez" }
          }}
        />
      </div>
      <div className="mt-10 mr-6">
        <TextField
          id="outlined-search"
          name="director"
          label="Search director"
          type="search"
          onChange={(e) => setDirector(e.target.value)}
          InputProps={{
            style: { fontFamily: "Sanchez" }
          }}
          InputLabelProps={{
            style: { fontFamily: "Sanchez" }
          }}
        />
      </div>
      <div className="mt-10 mr-6">
        <TextField
          id="outlined-search"
          name="category"
          label="Search category"
          type="search"
          onChange={(e) => setCategory(e.target.value)}
          InputProps={{
            style: { fontFamily: "Sanchez" }
          }}
          InputLabelProps={{
            style: { fontFamily: "Sanchez" }
          }}
        />
      </div>
      <div className="p-1">
        <div className="mt-4 mb-2">Availability: </div>
        <div>
          <div>
            <Checkbox
              name="type"
              label="Unavailable"
              defaultChecked
              onClick={(e) => {
                setUnavailable(e.target.checked);
              }}
            />
            <label name="unavailable">Unavailable</label>
          </div>
          <div>
            <Checkbox
              name="type"
              label="Available"
              defaultChecked
              onClick={(e) => {
                setAvailable(e.target.checked);
              }}
            />
            <label name="available">Available</label>
          </div>
        </div>
      </div>
      <div className="mt-10 mr-6">
        <label>Rented Until:</label>
        <DatePicker
          selected={rentedUntil}
          placeholderText={"Select the date"}
          onChange={(date) => setRentedUntil(date)}
          className="rounded-lg w-52 border-2 border-gray-500 pl-1 mt-2"
        />
        <div className="mt-2 mb-10">
          <Button
            className="font-normal contained-button"
            onClick={(e) => {
              e.preventDefault();
              setRentedUntil("");
            }}
          >
            Reset date
          </Button>
        </div>
      </div>
      <div className="mt-10 mr-6">
        <label className="block">Rented by:</label>
        <select
          className="input-field mt-2"
          onChange={(e) => {
            setRentedBy(e.target.value);
          }}
        >
          <option value="">Select Rented By</option>
          {usersWhoRented &&
            usersWhoRented.map((elem, index) => (
              elem.rentedBy !== "available"
                ? <option key={index} value={elem.rentedBy}>
                  {elem.rentedBy}
                </option>
                : ""
            ))}
        </select>
      </div>
    </div>
  );
}

export default MyProfileFilterComponent;
