import React from 'react'
import { Button, Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/EditRoleModalWindow.css";

function EditRoleModalWindow({ isModalOpen, closeModal, name, surname, role, email }) {
    const fullName = `${name} ${surname}`;

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
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>
                        <Button class="save" variant="contained">Save</Button>
                        <Button class="cancel" variant="outlined">Cancel</Button>
                    </FormControl>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditRoleModalWindow