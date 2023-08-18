import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/AddNewMovieModalWindow.css";
import axios from 'axios';

axios.defaults.withCredentials = true

function DeleteMovieModalView({ isModalOpen, closeModal, title, movieId, deleteMovie }) {



    const confirmToDelete = () => {
        let url = 'http://localhost:8081/movies/delete/' + selectedOption;

        try {
            setUserDTO(() => ({
                'username': username,
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'role': selectedOption
            }));
            const response = axios.post(url, userDTO).then(()=>{

                updateUser(userDTO);
                closeModal();
            });
        } catch (error) {
        }
    };

    return (
        <Dialog open={isModalOpen} onClose={closeModal}>
            <FontAwesomeIcon className="closeModalWindowButton" icon={faTimes} onClick={closeModal} />
            <DialogContent>
                <div className='mt-6'>
                    Are you sure you want to permanently delete this entry?
                </div>
                <div className='mt-4'>
                    <FormControl fullWidth>
                        <Button className="save" variant="contained" onClick={confirmToDelete}>Confirm</Button>
                        <Button className="cancel" variant="outlined" onClick={closeModal} >Cancel</Button>
                    </FormControl>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteMovieModalView