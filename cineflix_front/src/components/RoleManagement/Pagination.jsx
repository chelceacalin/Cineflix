import React, {useEffect, useState} from 'react'

function Pagination({pageNo, pageSize, totalPages, updatePageNumber,responseLength,nrCurrentUsers}) {


let getPreviousPage=()=>{

  if(pageNo>1)
     updatePageNumber(--pageNo);
}


let getNextPage=()=>{
  if(pageNo<totalPages)
  updatePageNumber(++pageNo);
}



console.log("Numar useri: " +responseLength,"Numar pagina: "+pageNo,"Useri pe pagina: " +pageSize,"Nr utilizatori curenti: "+nrCurrentUsers)


return (
  <>
    <ul className="list-style-none flex">
      <li
        onClick={(e) => {
          e.preventDefault();
          getPreviousPage();
        }}
      >
        <div className="mr-1 relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine">
          Previous
        </div>
      </li>

      {Array(totalPages)
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
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine ${
                index + 1 === pageNo ? 'current-page' : ''
              }`}
            >
              {index + 1}
            </div>
          </li>
        ))}

      <li onClick={(e) => {e.preventDefault()
        getNextPage()
      }}>
        <div className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-white dark:hover:text-blue-marine">
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

export default Pagination