import {
  Checkbox,
  TextField,
  Button, Autocomplete,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserLoginContext } from "../../utils/context/LoginProvider";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import DatePickerClear from "../DatePickerClear.jsx";
import * as moreClasses from "react-dom/test-utils";

function MovieFilter({ filterInput }) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(true);
  const [unavailable, setUnavailable] = useState(true);
  const [rentedUntil, setRentedUntil] = useState(null);
  const [rentedDate,setRentedDate]=useState(null)
  const [rentedBy, setRentedBy] = useState(null);
  const [usersWhoRented, setUsersWhoRented] = useState([]);
  const { username } = useContext(UserLoginContext);
  let [filteredUsers,setFilteredUsers]=useState([])
  let [url, setUrl] = useState("");

  useEffect(() => {
    url = `/movies`;
    axios.get(url).then((elems) => {
      setUsersWhoRented(elems.data.content);
      const filteredElems= elems.data.content.filter((elem)=>elem.rentedBy!=="available")
      const arrayUniqueByKey = [...new Map(filteredElems.map(item =>[item.rentedBy, item])).values()];
      setFilteredUsers( arrayUniqueByKey  )      
    });
  }, [url]);

  let convertDate = (input) => {
    const inputDate = new Date(input);
    const year = inputDate.getFullYear();
    const month = ("0" + (inputDate.getMonth() + 1)).slice(-2);
    const day = ("0" + inputDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const rentedUntilField = rentedUntil ? convertDate(rentedUntil) : "";
    const rentedDateField=rentedDate?convertDate(rentedDate):"";
    const array = [];
    if (
      (available === true && unavailable === true) ||
      (available === false && unavailable === false)
    ) {
      array.push(category, director, title, "BOTH", rentedUntilField, rentedBy,rentedDateField);
    } else if (available === true && unavailable === false) {
      array.push(category, director, title, "true", rentedUntilField, rentedBy,rentedDateField);
    } else if (available === false && unavailable == true) {
      array.push(category, director, title, "false", rentedUntilField, rentedBy,rentedDateField);
    } else array.push(category, director, title, "", rentedUntilField, rentedBy,rentedDateField);
    filterInput(array);
  }, [
    category,
    director,
    title,
    available,
    unavailable,
    rentedUntil,
    rentedBy,
    rentedDate
  ]);

  return (
    <div className="space-y-4 ml-7 mr-1">
      <div className="mt-10">
        <TextField
          id="outlined-search"
          name="title"
          label="Search title"
          type="search"
          className="w-48"
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            style: { fontFamily: "Sanchez" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Sanchez" },
          }}
        />
      </div>
      <div className="mt-10">
        <TextField
          id="outlined-search"
          name="director"
          label="Search director"
          type="search"
          className="w-48"
          onChange={(e) => setDirector(e.target.value)}
          InputProps={{
            style: { fontFamily: "Sanchez" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Sanchez" },
          }}
        />
      </div>
      <div className="mt-10">
        <TextField
          id="outlined-search"
          name="category"
          label="Search category"
          type="search"
          className="w-48"
          onChange={(e) => setCategory(e.target.value)}
          InputProps={{
            style: { fontFamily: "Sanchez" },
          }}
          InputLabelProps={{
            style: { fontFamily: "Sanchez" },
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
              className="w-48"
              value={rentedDate}
              labelString={"Rented on"}
              onClear={() => setRentedDate(null)}
              onChange={(newDate) => setRentedDate(newDate)}
          />
        </LocalizationProvider>
      </div>

      <div className="mt-10 mr-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerClear
              value={rentedUntil}
              labelString={"Rented until"}
              onClear={() => setRentedUntil(null)}
              onChange={(newDate) => setRentedUntil(newDate)}
          />
        </LocalizationProvider>
      </div>
      <div className="mt-10 mr-6">
        <Autocomplete
            sx={{ fontFamily: "Sanchez" }}
            value={rentedBy}
            onChange={(e, value) => {
              setRentedBy(value);
            }}
            ListboxProps={{
              style:{ fontFamily: "Sanchez" }
            }}
            options={filteredUsers.map(m => m.rentedBy)}
            renderInput={(params) =>
                <TextField
                    {...params}
                    InputLabelProps={{
                      style: { fontFamily: "Sanchez" }
                    }}
                    InputProps={{
                      ...params.InputProps, ...moreClasses.input,
                      style: { fontFamily: "Sanchez" }
                    }}
                    sx={{ fontFamily: "Sanchez" }}
                    label="Rented by"/>}
        />
      </div>
    </div>
  );
}

export default MovieFilter;
