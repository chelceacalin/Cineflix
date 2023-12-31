import React, {useEffect, useState} from 'react'
import {Box, Button, Card, CardMedia, Dialog, DialogContent, Grid, TextField} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import dayjs from "dayjs";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import axios from "axios";


function ViewMovieDetailsModalWindow({isModalOpen, closeModal,title,
                                         category,
                                         director,isAvailable, rentedUntil, rentedBy, owner_username, rentedDate, id, description}) {

    const STATUS_AVAILABLE = 'Available';
    const STATUS_UNAVAILABLE = 'Unavailable';
    var status;

    if(isAvailable) {
        status = STATUS_AVAILABLE;
    } else {
        status = STATUS_UNAVAILABLE;
    }
    const [selectedImage, setSelectedImage] = useState(null);
    const [owner, setOwner] = useState("");
    const fetchMovieImage = async () => {
        try {
            const response = await axios.get(`/imagesByMovieID/${id}`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "image/png" });
            const avatarUrl = URL.createObjectURL(blob);

            setSelectedImage(avatarUrl);
        } catch (error) {
        }
    };
    useEffect(() => {
        fetchMovieImage();
    }, []);



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
                                defaultValue={title}
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
                                defaultValue={director}
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
                                defaultValue={category}
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
                                defaultValue={description}
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
                        <div className='mt-6 ml-20 mb-24'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Status"
                                sx={{
                                    width: { md: 300 },
                                }}
                                defaultValue={status}
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
                                defaultValue={owner_username}
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
                                 image = {selectedImage}
                                 component='div'
                                />
                            </Card>

                        </div>
                        { !isAvailable && (
                        <div className='mt-6 ml-28'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={<span style={{ fontFamily: "Sanchez" }}>Rented on</span>}

                                    defaultValue={dayjs(rentedDate)}
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
                        { !isAvailable && (
                        <div className='mt-6 ml-28'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label={<span style={{ fontFamily: "Sanchez" }}>Rented until</span>}
                                    defaultValue={dayjs(rentedUntil)}
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
                        { !isAvailable && (
                        <div className='mt-6 ml-28'>
                            <TextField
                                id="outlined-read-only-input"
                                label="Rented by"
                                defaultValue={rentedBy}
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