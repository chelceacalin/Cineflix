import { useState, useEffect } from 'react'
import {
    Autocomplete,
    Button,
    Dialog,
    DialogContent,
    TextField
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/EditRoleModalWindow.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import * as moreClasses from "react-dom/test-utils";

axios.defaults.withCredentials = true

// eslint-disable-next-line react/prop-types
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

    const roles=[
        'ADMIN','USER'
    ]

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

        setUserDTO(() => ({
            'username': username,
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'role': selectedOption
        }));
        axios
            .post(url, userDTO)
            .then(() => {
                showToast("User edited successfully!", "bg-green-500");
                updateUser(userDTO);
                closeModal();
        })
        .catch (error => {
            showToast("Error editing user: " + error.message);
        })
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
                    <Autocomplete
                        sx={{ fontFamily: "Sanchez" }}
                        value={selectedOption}
                        onChange={(e, value) => {
                            setSelectedOption(value)
                        }
                    }
                        ListboxProps={{
                            style:{ fontFamily: "Sanchez" }
                        }}
                        options={roles}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputProps={{
                                    ...params.InputProps, ...moreClasses.input,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                sx={{ fontFamily: "Sanchez" }}
                                label="Role"/>}
                    />
                <div className='flex gap-x-2 mt-6'>
                    <div className="flex-1">
                        <Button className="contained-button w-full" variant="contained" onClick={editUserRole}>Save</Button>
                    </div>
                    <div className="flex-1">
                        <Button className="outlined-button w-full" variant="outlined" onClick={closeModal} >Cancel</Button>
                    </div>
                </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

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

export default EditRoleModalWindow