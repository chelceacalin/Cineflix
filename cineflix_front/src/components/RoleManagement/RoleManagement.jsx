import React, { useState, useEffect } from "react";
import UserCineflix from "../RoleManagement/UserCineflix";
import FilterComponent from "./FilterComponent";
import axios from "axios";
axios.defaults.withCredentials = true;
import "./css/RoleManagement.css";
import Pagination from "./Pagination";
import SortIcon from "../../utils/icon/SortIcon";

function RoleManagement() {
  const TABLE_HEAD = ["Name", "Role", "Email", "Actions", ""];
  const [users, setUsers] = useState([]);
  const [sortField, setSortField] = useState("defaultsort");
  const [direction, setDirection] = useState(true);
  const [lastClicked, setLastClicked] = useState(null);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let [userRole, setUserRole] = useState("");
  const [filterRole, setfilterRole] = useState("");
  let [newUrl, setNewUrl] = useState("");
  let [pageNo, setPageNo] = useState(1);
  let [pageSize, setPageSize] = useState(15);
  let [totalPages, setTotalPages] = useState("");
  let [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    axios.get(`/users`).then((data) => {
      setTotalUsers(data.data.content.length);
    });
  }, [totalUsers]);

  let handleClick = (fieldName) => {
    if (lastClicked === fieldName) {
      setDirection(!direction);
    }
    setLastClicked(fieldName);
  };



  const updateUser = (updatedUser) => {
    const updatedUsers = users.map(user => {
      if (user.username === updatedUser.username) {
        return updatedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
  };


  useEffect(() => {
    const normalizedSortField = sortField || "defaultsort";
    newUrl = `/users?sortField=${normalizedSortField}&direction=${
      direction ? "ASC" : "DESC"
    }&firstName=${firstName}&lastName=${lastName}&email=${email}&pageNo=${
      parseInt(pageNo) - 1
    }&pageSize=${pageSize}&role=${filterRole}`;
    axios.get(newUrl).then((elems) => {
      if (elems.data.content.length === 0 && pageNo > 1) {
        updatePageNumber(pageNo - 1);
      } else {
        setUsers(elems.data.content);
        setTotalPages(elems.data.totalPages);
      }
    });
  }, [ sortField,direction, firstName, lastName, email, pageSize, pageNo, filterRole ]);

  let getFilterInput = (params) => {
    setFirstName(params[0]);
    setLastName(params[1]);
    setEmail(params[2]);
    setfilterRole(params[3] == "BOTH" ? "" : params[3]);
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
      <div className="filterContainer h-screen border-r-2">
        <FilterComponent filterInput={getFilterInput} />
      </div>
      <div className="bg-grey-texture w-full h-screen px-10 py-10">
      <div className="w-full h-full flex flex-col bg-white justify-between border-2">
        <div className="overflow-y-auto">
        <table className="w-full text-left bg-white border-b-2">
          <thead className="bg-basic-red sticky top-0 z-30 text-white">
            <tr>
              {TABLE_HEAD.slice(0, TABLE_HEAD.length - 2).map((elem) => {
                return (
                  <th
                    key={elem}
                    className="border-b-white p-4 hover "
                    onClick={(e) => {
                      e.preventDefault();

                      if (e.target.textContent !== "Role") {
                        if (e.target.textContent === "Name") {
                          setSortField("defaultsort");
                          setDirection(!direction);
                        } else if (e.target.textContent === "Email") {
                          if (
                            firstName.length > 0 ||
                            lastName.length > 0 ||
                            email.length > 0
                          ) {
                            setDirection(!direction);
                          }
                          setDirection(!direction)
                          setSortField("email");
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
                          const columnName =e.currentTarget.getAttribute("data-column");
                          if (columnName === "Name") {
                            setSortField("defaultsort");
                            setDirection(!direction);
                          } else if (columnName === "Email") {
                            if (
                              firstName.length > 0 ||
                              lastName.length > 0 ||
                              email.length > 0
                            ) {
                              setDirection(!direction);
                            }
                            setDirection(!direction)
                            setSortField("email");
                            handleClick(columnName.toLowerCase());
                          }
                        }}
                      >
                        {elem != "Role" && (
                         <SortIcon/>
                        )}
                      </svg>
                    </div>
                  </th>
                );
              })}
              <th className="border-b-white p-4">
                <div>Actions</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-blue-marine">
            {users.map(({ firstName, lastName, role, email, username }, index) => {
              const isLast = index === users.length - 1;
              const classes = isLast
                ? "px-4 py-2"
                : "px-4 py-2 border-b-2";

              return (
                <UserCineflix
                  name={firstName + " " + lastName}
                  firstName={firstName}
                  lastName={lastName}
                  role={role}
                  email={email}
                  username={username}
                  key={index}
                  updateUser={updateUser}
                  classes={classes}
                />
              );
            })}
          </tbody>
        </table>
        </div>
        {!users.length && (<p className="text-center text-2xl">No matching results found</p> )}
        <div className="bg-basic-red flex justify-between flex-wrap py-3 border-2">
          <div className=" inline-flex marginResizable">
            <p className="text-white font-normal">
              Results per page:{" "}
            </p>
            <p className="ml-5">
              <select
                className="bg-basic-red cursor-pointer text-white font-bold border-2 p-1"
                onChange={handleSelectChange}
              >
                <option value="15">15</option>
                <option value="10">10</option>
                <option value="5">5</option>
              </select>
            </p>
          </div>
          <div className="justify-center items-center">
          { users.length > 0 && ( 
              <Pagination
                pageNo={pageNo}
                pageSize={pageSize}
                totalPages={totalPages}
                updatePageNumber={updatePageNumber}
                responseLength={totalUsers}
                nrCurrentUsers={users.length}
              /> )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default RoleManagement;