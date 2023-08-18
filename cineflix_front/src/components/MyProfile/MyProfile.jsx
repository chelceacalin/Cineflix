import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import MyProfileFilterComponent from "./MyProfileFilterComponent";
import Pagination from "../RoleManagement/Pagination";
import Movie from "./Movie";
import AddNewMovieModalWindow from "./AddNewMovieModalWindow";
import SortIcon from "../../utils/icon/SortIcon";

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
    let baseUrl = `http://localhost:8081/movies?owner_username=adminusername&sortField=${normalizedSortField}&direction=${direction ? "ASC" : "DESC"}&title=${title}&director=${director}&category=${category}&isAvailable=${isAvailable}&rentedUntil=${rentedUntil}&pageNo=${
      parseInt(pageNo) - 1}&pageSize=${pageSize}`;

    if (rentedBy) {
      baseUrl += `&rentedBy=${rentedBy}`;
    }
  
    newUrl = `${baseUrl}&pageNo=${parseInt(pageNo) - 1}&pageSize=${pageSize}`;

    axios.get(newUrl).then((elems) => {
      if (elems.data.content.length === 0 && pageNo > 1) {
        updatePageNumber(pageNo - 1);
      } else {
        setMovies(elems.data.content);
        setTotalPages(elems.data.totalPages);
      }
    });
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
                          setDirection(!direction);
                          setSortField("director");
                          handleClick(e.target.textContent.toLowerCase());
                        } else if (e.target.textContent === "Category") {
                          setDirection(!direction);
                          setSortField("category");
                          handleClick(e.target.textContent.toLowerCase());
                        } else if (e.target.textContent === "Rented Until") {
                          setDirection(!direction);
                          setSortField("rentedUntil");
                          handleClick(e.target.textContent.toLowerCase());
                        } else if (e.target.textContent === "Rented By") {
                          setDirection(!direction);
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
                          const column = e.currentTarget.getAttribute("data-column");
                          if (column !== "Status") {
                            if (column === "Title") {
                              setSortField("title");
                              setDirection(!direction);
                            } else if (column === "Director") {
                              setDirection(!direction);
                              setSortField("director");
                              handleClick(column.toLowerCase());
                            } else if (column === "Category") {
                              setDirection(!direction);
                              setSortField("category");
                              handleClick(column.toLowerCase());
                            } else if (column === "Rented Until") {
                              setDirection(!direction);
                              setSortField("rentedUntil");
                              handleClick(column.toLowerCase());
                            } else if (column === "Rented By") {
                              setDirection(!direction);
                              setSortField("rentedBy");
                              handleClick(column.toLowerCase());
                            }
                          }
                        }}
                      >
                        {elem != "Status" && (
                          <SortIcon />
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
                name="movies"
                id="movies"
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
