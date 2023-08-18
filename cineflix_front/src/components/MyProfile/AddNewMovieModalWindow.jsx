import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./css/AddNewMovieModalWindow.css";
import axios from 'axios';

axios.defaults.withCredentials = true

function AddNewMovieModalWindow({ isModalOpen, closeModal, title, director, category, addMovie}) {

    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [movieDTO, setMovieDTO] = useState({
        title: '',
        director: '',
        category: '',
        isAvailable: '',
        description: '',
        photo: ''
    });

    useEffect(() => {
        setMovieDTO(() => ({
            'title': title,
            'director': director,
            'category': category,
            'description': description,
            'photo': photo
        }))
    }, [title, director, category, description, photo])

    const addNewMovie = () => {
        let url = 'http://localhost:8081/movies/add/' + title;

        try {
            setMovieDTO(() => ({
                'title': title,
                'director': director,
                'category': category,
                'description': description,
                'photo': photo
            }));
            const response = axios.post(url, movieDTO).then(()=>{

                addMovie(movieDTO);
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
                        label="Title"
                        defaultValue={title}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <TextField
                        id="outlined-read-only-input"
                        label="Director"
                        defaultValue={director}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <TextField
                        id="outlined-read-only-input"
                        label="Category"
                        defaultValue={category}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <label>Description</label>
                    <div>
                        <textarea
                            className="border border-dashed border-1 border-gray-400 p-2"
                            id="outlined-read-only-input"
                            placeholder='Write a description for the movie...'
                            required
                            rows="5"
                            cols="15"
                            defaultValue={description}
                        />
                    </div>
                </div>
                <label>Photo</label>
                <div className='mt-4 w-150 h-40 border-2 border-black'>                    
                    <div>
                        <span>Add new image</span>
                    </div>
                </div>
                <div className='mt-4'>
                    <FormControl fullWidth>
                        <Button className="save" variant="contained" onClick={addNewMovie}>Save</Button>
                        <Button className="cancel" variant="outlined" onClick={closeModal} >Cancel</Button>
                    </FormControl>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddNewMovieModalWindow