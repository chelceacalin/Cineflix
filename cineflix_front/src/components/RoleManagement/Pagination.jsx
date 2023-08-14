import React, { useEffect, useState } from "react";

function Pagination({
  pageNo,
  pageSize,
  totalPages,
  updatePageNumber,
  responseLength,
  nrCurrentUsers,
}) {
  let getPreviousPage = () => {
    if (pageNo > 1) updatePageNumber(--pageNo);
  };

  let getNextPage = () => {
    if (pageNo < totalPages) updatePageNumber(++pageNo);
  };

  return (
    <>
      <ul className="list-style-none flex items-center justify-center mr-2">
        <li
          onClick={(e) => {
            e.preventDefault();
            getPreviousPage();
          }}
        >
          <div className="relative block rounded bg-transparent px-3  text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine">
            Previous
          </div>
        </li>

        {totalPages <= 7 &&
          Array(totalPages)
            .fill()
            .map((page, index) => (
              <li
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  updatePageNumber(parseInt(index) + 1);
                }}
              >
                <div
                  className={` ml-0.5 mr-0.5 relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine ${
                    index + 1 === pageNo ? "current-page" : ""
                  }`}
                >
                  {index + 1}
                </div>
              </li>
            ))}

        {totalPages >= 8 && (
          <>
            {Array(3)
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    updatePageNumber(parseInt(index) + 1);
                  }}
                >
                  <div
                    className={` ml-0.5 mr-0.5 relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine ${
                      index + 1 === pageNo ? "current-page" : ""
                    }`}
                  >
                    {" "}
                    {index + 1}{" "}
                  </div>
                </li>
              ))}

            {pageNo > 3 && pageNo < totalPages - 2 && (
              <>
                <li
                  key={pageNo}
                  onClick={(e) => {
                    e.preventDefault();
                    updatePageNumber(parseInt(pageNo));
                  }}
                >
                  <div
                    className={` ml-0.5 mr-0.5 relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine ${
                      pageNo > 3 && pageNo < totalPages - 2
                        ? "current-page"
                        : ""
                    }`}
                  >
                    {pageNo}{" "}
                  </div>
                </li>
              </>
            )}

            {Array(3)
              .fill()
              .map((_, index) => (
                <li
                  key={totalPages - 3 + index}
                  onClick={(e) => {
                    e.preventDefault();
                    updatePageNumber(totalPages - 3 + parseInt(index) + 1);
                  }}
                >
                  <div
                    className={` ml-0.  5 mr-0.5 relative block rounded bg-transparent px-3 py-1 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine ${
                      totalPages - 3 + index + 1 === pageNo
                        ? "current-page"
                        : ""
                    }`}
                  >
                    {totalPages - 3 + index + 1}
                  </div>
                </li>
              ))}
          </>
        )}

        <li
          onClick={(e) => {
            e.preventDefault();
            getNextPage();
          }}
        >
          <div className="relative block rounded bg-transparent px-3  text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine">
            Next
          </div>
        </li>
      </ul>

      <style>
        {`
        .current-page {
          background-color: white;
          color: black;
        }
      `}
      </style>
    </>
  );
}

export default Pagination;