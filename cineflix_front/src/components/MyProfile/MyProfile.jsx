import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import MyProfileFilterComponent from "./MyProfileFilterComponent";
import Pagination from "../RoleManagement/Pagination";
import Movie from "./Movie";
import AddNewMovieModalWindow from "./AddNewMovieModalWindow";
axios.defaults.withCredentials = true;

function MyProfile() {
  const TABLE_HEAD = ["Title", "Director", "Category", "Status", "Rented Until", "Rented By", ""];
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("");
  const [director, setDirector] = useState("");
  const [title, setTitle] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [rentedUntil, setRentedUntil] = useState("");
  const [rentedBy, setRentedBy] = useState("");
  let [ownerUsername, setOwnerUsername] = useState("");
  const [sortField, setSortField] = useState("title");
  const [direction, setDirection] = useState(true);
  const [lastClicked, setLastClicked] = useState(null);
  let [newUrl, setNewUrl] = useState("");
  let [pageNo, setPageNo] = useState(1);
  let [pageSize, setPageSize] = useState(15);
  let [totalPages, setTotalPages] = useState("");
  let [totalMovies, setTotalMovies] = useState(0);
  let [addMovieUrl, setAddMovieUrl] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleClick = (fieldName) => {
    if (lastClicked === fieldName) {
      setDirection(!direction);
    }
    setLastClicked(fieldName);
  };

  const updateMovie = (updatedMovie) => {
    const updatedMovies = movies.map(movie => {
      if (movie.title === updatedMovie.title) {
        return updatedMovie;
      }
      return movie;
    });
    setMovies(updatedMovie);
  };

  useEffect(() => {
    const normalizedSortField = sortField || "title";

    newUrl = `http://localhost:8081/movies?owner_username=adminusername&sortField=${normalizedSortField}&direction=${
        direction ? "ASC" : "DESC"}&title=${title}&director=${director}&category=${category}&isAvailable=${isAvailable}&pageNo=${
            parseInt(pageNo) - 1}&pageSize=${pageSize}`;

    axios.get(newUrl).then((elems) => {
      if (elems.data.content.length === 0 && pageNo > 1) {
        updatePageNumber(pageNo - 1);
      } else {
        setMovies(elems.data.content);
        setTotalPages(elems.data.totalPages);
      }
    });
    // console.log("url: " + newUrl);

  }, [ sortField, direction, title, director, category, isAvailable, rentedUntil, rentedBy, ownerUsername, pageSize, pageNo ]);

  let getFilterInput = (params) => {
    setCategory(params[0]);
    setDirector(params[1]);
    setTitle(params[2]);
    setIsAvailable(params[3] == "BOTH" ? "" : params[3]);
    setRentedUntil(params[4]);
    setRentedBy(params[5]);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setPageSize(value);
  };

  const updatePageNumber = (pgNo) => {
    setPageNo(pgNo);
  };

  const addMovie = (addedMovie) => {
    const addedMovies = movies.map(movie => {
      if (movie.title === addedMovie.title) {
        return addedMovie;
      }
      return movie;
    });
    setMovies(updatedMovie);
  };


  return (
    <>
    <MyProfileFilterComponent filterInput={getFilterInput}/>
    <div className="w-full h-full ml-10 mr-10 mt-5">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-basic-red text-white">
            <tr>
              {TABLE_HEAD.slice(0, TABLE_HEAD.length - 1).map((elem) => {
                return (
                  <th
                    key={elem}
                    className="border-b-white p-4 hover cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();

                      if (e.target.textContent !== "Status") {
                        if (e.target.textContent === "Title") {
                          setSortField("title");
                          setDirection(!direction);
                        } else if (e.target.textContent === "Director") {
                          if (
                            title.length > 0 ||
                            director.length > 0 ||
                            category.length > 0
                          ) {
                            setDirection(!direction);
                          }
                          setSortField("director");
                          handleClick(e.target.textContent.toLowerCase());
                        } else if (e.target.textContent === "Category") {
                          if (
                            title.length > 0 ||
                            director.length > 0 ||
                            category.length > 0
                          ) 
                           setDirection(!direction);
                          setSortField("category");
                          handleClick(e.target.textContent.toLowerCase());
                        } else if (e.target.textContent === "Rented Until") {
                          if (
                            title.length > 0 ||
                            director.length > 0 ||
                            category.length > 0
                          ) {
                            setDirection(!direction);
                          }
                          setSortField("rentedUntil");
                          handleClick(e.target.textContent.toLowerCase());
                        } else if (e.target.textContent === "Rented By") {
                          console.log(e.target.textContent)
                          if (
                            title.length > 0 ||
                            director.length > 0 ||
                            category.length > 0
                          ) {
                            setDirection(!direction);
                          }
                          setSortField("rentedBy");
                          handleClick(e.target.textContent.toLowerCase());
                        }
                      }
                    }}
                  >
                    <div className="">
                      {elem}
                      <svg
                        data-column={elem}
                        style={{ display: "inline-block" }}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={(e) => {
                          setDirection(!direction);
                          handleClick(e.currentTarget.getAttribute("data-column").toLowerCase());
                        }}
                      >
                        {elem != "Status" && (
                          <path
                            d="M4.16572 7.36845H11.8349C12.4074 7.36845 12.7116 6.72395 12.3311 6.31639L8.49679 2.21243C8.4346 2.14564 8.35821 2.09217 8.27269 2.05555C8.18716 2.01893 8.09444 2 8.00065 2C7.90687 2 7.81415 2.01893 7.72862 2.05555C7.6431 2.09217 7.56671 2.14564 7.50452 2.21243L3.66892 6.31639C3.28835 6.72395 3.59254 7.36845 4.16572 7.36845ZM7.50385 13.7876C7.56605 13.8544 7.64243 13.9078 7.72796 13.9444C7.81348 13.9811 7.9062 14 7.99999 14C8.09378 14 8.1865 13.9811 8.27202 13.9444C8.35755 13.9078 8.43393 13.8544 8.49613 13.7876L12.3304 9.68361C12.7116 9.27669 12.4074 8.63218 11.8343 8.63218H4.16572C3.59321 8.63218 3.28902 9.27669 3.66959 9.68424L7.50385 13.7876Z"
                            fill="#ffffff"
                          />
                        )}
                      </svg>
                    </div>
                  </th>
                );
              })}
              <th className="border-b-white p-4 ">
                <div>Actions</div>
              </th>
              <th className="border-b-white p-2">
                <button onClick={handleOpen} className="bg-basic-red text-white border border-white hover:border-hover-cream hover:text-hover-cream py-2 px-6">
                  Add New
                </button>
                <AddNewMovieModalWindow
                  isModalOpen={open}
                  closeModal={handleClose}
                  title={title}
                  director={director}
                  category={category}
                  addMovie={addMovie}
                />
              </th>
            </tr>
          </thead>
          <tbody className="text-blue-marine">
            {movies.map(({ category, director, title, isAvailable, rentedUntil, rentedBy }, index) => {
              const isLast = index === movies.length - 1;
              const classes = isLast
                ? "px-4 py-2"
                : "px-4 py-2 border-b border-blue-gray-50";

              return (
                <Movie
                  title={title}
                  category={category}
                  director={director}                  
                  isAvailable={isAvailable}
                  rentedUntil={rentedUntil}
                  rentedBy={rentedBy}
                  key={index}
                  updateMovie={updateMovie} 
                  classes={classes}
                />
              );
            })}
          </tbody>
        </table>
        <span className="w-full bg-basic-red flex flex-wrap py-3 mb-4">
          <span className=" inline-flex marginResizable">
            <p className="text-white font-normal">
              Results per page:{" "}
            </p>
            <p className="ml-5">
              <select
                name="cars"
                id="cars"
                form="carform"
                onChange={handleSelectChange}
                className="cursor-pointer"
              >
                <option value="15">15</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </select>
            </p>
          </span>
          <div className="ml-10 justify-center w-1/2 items-center">
            <Pagination
              pageNo={pageNo}
              pageSize={pageSize}
              totalPages={totalPages}
              updatePageNumber={updatePageNumber}
              responseLength={totalMovies}
              nrCurrentMovies={movies.length}
            />
          </div>
        </span>
      </div>
    </>
  )
}

export default MyProfile
