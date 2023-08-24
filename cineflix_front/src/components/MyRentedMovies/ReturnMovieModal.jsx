import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/ReturnMovieModal.css";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

axios.defaults.withCredentials = true

function ReturnMovieModal({ isModalOpen, closeModal, title, id, setTriggerRefresh, triggerRefresh}) {
    const [requestError, setRequestError] = useState(false);

    const updateMovieStatus = () => {
        let url = `/movies/updateStatus/${id}`;

            axios.post(url).then(() => {
                setTriggerRefresh(!triggerRefresh);
                closeModal();
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
                    <p> Please note that you need to return the movie to the owner!</p>
                </div>
                
                <div className='flex gap-x-2'>
                    <div className="flex-1">
                        <Button className="contained-button w-full" variant="contained" onClick={updateMovieStatus}>Ok</Button>
                    </div>
                    <div className="flex-1">
                        <Button className="outlined-button w-full" variant="outlined" onClick={closeModal}>Cancel</Button>
                    </div>
                </div>
                </DialogContent>
            </div>            
            <ToastContainer />
        </Dialog>
    );
}

export default ReturnMovieModal