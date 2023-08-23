import {
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { UserLoginContext } from "../../utils/context/LoginProvider";

function MovieFilter({ filterInput }) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(true);
  const [unavailable, setUnavailable] = useState(true);
  const [rentedUntil, setRentedUntil] = useState("");
  const [rentedDate,setRentedDate]=useState("")
  const [rentedBy, setRentedBy] = useState("");
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
        <label>Rented On:</label>
        <DatePicker
          selected={rentedDate}
          placeholderText={"Select the date"}
          onChange={(date) => {
            setRentedDate(date);
          }}
          className="rounded-lg w-52 border-2 border-gray-500 pl-1 mt-2 mb-2"
        />

        <label>Rented Until:</label>
        <DatePicker
          selected={rentedUntil}
          placeholderText={"Select the date"}
          onChange={(date) => {
            setRentedUntil(date);
          }}
          className="rounded-lg w-48 border-2 border-gray-500 pl-1 mt-2"
        />
        <div className="mt-2 mb-10">
          <Button
            className="font-normal contained-button mt-4"
            onClick={(e) => {
              e.preventDefault();
              setRentedUntil("");
              setRentedDate("");
            }}
          >
            Reset date
          </Button>
        </div>
      </div>
      <div className="mr-6">
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

export default MovieFilter;
