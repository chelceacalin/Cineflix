import {
  Checkbox,
  TextField,
  Autocomplete
} from "@mui/material";
import React from "react";
import axios from "axios";
import "./css/MyRentedMoviesFilter.css";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import { UserLoginContext } from "../../utils/context/LoginProvider";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DatePickerClear from "../DatePickerClear";
import * as moreClasses from "react-dom/test-utils";

function MyRentedMoviesFilter({ filterInput }) {
  let [title, setTitle] = useState("");
  let [director, setDirector] = useState("");
  let [category, setCategory] = useState("");
  let [rentedOn, setRentedOn] = useState(null);
  let [rentedUntil, setRentedUntil] = useState(null);
  let [owner, setOwner] = useState(null);
  const [rentedBy, setRentedBy] = useState("");
  const [movieOwner, setMovieOwner] = useState("");
  const [sortField, setSortField] = useState("title");
  const [direction, setDirection] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalPages, setTotalPages] = useState("");
  let [newUrl, setNewUrl] = useState("");
  let [movieOwners, setMovieOwners] = useState([]);
  const { username } = useContext(UserLoginContext);
  let [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const buildUrl = () => {
      const normalizedSortField = sortField || "title";
      let params = [
        // `rentUsername=${username}`
        `sortField=${normalizedSortField}`,
        `direction=${direction ? "ASC" : "DESC"}`,
        `title=${title}`,
        `director=${director}`,
        `category=${category}`,
        `pageNo=${parseInt(pageNo) - 1}`,
        `pageSize=${pageSize}`,
      ];

      if (username) {
        params.push(`rentUsername=${username}`);
      }

      if (rentedUntil) {
        params.push(`rentedUntil=${rentedUntil}`);
      }

      if (movieOwner) {
        params.push(`owner_username=${movieOwner}`);
      }
      
      if (rentedUntil) {
        params.push(`rentedDate=${rentedDate}`);
      }

      if (rentedBy) {
        params.push(`rentedBy=${ownerUsername}`);
      }

      return `/movies/rented?${params.join("&")}`;
    };

    setNewUrl(buildUrl());
    // console.log(newUrl);

    axios.get(newUrl).then((elems) => {
      const arrayUniqueByKey = [...new Map(elems.data.content.map(item => [item.owner_username, item])).values()];
      setFilteredUsers(arrayUniqueByKey);
    }).catch(error => {
      // console.log(error);
    });
  }, [newUrl]);

    let convertDate = (input) => {
        const inputDate = new Date(input);
        const year = inputDate.getFullYear();
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const day = ('0' + inputDate.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

  useEffect(() => {
    let date = rentedUntil ? convertDate(rentedUntil) : "";
    let rendetDate = rentedOn ? rentedOn : "";
    let array = [];
    
    array.push(category, director, title, date, rendetDate, owner);

    filterInput(array);
  }, [
    category,
    director,
    title,
    rentedUntil,
    rentedOn,
    owner
  ]);

  return (
    <div className="space-y-4 ml-7">
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
      <div className="mt-10 mr-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerClear
              labelString={"Rented Date"}
              value={rentedOn}
              onClear={() => setRentedOn(null)}
              onChange={(newDate) => setRentedOn(newDate)}
          />
        </LocalizationProvider>
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
        <Autocomplete
            sx={{ fontFamily: "Sanchez" }}
            value={owner}
            onChange={(e, value) => {
              setOwner(value);
            }}
            ListboxProps={{
                style:{ fontFamily: "Sanchez" }
            }}
            options={filteredUsers.map(m => m.owner_username)}
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
                label="Owner"/>}
        />
      </div>
    </div>
  );
}

export default MyRentedMoviesFilter;
