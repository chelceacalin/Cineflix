import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../RoleManagement/Pagination";
import RentedMovie from "./RentedMovie";
import { UserLoginContext } from "../../utils/context/LoginProvider";
import MovieFilter from "./MovieFilter";
import SortIcon from "../../utils/icon/SortIcon";
function Movies() {
  const TABLE_HEAD = [
    "Title",
    "Director",
    "Category",
    "Status",
    "Rented On",
    "Rented Until",
    "Rented By",
    "",
    "  ",
  ];
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("");
  const [director, setDirector] = useState("");
  const [title, setTitle] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [rentedUntil, setRentedUntil] = useState("");
  const [rentedBy, setRentedBy] = useState("");
  const [rentedDate, setrentedDate] = useState("");
  let [newUrl, setNewUrl] = useState("");
  let [pageNo, setPageNo] = useState(1);
  let [pageSize, setPageSize] = useState(15);
  let [totalPages, setTotalPages] = useState("");
  let [totalMovies, setTotalMovies] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const { username } = useContext(UserLoginContext);
  const [direction, setDirection] = useState(true);
  const [sortField, setSortField] = useState("title");
  let [ownerUsername, setOwnerUsername] = useState("");
  let [lastClicked, setLastClicked] = useState("");

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
        `owner_username=${username}`,
        `sortField=${normalizedSortField}`,
        `direction=${direction ? "ASC" : "DESC"}`,
        `title=${title}`,
        `director=${director}`,
        `category=${category}`,
        `isAvailable=${isAvailable}`,
        `pageNo=${parseInt(pageNo) - 1}`,
        `pageSize=${pageSize}`,
      ];

      if (rentedUntil) {
        params.push(`rentedUntil=${rentedUntil}`);
      }

      if (rentedBy) {
        params.push(`rentedBy=${rentedBy}`);
      }

      return `/movies?${params.join("&")}`;
    };

    const url = buildUrl();

    axios.get(url).then((elems) => {
      if (elems.data.content.length === 0 && pageNo > 1) {
        updatePageNumber(pageNo - 1);
      } else {
        setMovies(elems.data.content);
        setTotalPages(elems.data.totalPages);
      }
    });
  }, [
    triggerRefresh,
    sortField,
    direction,
    title,
    director,
    category,
    isAvailable,
    rentedUntil,
    rentedBy,
    ownerUsername,
    pageSize,
    rentedDate,
    pageNo,
    movies.length,
  ]);
  let getFilterInput = (params) => {
    setCategory(params[0]);
    setDirector(params[1]);
    setTitle(params[2]);
    setIsAvailable(params[3] === "BOTH" ? "" : params[3]);
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

  return (
    <>
      <MovieFilter filterInput={getFilterInput} />
      <div className="bg-grey-texture w-full">
        <div className="w-full h-full px-10 py-5">
          <table className="w-full min-w-max table-auto text-left border-2">
            <thead className="bg-basic-red text-white">
              <tr>
                {TABLE_HEAD.slice(0, TABLE_HEAD.length).map((elem) => {
                  return (
                    <th
                      key={elem}
                      className={`border-b-white p-4 ${
                        elem.length > 2 ? "hover" : ""
                      } cursor-pointer`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (e.target.textContent !== "Status") {
                          if (e.target.textContent === "Title") {
                            setSortField("title");
                          } else if (e.target.textContent === "Director") {
                            setSortField("director");
                          } else if (e.target.textContent === "Category") {
                            setSortField("category");
                          }
                          if (
                            sortField === e.target.textContent.toLowerCase()
                          ) {
                            setDirection(!direction);
                          } else {
                            setDirection(true);
                          }

                          if (e.target.textContent === "Rented Until") {
                            setSortField("rentedUntil");
                            setDirection(!direction);
                          } else if (e.target.textContent === "Rented By") {
                            setSortField("rentedBy");
                            setDirection(!direction);
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
                            e.stopPropagation();
                            setDirection(!direction);
                            handleClick(
                              e.currentTarget
                                .getAttribute("data-column")
                                .toLowerCase()
                            );
                          }}
                        >
                          {elem != "Status" && elem.length > 2 && <SortIcon />}
                        </svg>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-blue-marine">
              {movies.map(
                (
                  {
                    category,
                    director,
                    title,
                    isAvailable,
                    rentedUntil,
                    rentedBy,
                    id,
                    rentedDate,
                  },
                  index
                ) => {
                  const isLast = index === movies.length - 1;
                  const classes = isLast
                    ? "px-4 py-2"
                    : "px-4 py-2 border-b border-blue-gray-50";

                  return (
                    <RentedMovie
                      id={id}
                      title={title}
                      category={category}
                      director={director}
                      isAvailable={isAvailable}
                      rentedUntil={rentedUntil}
                      rentedDate={rentedDate}
                      rentedBy={rentedBy}
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
          <span className="w-full bg-basic-red flex flex-wrap py-3 mb-4">
            <span className=" inline-flex marginResizable">
              <p className="text-white font-normal">Results per page: </p>
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
      </div>
    </>
  );
}

export default Movies;
