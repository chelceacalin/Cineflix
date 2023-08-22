import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField }from '@mui/material'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
axios.defaults.withCredentials = true;

function RentMovieModalView({isRentModalOpen, closeRentModal}) {
  return (
    <Dialog open={isRentModalOpen} onClose={closeRentModal}>
        <FontAwesomeIcon className="closeModalWindowButton" icon={faTimes} onClick={closeRentModal}></FontAwesomeIcon>
        <DialogContent>
            You are renting Movie_title directed by Director_name from Owner_name. Please fill in the return date below and go pick up your movie from the physical shelf or the owner.
            <div className='mt-6'>
                <TextField
                label="name"
                />
            </div>
            <div className='mt-4'>
            <FormControl fullWidth>
                <div className="mt-2 mb-2">
                    <Button className="contained-button w-full" variant="contained"> Save</Button>
                </div>
                <div className="mb-2">
                    <Button className="outlined-button w-full" variant="outlined" onClick={closeRentModal} >Cancel</Button>
                </div>
            </FormControl>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default RentMovieModalView