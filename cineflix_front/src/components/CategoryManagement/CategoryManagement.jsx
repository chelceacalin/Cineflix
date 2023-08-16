import React from 'react'
import Category from './Category';
import { Button } from '@mui/material';
import FilterCategory from './FilterCategory';

function CategoryManagement() {
  const TABLE_HEAD = ["Category", "Actions", ""]
  const categories = [
    {
      name: "Category 1"
    },
    {
      name: "Category 2"
    },
    {
      name: "Category 3"
    },
    {
      name: "Category 4"
    },
    {
      name: "Category 5"
    },
  ]

  return (
    <>
      <FilterCategory />
      <div className="w-1/3 h-full ml-10 mr-10 mt-5">
        <table className="w-3/4 min-w-max table-auto text-left">
          <thead className="bg-basic-red text-white">
            <tr>
              {TABLE_HEAD.slice(0, TABLE_HEAD.length - 1).map((elem) => {
                return (
                  <th
                    key={elem}
                    className="border-b-white p-4 hover "
                    onClick={(e) => {
                      e.preventDefault();


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
                        {(elem != "Actions") && (
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
                  <Button>
                    Add new
                  </Button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-blue-marine">
            {categories.map(({ name }, index) => {
              const isLast = index === categories.length - 1;
              const classes = isLast
                ? "px-4 py-2"
                : "px-4 py-2 border-b border-blue-gray-50";

              return (
                <Category
                  name={name}
                  classes={classes}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CategoryManagement