import React, { useState, useEffect } from "react";
import UserCineflix from "./UserCineflix";
import FilterComponent from "./FilterComponent";
import axios from "axios";
axios.defaults.withCredentials = true;
import "./css/RoleManagement.css";
import Pagination from "./Pagination";

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
    axios.get(`http://localhost:8081/users`).then((data) => {
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
    newUrl = `http://localhost:8081/users?sortField=${normalizedSortField}&direction=${
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
      <FilterComponent filterInput={getFilterInput} />
      <div className="w-full h-full ml-10 mr-10 mt-5">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-basic-red text-white">
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
                          const columnName =
                            e.currentTarget.getAttribute("data-column");
                          handleClick(columnName.toLowerCase());
                        }}
                      >
                        {elem != "Role" && (
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
                : "px-4 py-2 border-b border-blue-gray-50";

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
              responseLength={totalUsers}
              nrCurrentUsers={users.length}
            />
          </div>
        </span>
      </div>
    </>
  );
}

export default RoleManagement;