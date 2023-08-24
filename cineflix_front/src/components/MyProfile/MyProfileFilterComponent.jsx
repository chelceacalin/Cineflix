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
import { UserLoginContext } from "../../utils/context/LoginProvider";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DatePickerClear from "../DatePickerClear.jsx";

function MyProfileFilterComponent({ filterInput }) {
  let [title, setTitle] = useState("");
  let [director, setDirector] = useState("");
  let [category, setCategory] = useState("");
  let [available, setAvailable] = useState(true);
  let [unavailable, setUnavailable] = useState(true);
  let [rentedUntil, setRentedUntil] = useState(null);
  let [rentedBy, setRentedBy] = useState("");
  let [url, setUrl] = useState("");
  const [usersWhoRented, setUsersWhoRented] = useState([]);
  let [filteredUsers,setFilteredUsers]=useState([])
  const { username } = useContext(UserLoginContext);

  useEffect(() => {
    url = `/movies?owner_username=${username}`;
    axios.get(url).then((elems) => {
      setUsersWhoRented(elems.data.content);
      const filteredElems= elems.data.content.filter((elem)=>elem.rentedBy!=="available")
      const arrayUniqueByKey = [...new Map(filteredElems.map(item =>[item.rentedBy, item])).values()];
      setFilteredUsers( arrayUniqueByKey  )
    });
  }, [url]);

  useEffect(() => {
    const date = rentedUntil ? rentedUntil.format('YYYY-MM-DD').toString() : '';

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
    <div className="space-y-4 ml-7">
      <div className="mt-10 mr-6">
        <TextField
          id="outlined-search"
          name="title"
          label="Search title"
          type="search"
          className="w-48"
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
          className="w-48"
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
          className="w-48"
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerClear
              labelString={"Rented until"}
              value={rentedUntil}
              onClear={() => setRentedUntil(null)}
              onChange={(newDate) => setRentedUntil(newDate)}
          />
        </LocalizationProvider>
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

          {filteredUsers.map((movie, index) => (
            <option key={index}>{movie.rentedBy}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default MyProfileFilterComponent;
