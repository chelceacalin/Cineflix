import React from 'react'
import {Dialog, DialogContent, TextField} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ViewMovieDetailsModalWindow({ isModalOpen, closeModal}) {
    return (
        <Dialog fullWidth maxWidth={'md'} open={isModalOpen} onClose={closeModal}>
            <FontAwesomeIcon className="closeModalWindowButton" icon={faTimes} onClick={closeModal} transform="right-380 up-25" size="6x"/>
            <DialogContent>
                <div>
                    <TextField
                        id="outlined-read-only-input"
                        label="Movie title"
                        defaultValue="Movie title"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-6'>
                    <TextField
                        id="outlined-read-only-input"
                        label="Director"
                        defaultValue="Director"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-6'>
                    <TextField
                        id="outlined-read-only-input"
                        label="Category"
                        defaultValue="Category"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-6'>
                    <TextField
                        id="outlined-read-only-input"
                        label="Description"
                        defaultValue="Description"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-6'>
                    <TextField
                        id="outlined-read-only-input"
                        label="Status"
                        defaultValue="Status"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-6'>
                    <TextField
                        id="outlined-read-only-input"
                        label="Owner"
                        defaultValue="Owner"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-6'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            defaultValue={dayjs('2022-04-17')}
                            disabled={true}
                        />
                    </LocalizationProvider>
                </div>
            </DialogContent>
        </Dialog>

    );
}

export default ViewMovieDetailsModalWindow;