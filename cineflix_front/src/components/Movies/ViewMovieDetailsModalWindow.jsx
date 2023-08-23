import React from 'react'
import {Box, Button, Card, CardMedia, Dialog, DialogContent, Grid, TextField} from "@mui/material";
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
            <div className="w-full">
                <h2 className="header-title ml-6 mb-8 text-2xl">Movie details</h2>
            </div>
            <DialogContent>
                <Grid container spacing={0}>
                    <Grid item xs={5}>
                        <div className='ml-20'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Movie title"
                                defaultValue="Movie title"
                                sx={{
                                    width: { md: 300 },
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
                        <div className='mt-6 ml-20'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Director"
                                defaultValue="Director"
                                sx={{
                                    width: { md: 300 },
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
                        <div className='mt-6 ml-20'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Category"
                                defaultValue="Category"
                                sx={{
                                    width: { md: 300 },
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
                        <div className='mt-6 ml-20'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Description"
                                defaultValue="Description"
                                multiline={true}
                                sx={{
                                    width: { md: 300 },
                                }}
                                rows={7}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontFamily: "Sanchez" }
                                }}
                                InputLabelProps={{
                                    style: { fontFamily: "Sanchez" }
                                }}
                            />
                        </div>
                        <div className='mt-6 ml-20'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Status"
                                sx={{
                                    width: { md: 300 },
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
                        <div className='ml-28'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Owner"
                                defaultValue="Owner"
                                sx={{
                                    width: { md: 300 },
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
                        <div className='mt-6 ml-28'>
                            <Card variant="outlined" sx={{  width: {
                                    sx: 1.0,
                                    sm: 150,
                                    md: 300
                                },
                                height: {
                                    sx: 1.0,
                                    sm: 150,
                                    md: 195
                                }}}>
                                <CardMedia
                                    sx={{ height: '100%',
                                        backgroundSize: 'contain'
                                }}
                                    image="https://media.istockphoto.com/id/911590226/vector/movie-time-vector-illustration-cinema-poster-concept-on-red-round-background-composition-with.jpg?s=612x612&w=0&k=20&c=QMpr4AHrBgHuOCnv2N6mPUQEOr5Mo8lE7TyWaZ4r9oo="
                                />
                            </Card>
                        </div>
                        { isAvailable && (
                        <div className='mt-6 ml-28'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={<span style={{ fontFamily: "Sanchez" }}>Rented on</span>}

                                    defaultValue={dayjs('2022-04-17')}
                                    slotProps={{textField: { inputProps: {
                                                style: { fontFamily: "Sanchez" },
                                                }}
                                            }}

                                    sx={{
                                        width: { md: 300 }
                                    }}
                                    format="LL"
                                    disabled={true}

                                />
                            </LocalizationProvider>
                        </div>
                            )}
                        { isAvailable && (
                        <div className='mt-6 ml-28'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={<span style={{ fontFamily: "Sanchez" }}>Rented until</span>}
                                    defaultValue={dayjs('2024-01-17')}
                                    slotProps={{textField: { inputProps: {
                                                style: { fontFamily: "Sanchez" },
                                            }}
                                    }}
                                    sx={{
                                        width: { md: 300 },
                                    }}
                                    format="LL"
                                    disabled={true}
                                />
                            </LocalizationProvider>
                        </div>
                        )}
                        { isAvailable && (
                        <div className='mt-6 ml-28 mb-24'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Rented by"
                                defaultValue="Rented by"
                                sx={{
                                    width: { md: 300 },
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