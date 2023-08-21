import React, { useState, useEffect } from "react";
import Category from "./Category";
import { Button } from "@mui/material";
import FilterCategory from "./FilterCategory";
import "./css/CategoryManagement.css";
import axios from "axios";
import CreateCategoryModalWindow from "./CreateCategoryModalWIndow.jsx";
import category from "./Category";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../RoleManagement/Pagination";
axios.defaults.withCredentials = true;

function CategoryManagement() {
  const TABLE_HEAD = ["Category", "Actions", ""];
  let [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [direction, setDirection] = useState(true);
  const [lastClicked, setLastClicked] = useState(null);
  let [newUrl, setNewUrl] = useState("");
  let [pageNo, setPageNo] = useState(1);
  let [pageSize, setPageSize] = useState(15);
  let [totalPages, setTotalPages] = useState("");
  let [totalCategories, setTotalCategories] = useState(0);
  let [signalCall, setSignalCall] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8081/category`).then((data) => {
      setTotalCategories(data.data.content.length);
      setCategories(data.data.content);
    });

  }, [totalCategories,signalCall]);


  let handleClick = (fieldName) => {
    if (lastClicked === fieldName) {
      setDirection(!direction);
    }
    setLastClicked(fieldName);
  };

  let signal = () => {
    setSignalCall(!signalCall);
  }

  useEffect(() => {
    newUrl = `http://localhost:8081/category?direction=${
      direction ? "ASC" : "DESC"
    }&name=${name}&pageNo=${parseInt(pageNo) - 1}&pageSize=${pageSize}`;
    axios.get(newUrl).then((elems) => {
      if (elems.data.content.length === 0 && pageNo > 1) {
        updatePageNumber(pageNo - 1);
      } else {
        setCategories(elems.data.content);
        setTotalPages(elems.data.totalPages);
      }
    });
  }, [direction, name, pageSize, pageNo,categories.length]);

  const updatePageNumber = (pgNo) => {
    setPageNo(pgNo);
  };

  const [open, setOpen] = React.useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const handleOpen = () => {
    setErrorMessage("");
    setOpen(true);
  }

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  }


  let getFilterInput = (params) => {
    setName(params[0]);
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setPageSize(value);
  };

  const updateCategory = (updatedCategory) => {
    const updatedCategories = categories.map(category => {
      if (category.id === updatedCategory.id) {
        return updatedCategory;
      }
      return category;
    });
    setCategories(updatedCategories);
  };


  return (
    <>
      <FilterCategory filterInput={getFilterInput} />
      <div className="bg-grey-texture w-full">
        <div className="w-full h-full px-10 py-5">
          <table className="cater w-full text-left bg-white border-2">
            <thead className="bg-basic-red text-white">
              <tr>
                {TABLE_HEAD.slice(0, TABLE_HEAD.length - 1).map((elem) => {
                  return (
                    <th
                      key={elem}
                      className="border-b-white p-4 hover"
                      onClick={(e) => {
                        e.preventDefault();
                        if (e.target.textContent === "Category") {
                          setDirection(!direction);
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
                          {elem != "Actions" && (
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
                  <div>
                    <Button onClick={handleOpen}
                      className="white-outlined-button"
                      variant="outlined"
                    >
                      Add new
                    </Button>
                    <CreateCategoryModalWindow
                        isModalOpen={open}
                        closeModal={handleClose}
                        signal={signal}
                        setErrorMessage={setErrorMessage}
                        errorMessage = {errorMessage}
                      />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-blue-marine">
              {categories.map(({ name, id }, index) => {
                const isLast = index === categories.length - 1;
                const classes = isLast ? "px-4 py-2" : "px-4 py-2 border-b-2";

                return (
                  <Category
                    id={id}
                    name={name}
                    classes={classes}
                    updateCategory={updateCategory}
                    key={name}
                    signal={signal}
                    setErrorMessage={setErrorMessage}
                    errorMessage = {errorMessage}
                  />
                );
              })}
            </tbody>
          </table>
          <span className="bg-basic-red flex flex-wrap py-3 mb-4">
          <span className=" inline-flex marginResizable">
            <p className="text-white font-normal">
              Results per page:{" "}
            </p>
            <p className="ml-5">
              <select
                name="sizes"
                id="sizes"
                form="sizesform"
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
              responseLength={totalCategories}
              nrCurrentUsers={categories.length}
            />
          </div>
        </span>
        </div>
      </div>
    </>
  );
}

export default CategoryManagement;
