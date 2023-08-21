import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/DeleteMovieModalView.css";
import axios from 'axios';

axios.defaults.withCredentials = true

function DeleteMovieModalView({ isModalOpen, closeModal, title, movieId, deleteMovie }) {



    const confirmToDelete = () => {
        
    };

    return (
        <Dialog open={isModalOpen} onClose={closeModal}>
            <div className="overflow-x-hidden">
                <FontAwesomeIcon className="closeModalWindowButton" icon={faTimes} onClick={closeModal} />
                <DialogContent>
                <div className="w-64 break-normal text-center">
                    <p> Are you sure you want to permanently delete this entry?</p>
                </div>
                
                <div className="mt-2 mb-2">
                    <Button className="contained-button w-full" variant="contained" onClick={deleteMovie}>Yes</Button>
                </div>
                <div className="mb-2">
                    <Button className="outlined-button w-full" variant="outlined" onClick={closeModal} >Cancel</Button>
                </div>
                </DialogContent>
            </div>            
        </Dialog>
    );
}

export default DeleteMovieModalView