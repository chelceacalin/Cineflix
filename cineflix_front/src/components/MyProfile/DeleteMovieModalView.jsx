import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/DeleteMovieModalView.css";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

axios.defaults.withCredentials = true

function DeleteMovieModalView({ isModalOpen, closeModal, title, category, id, rentedBy, setTriggerRefresh, triggerRefresh}) {
    const [requestError, setRequestError] = useState(false);

    const deleteMovie = () => {
        let url = `/movies/delete/${id}`;

            axios.post(url).then(() => {
                setTriggerRefresh(!triggerRefresh);
                closeModal();
                setRequestError(false);
            })
            .catch((error) => {
                showToastError(error.response.data)
                
            })
    }

    const showToastError = (message) => {
        toast.error(message, {
          className: "bg-red-500 text-black p-4 rounded-lg mr-4 w-98",
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    };

    return (
        <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth={'sm'}>
            <div className="overflow-x-hidden">
                <FontAwesomeIcon style={{fontSize: 28}} className="closeModalWindowButton mb-6" icon={faTimes} onClick={closeModal} transform="right-185 up-2" size="6x" />
                <DialogContent>
                <div className="w-full break-normal text-center mb-5">
                    <p> Are you sure you want to delete this movie?</p>
                </div>
                
                <div className="mt-2 mb-2 pl-5 pr-5">
                    <Button className="contained-button w-full" variant="contained" onClick={deleteMovie}>Yes</Button>
                </div>
                <div className="mb-2 pl-5 pr-5">
                    <Button className="outlined-button w-full" variant="outlined" onClick={closeModal} >Cancel</Button>
                </div>
                </DialogContent>
            </div>            
            <ToastContainer />
        </Dialog>
    );
}

export default DeleteMovieModalView