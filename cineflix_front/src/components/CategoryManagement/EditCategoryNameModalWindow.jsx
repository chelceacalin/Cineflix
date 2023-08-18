import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/EditRoleModalWindow.css";
import axios from 'axios';

axios.defaults.withCredentials = true

function EditRoleModalWindow({ isModalOpen, closeModal, id, name, updateCategory }) {

    const [categoryDTO, setCategoryDTO] = useState({  
        name: ''
    });

    useEffect(() => {
        setCategoryDTO(() => ({
            'name': name,
        }))
    }, [name])

    const editCategoryName = () => {
        let url = 'http://localhost:8081/category/update/' + id;

        try {
            setCategoryDTO(() => ({
                'name': name,
            }));
            const response = axios.post(url, categoryDTO).then(()=>{

                updateCategory(categoryDTO);
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
                    <TextField
                        id="outlined-read-only-input"
                        label="Name"
                        defaultValue={name}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <TextField
                        id="outlined-read-only-input"
                        label="New Name"
                        defaultValue={""}
                    />
                </div>
                <div className='mt-4'>
                    <FormControl fullWidth>
                        <div className="mt-2 mb-2">
                        <Button className="contained-button w-full" variant="contained" onClick={editCategoryName}>Save</Button>
                        </div>
                        <div className="mb-2">
                            <Button className="outlined-button w-full" variant="outlined" onClick={closeModal} >Cancel</Button>
                        </div>
                    </FormControl>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditRoleModalWindow