import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog, DialogContent } from '@mui/material'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true

function DeleteCategoryModalWindow({ isEditModalOpen, closeEditModal, name, id, signal }) {
    const [requestError, setRequestError] = useState("");

    const deleteCategory = () => {
        let url = '/category/delete/' + id;

            axios.post(url).then(() => {
                signal();
                closeEditModal();
                setRequestError(false);
            })
            .catch((error) => {
                if (error.response) {
                    showToastError("This category has been already deleted by another user!");
                    setRequestError("This category contains movies");
                }
            })
    }

    const showToastError = (message) => {
        toast.error(message, {
          className: "bg-red-500 text-black p-4 rounded-lg",
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
        <Dialog open={isEditModalOpen} onClose={closeEditModal}>
            <div className="overflow-x-hidden">
                <FontAwesomeIcon className="relative top-3 left-64" icon={faTimes} onClick={closeEditModal} />
                <DialogContent>
                    <div className="w-64 break-normal text-center">
                        <p> Are you sure you want to permanently remove &nbsp;
                            <span className="font-bold">
                                {name}
                            </span>
                            &nbsp; category ?
                        </p>
                        <div className="mt-2 mb-2">
                            <Button className="contained-button w-full" variant="contained" onClick={deleteCategory}>Yes</Button>
                        </div>
                        <div className="mb-2">
                            <Button className="outlined-button w-full" variant="outlined" onClick={()=>{
                                setRequestError("");
                                closeEditModal();
                            }} >Cancel</Button>
                        </div>
                    </div>
                </DialogContent>
            </div>
            <ToastContainer />
        </Dialog>
    )
}

export default DeleteCategoryModalWindow