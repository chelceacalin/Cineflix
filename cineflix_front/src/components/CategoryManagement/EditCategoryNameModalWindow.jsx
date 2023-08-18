import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "../RoleManagement/css/EditRoleModalWindow.css";
import axios from 'axios';

axios.defaults.withCredentials = true

function EditRoleModalWindow({ isModalOpen, closeModal, id, name, updateCategory}) {
    const [newName, setNewName]=useState(name);
    const [categoryDTO, setCategoryDTO] = useState({  
        name: '',
        id: ''
    });

    useEffect(() => {
        setCategoryDTO(() => ({
            'name': newName,
            'id': id
        }))
    }, [name, newName])

    const editCategoryName = () => {
        let url = 'http://localhost:8081/category/update/' + id;
        console.log(newName);
        try {
            setCategoryDTO(() => ({
                'name': newName,
                'id': id
            }));
            const response = axios.post(url, categoryDTO).then(()=>{
                console.log("AICI");
                updateCategory(categoryDTO);
                closeModal();
            }).catch(error => {
                console.log("error: ", error.response.data);
            });
        } catch (error) {
            console.log(error);
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
                        onChange={(e) => setNewName(e.target.value)}
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