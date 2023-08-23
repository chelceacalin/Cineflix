import {
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import axios from "axios";
import "./css/MyRentedMoviesFilter.css";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { UserLoginContext } from "../../utils/context/LoginProvider";

function MyRentedMoviesFilter({ filterInput }) {
  let [title, setTitle] = useState("");
  let [director, setDirector] = useState("");
  let [category, setCategory] = useState("");
  let [rentedOn, setRentedOn] = useState("");
  let [rentedUntil, setRentedUntil] = useState("");
  let [owner, setOwner] = useState("");
  let [url, setUrl] = useState("");
  const [usersWhoRented, setUsersWhoRented] = useState([]);
  const { username } = useContext(UserLoginContext);
  let [filteredUsers,setFilteredUsers]=useState([])
  useEffect(() => {
    url = `/movies?owner_username=${username}`;
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
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const day = ('0' + inputDate.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

  useEffect(() => {
    let date = rentedUntil ? convertDate(rentedUntil) : "";
    let array = [];
    
    array.push(category, director, title, date, rentedOn, owner);

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
      <div className="mt-7 mr-6">
        <label>Rented Date:</label>
        <DatePicker
          selected={rentedOn}
          placeholderText={"Select the date"}
          onChange={(date) => setRentedOn(date)}
          className="rounded-lg w-52 border-2 border-gray-500 pl-1 mt-2"
        />
      </div>
      <div className="mt-10 mr-6">
        <label>Rented Until:</label>
        <DatePicker
          selected={rentedUntil}
          placeholderText={"Select the date"}
          onChange={(date) => setRentedUntil(date)}
          className="rounded-lg w-52 border-2 border-gray-500 pl-1 mt-2"
        />
        <div className="mt-2 mb-7">
          <Button
            className="font-normal contained-button"
            onClick={(e) => {
              e.preventDefault();
              setRentedUntil("");
              setRentedOn("");
            }}
          >
            Reset date
          </Button>
        </div>
      </div>
      <div className="mt-10 mr-6">
        <label className="block">Owner:</label>
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

export default MyRentedMoviesFilter;
