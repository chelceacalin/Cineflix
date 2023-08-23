import React from 'react'
import {Box, Button, Dialog, DialogContent, Grid, TextField} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import dayjs from "dayjs";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';


function ViewMovieDetailsModalWindow({isModalOpen, closeModal}) {
    var status = "unavailable";
    const AVAILABLE = "unavailable";
    var isAvailable = false;
    if(status == AVAILABLE) {
        isAvailable = true;
    } else {
        isAvailable = false;
    }
    return (
        <Dialog fullWidth maxWidth={'md'} open={isModalOpen} onClose={closeModal}>
            <FontAwesomeIcon className="closeModalWindowButton" icon={faTimes} onClick={closeModal}
                             transform="right-380 up-25" size="6x"/>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <div className='ml-24'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Movie title"
                                defaultValue="Movie title"
                                sx={{
                                    width: { md: 259 },
                                }}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                            />
                        </div>
                        <div className='mt-6 ml-24'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Director"
                                defaultValue="Director"
                                sx={{
                                    width: { md: 259 },
                                }}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                            />
                        </div>
                        <div className='mt-6 ml-24'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Category"
                                defaultValue="Category"
                                sx={{
                                    width: { md: 259 },
                                }}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                            />
                        </div>
                        <div className='mt-6 ml-24'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Description"
                                defaultValue="Description"
                                multiline={true}
                                sx={{
                                    width: { md: 259 },
                                }}
                                rows={6}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                            />
                        </div>
                        <div className='mt-6 ml-24'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Status"
                                sx={{
                                    width: { md: 259 },
                                }}
                                defaultValue="Status"
                                InputProps={{
                                    readOnly: true,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className='ml-32'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Owner"
                                defaultValue="Owner"
                                sx={{
                                    width: { md: 259 },
                                }}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                            />
                        </div>
                        <div className='mt-6 ml-32'>
                            <Box
                                component="img"
                                sx={{
                                    maxHeight: {md: 173},
                                    maxWidth: {md: 270},
                                }}
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                            />
                        </div>
                        { isAvailable && (
                        <div className='mt-6 ml-32'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={<span style={{ fontFamily: "Sanchez" }}>Rented on</span>}

                                    defaultValue={dayjs('2022-04-17')}
                                    slotProps={{textField: { inputProps: {
                                                style: { fontFamily: "Sanchez" },
                                                }}
                                            }}

                                    sx={{
                                        width: { md: 259 }
                                    }}
                                    format="LL"
                                    disabled={true}

                                />
                            </LocalizationProvider>
                        </div>
                            )}
                        { isAvailable && (
                        <div className='mt-6 ml-32'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={<span style={{ fontFamily: "Sanchez" }}>Rented until</span>}
                                    defaultValue={dayjs('2024-01-17')}
                                    slotProps={{textField: { inputProps: {
                                                style: { fontFamily: "Sanchez" },
                                            }}
                                    }}
                                    sx={{
                                        width: { md: 259 },
                                    }}
                                    format="LL"
                                    disabled={true}
                                />
                            </LocalizationProvider>
                        </div>
                        )}
                        { isAvailable && (
                        <div className='mt-6 ml-32'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Rented by"
                                defaultValue="Rented by"
                                sx={{
                                    width: { md: 259 },
                                }}
                                format="LL"
                                InputProps={{
                                    readOnly: true,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                            />
                        </div>
                            )}

                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>

    );
}

export default ViewMovieDetailsModalWindow;