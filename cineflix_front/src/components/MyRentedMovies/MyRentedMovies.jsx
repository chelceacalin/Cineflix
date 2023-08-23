import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import MyProfileRiredirectButtons from "../MyProfile/MyProfileRiredirectButtons";
import MyRentedMoviesFilter from "./MyRentedMoviesFilter";
import Movie_MyRentedMovies from "./Movie_MyRentedMovies";
import SortIcon from "../../utils/icon/SortIcon";
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
        `owner_username=${username}`,
        `sortField=${normalizedSortField}`,
        `direction=${direction ? "ASC" : "DESC"}`,
        `title=${title}`,
        `director=${director}`,
        `category=${category}`,
        `rentedOn=${rentedDate}`,
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

    // axios.get(url).then((elems) => {
    //   if (elems.data.content.length === 0 && pageNo > 1) {
    //     updatePageNumber(pageNo - 1);
    //   } else {
    //     setMovies(elems.data.content);
    //     setTotalPages(elems.data.totalPages);
    //   }
    // });
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

  return (
    <>
      <MyRentedMoviesFilter filterInput={getFilterInput} />
      <div className="bg-grey-texture w-full">
        <MyProfileRiredirectButtons />
        <div className="w-full h-full px-4 ">
          <table className="w-full min-w-max bg-white border-2 table-auto text-left">
            <thead className="bg-basic-red text-white">
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
                          setSortField("rentedOn");
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
                    ownerUsername,
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
                      owner={ownerUsername}
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
      </div>
    </>
  );
}

export default MyRentedMovies;
