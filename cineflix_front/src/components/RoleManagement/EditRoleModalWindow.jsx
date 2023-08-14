import React,  { useState } from 'react'
import { Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/EditRoleModalWindow.css";
import axios from 'axios';

function EditRoleModalWindow({ isModalOpen, closeModal, name, firstName, lastName, role, email, username }) {
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

    const setValueFromOption = (event) => {
        const option = event.target.value;
        setSelectedOption(option);
    };

    const editUserRole = async () => {
        let url = 'http://localhost:8081/users/update/' + selectedOption;
        const { role, value } = event.target;

        try {
            setUserDTO(() => ({
                'username': username,
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'role': selectedOption
            }));
            const response = await axios.post(url, userDTO);
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
                        defaultValue={fullName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <TextField
                        id="outlined-read-only-input"
                        label="Email"
                        defaultValue={email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">Role</InputLabel>
                        <NativeSelect defaultValue={role}
                        onChange={setValueFromOption}
                        placeholder=''
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </NativeSelect>
                        <Button className="save" variant="contained" onClick={editUserRole}>Save</Button>
                        <Button className="cancel" variant="outlined" onClick={closeModal} >Cancel</Button>
                    </FormControl>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditRoleModalWindow