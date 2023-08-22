import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/EditRoleModalWindow.css";
import axios from 'axios';

axios.defaults.withCredentials = true

function EditRoleModalWindow({ isModalOpen, closeModal, name, firstName, lastName, role, email, username, updateUser }) {
    const fullName = `${name}`;
    const [roles, setRole] = useState(role);
    const [selectedOption, setSelectedOption] = useState(role);

    const [userDTO, setUserDTO] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        setUserDTO(() => ({
            'username': username,
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'role': selectedOption
        }))
    }, [role, selectedOption])

    const editUserRole = () => {
        let url = '/users/update/' + selectedOption;

        try {
            setUserDTO(() => ({
                'username': username,
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'role': selectedOption
            }));
            const response = axios.post(url, userDTO).then(() => {

                updateUser(userDTO);
                closeModal();
            });
        } catch (error) {
        }
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
                <h2 className="header-title ml-6 mt-10">Edit user role</h2>
            </div>
            <DialogContent>
                <div className='mt-5'>
                    <TextField
                        id="outlined-read-only-input"
                        className="w-full"
                        label="Name"
                        defaultValue={fullName}
                        InputProps={{
                            readOnly: true,
                            style: { fontFamily: "Sanchez" }
                        }}
                        InputLabelProps={{
                            style: { fontFamily: "Sanchez" }
                          }}
                    />
                </div>
                <div className='mt-4 mb-4'>
                    <TextField
                        id="outlined-read-only-input"
                        className="w-full"
                        label="Email"
                        defaultValue={email}
                        InputProps={{
                            readOnly: true,
                            style: { fontFamily: "Sanchez" }
                        }}
                        InputLabelProps={{
                            style: { fontFamily: "Sanchez" }
                          }}
                    />
                </div>
                <div className='mt-6'>
                    <FormControl fullWidth>
                        <InputLabel 
                            variant="standard" 
                            htmlFor="uncontrolled-native"> Role </InputLabel>
                        <NativeSelect defaultValue={role}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            placeholder=''
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </NativeSelect>
                        <div className="mt-6 mb-2">
                            <Button className="contained-button w-full" variant="contained" onClick={editUserRole}>Save</Button>
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