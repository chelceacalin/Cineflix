import React, { useRef } from 'react'
import { Button, Dialog, DialogContent, FormControl, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../RoleManagement/css/EditRoleModalWindow.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true

function EditRoleModalWindow({ isModalOpen, closeModal, id, name, updateCategory, setErrorMessage, errorMessage }) {
    const newNameRef = useRef();
    const editCategoryName = () => {
        let url = '/category/update/' + id;
        axios.post(url, {
            id: id,
            name: newNameRef.current.value
        }).then(response => {
            updateCategory({
                id: response.data.id,
                name: response.data.name,
            });
            closeModal();
        }).catch(error => {
            if (error.response) {
                const message = JSON.stringify(error.response.data).replace('"', '').replace('"', '');
                showToastError(message);
            }
        });
    };

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
        <Dialog fullWidth maxWidth={'sm'} open={isModalOpen} onClose={closeModal}>
            <FontAwesomeIcon
                className="absolute top-4 right-4 cursor-pointer"
                icon={faTimes}
                size="xl"
                onClick={closeModal}
            />
            <div className="w-full">
                <h2 className="header-title ml-6 mt-10">Edit category</h2>
            </div>
            <DialogContent>
                <div className='mt-5'>
                    <TextField
                        className="w-full"
                        id="outlined-read-only-input"
                        label="Name"
                        defaultValue={name}
                        inputRef={newNameRef}
                        InputProps={{
                            style: { fontFamily: "Sanchez" }
                        }}
                        InputLabelProps={{
                            style: { fontFamily: "Sanchez" }
                          }}
                    />
                </div>
                <div>
                    <FormControl fullWidth>
                        <div className='flex gap-x-2 mt-6'>
                            <div className="flex-1">
                                <Button className="contained-button w-full" variant="contained" onClick={editCategoryName}>Save</Button>
                            </div>
                            <div className="flex-1">
                                <Button className="outlined-button w-full" variant="outlined" onClick={closeModal} >Cancel</Button>
                            </div>
                        </div>
                    </FormControl>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditRoleModalWindow