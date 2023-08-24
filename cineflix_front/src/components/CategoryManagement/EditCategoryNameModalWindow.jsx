import React, { useRef } from 'react'
import { Button, Dialog, DialogContent, FormControl, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../RoleManagement/css/EditRoleModalWindow.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true

function EditCategoryNameModalWindow({ isModalOpen, closeModal, id, name, updateCategory, setErrorMessage, errorMessage }) {
    const newNameRef = useRef();
    const editCategoryName = () => {
        let url = '/category/update/' + id;

        if (newNameRef.current.value.charAt(0) != newNameRef.current.value.charAt(0).toUpperCase()){
            showToast("Name should start with an uppercase letter!");
            return;
        } 

        if (newNameRef.current.value.length == 1) {
            showToast("Name should have at least 2 characters!")
        }

        axios.post(url, {
            id: id,
            name: newNameRef.current.value
        }).then(response => {
            showToast("Category edited successfully!", "bg-green-500");
            updateCategory({
                id: response.data.id,
                name: response.data.name,
            });
            closeModal();
        }).catch(error => {
            if (error.response) {
                const message = JSON.stringify(error.response.data).replace('"', '').replace('"', '');
                showToast(message);
            }
        });
    };

    const showToast = (message, color = "bg-red-500") => {
        const toastType = color === "bg-green-500" ? toast.success : toast.error;
      
        toastType(message, {
          className: `${color} text-black p-4 rounded-lg`,
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

export default EditCategoryNameModalWindow