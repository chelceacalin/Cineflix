import React, { useState }  from 'react'
import { Button } from "@mui/material";
import RentMovieModalView from './RentMovieModalView';
import axios from 'axios';
axios.defaults.withCredentials = true;
function Movies() {
  const [isRentModalOpen, setRentModalOpen] = useState(false);

  const handleOpenRentModal = () => {
    console.log("hello")
    setRentModalOpen(true);
}

  const handleCloseRentModal = () => {
    setRentModalOpen(false);
}


  return (
    <div className='ml-1'>
      <Button onClick={handleOpenRentModal}>Rent Movie</Button>
      <RentMovieModalView
      isRentModalOpen={isRentModalOpen}
      closeRentModal={handleCloseRentModal}
      />
    </div>
  )
}

export default Movies;
