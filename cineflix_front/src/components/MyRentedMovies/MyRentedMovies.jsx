import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import MyProfileRiredirectButtons from "../MyProfile/MyProfileRiredirectButtons";
import MyRentedMoviesFilter from "./MyRentedMoviesFilter";
import Movie_MyRentedMovies from "./Movie_MyRentedMovies";
import SortIcon from "../../utils/icon/SortIcon";
import Pagination from "../RoleManagement/Pagination";
import { UserLoginContext } from "../../utils/context/LoginProvider";

function MyRentedMovies() {
  const TABLE_HEAD = [
    "Title",
    "Director",
    "Category",
    "Rented On",
    "Rented Until",
    "Owner",
    "",
  ];
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("");
  const [director, setDirector] = useState("");
  const [title, setTitle] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [isAvailable, setIsAvailable] = useState("");
  const [rentedDate, setRendedDate] = useState("");
  const [rentedUntil, setRentedUntil] = useState("");
  const [rentedBy, setRentedBy] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [movieOwner, setMovieOwner] = useState("");
  const [sortField, setSortField] = useState("title");
  const [direction, setDirection] = useState(true);
  const [lastClicked, setLastClicked] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalPages, setTotalPages] = useState("");
  const [totalMovies, setTotalMovies] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const { username } = useContext(UserLoginContext);

  let handleClick = (fieldName) => {
    if (lastClicked === fieldName) {
      setDirection(!direction);
    }
    setLastClicked(fieldName);
  };

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

    const url = buildUrl();

    axios.get(url).then((elems) => {
      if (elems.data.content.length === 0 && pageNo > 1) {
        updatePageNumber(pageNo - 1);
      } else {
        setMovies(elems.data.content);
        setTotalPages(elems.data.totalPages);
      }
      setInitialized(true);
    }).catch(error => {
      setInitialized(true);
    });
  }, [
    triggerRefresh,
    sortField,
    direction,
    title,
    director,
    category,
    rentedUntil,
    rentedDate,
    rentedBy,
    ownerUsername,
    pageSize,
    pageNo,
    movies.length,
  ]);

  let getFilterInput = (params) => {
    setCategory(params[0]);
    setDirector(params[1]);
    setTitle(params[2]);
    setRentedUntil(params[3]);
    setRendedDate(params[4]);
    setMovieOwner(params[5]);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setPageSize(value);
  };

  const updatePageNumber = (pgNo) => {
    setPageNo(pgNo);
  };

  return (
    <>
      <div className="h-screen border-r-2">
        <MyRentedMoviesFilter filterInput={getFilterInput} />
      </div>
      <div className="bg-grey-texture w-full h-screen px-10">
        <MyProfileRiredirectButtons />
        <div className="w-full h-[87vh] flex flex-col bg-white justify-between border-2">
        <div className="overflow-y-auto">
          <table className="w-full min-w-max bg-white border-b-2 table-auto text-left">
            <thead className="bg-basic-red sticky top-0 z-30 text-white">
              <tr>
                {TABLE_HEAD.slice(0, TABLE_HEAD.length - 1).map((elem) => {
                  return (
                    <th
                      key={elem}
                      className="border-b-white p-4 hover cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();

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
                        } else if (e.target.textContent === "Rented On") {
                          if (
                            title.length > 0 ||
                            director.length > 0 ||
                            category.length > 0
                          ) {
                            setDirection(!direction);
                          }
                          setSortField("rentedDate");
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
                        } else if (e.target.textContent === "Owner") {
                          if (
                            title.length > 0 ||
                            director.length > 0 ||
                            category.length > 0
                          ) {
                            setDirection(!direction);
                          }
                          setSortField("owner_username");
                          handleClick(e.target.textContent.toLowerCase());
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
                            handleClick(
                              e.currentTarget
                                .getAttribute("data-column")
                                .toLowerCase()
                            );
                          }}
                        >
                          {<SortIcon />}
                        </svg>
                      </div>
                    </th>
                  );
                })}
                <th className="border-b-white p-4 ">
                  <div>Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-blue-marine">
              {movies.map(
                (
                  {
                    title,
                    director,
                    category,
                    rentedDate,
                    rentedUntil,
                    rentedBy,
                    owner_username,
                    id,
                  },
                  index
                ) => {
                  const isLast = index === movies.length - 1;
                  const classes = isLast
                    ? "px-4 py-2"
                    : "px-4 py-2 border-b border-blue-gray-50";
                  return (
                    <Movie_MyRentedMovies
                      id={id}
                      title={title}
                      category={category}
                      director={director}
                      rentedUntil={rentedUntil}
                      rentedDate={rentedDate}
                      rentedBy={rentedBy}
                      owner={owner_username}
                      key={index}
                      classes={classes}
                      triggerRefresh={triggerRefresh}
                      setTriggerRefresh={setTriggerRefresh}
                    />
                  );
                }
              )}
            </tbody>
          </table>
          </div>
          { !movies.length && initialized && (<p className="text-center text-2xl">No matching results found</p> )}
          <div className="w-full bg-basic-red flex justify-between flex-wrap py-3 border-2">
            <div className=" inline-flex marginResizable">
              <p className="text-white font-normal">Results per page: </p>
              <p className="ml-5">
                <select
                  onChange={handleSelectChange}
                  className="bg-basic-red cursor-pointer text-white font-bold border-2 p-1"
                >
                  <option value="15">15</option>
                  <option value="10">10</option>
                  <option value="5">5</option>
                </select>
              </p>
            </div>
            <div className="ml-10 justify-center items-center">
              { movies.length > 0 && (<Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                totalPages={totalPages}
                updatePageNumber={updatePageNumber}
                responseLength={totalMovies}
                nrCurrentMovies={movies.length}
              /> )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRentedMovies;
