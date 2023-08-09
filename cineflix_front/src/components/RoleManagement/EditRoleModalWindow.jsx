import React from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function EditRoleModalWindow({ isModalOpen, closeModal }) {
    return (
        <Dialog open={isModalOpen} onClose={closeModal}>
            <DialogTitle>Modal Title</DialogTitle>
            <DialogContent>
                <p>This is the modal content.</p>
            </DialogContent>
        </Dialog>
    );
}

export default EditRoleModalWindow