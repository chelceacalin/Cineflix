import React, {useState} from 'react'

function Pagination({pageNo, pageSize, totalPages, updateParentState}) {

return (
<>
<ul className="list-style-none flex">
          <li>
              <a
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  href="#">Previous</a>
          </li>

          {
           Array(totalPages).fill().map((page,index)=>{
                return  (
                <li key={index} onClick={() => {updateParentState(parseInt(index)+1)}}>
                <a
                    className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                    href="#">{index+1}</a>
            </li>)
            })
          }
         
          <li>
              <a
                  className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  href="#">Next</a>
          </li>
      </ul>
</>
  )
}

export default Pagination