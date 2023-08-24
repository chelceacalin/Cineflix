import React from 'react'

function RentedMovie({title,director,category}) {
  return (
    <>
    <div>
        <li>
    Category: {title}
    </li>
    <li>
    DIrector: {director}
    </li>
    <li>Category: {category}</li>
    </div>
    </>
  )
}

export default RentedMovie