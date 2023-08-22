import React from 'react'
import Button from "@mui/material/Button";
import ViewMovieDetailsModalWindow from "./ViewMovieDetailsModalWindow.jsx";

function Movies() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className='ml-1'>
            MOVIES
            <div>
            <Button onClick={handleOpen} className="outlined-button font-normal py-2 px-6" variant="outlined">
                Edit
            </Button>
                <ViewMovieDetailsModalWindow
                    isModalOpen={open}
                    closeModal={handleClose}
                />
                </div>
        </div>
    )
}

export default Movies;
