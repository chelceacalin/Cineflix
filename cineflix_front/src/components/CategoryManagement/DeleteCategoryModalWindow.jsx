import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Dialog, DialogContent } from '@mui/material'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true

function DeleteCategoryModalWindow({ isEditModalOpen, closeEditModal, name, signal }) {
    
    const deleteCategory = () => {
        let url = 'http://localhost:8081/category/delete/' + name;

        try {
            const response = axios.post(url).then(() => {
                signal();
                closeEditModal();
            })
        } catch (error) {

        }
    }
    
    return (
        <Dialog open={isEditModalOpen} onClose={closeEditModal}>
            <div className="overflow-x-hidden">
                <FontAwesomeIcon className="relative top-3 left-64" icon={faTimes} onClick={closeEditModal} />
                <DialogContent>
                    <div className="w-64 break-normal text-center">
                        <p> Are you sure you want to permanently remove &nbsp;
                            <span className="font-bold">
                                {name}
                            </span>
                            &nbsp; category ?
                        </p>
                        <div className="mt-2 mb-2">
                            <Button className="contained-button w-full" variant="contained" onClick={deleteCategory}>Yes</Button>
                        </div>
                        <div className="mb-2">
                            <Button className="outlined-button w-full" variant="outlined" onClick={closeEditModal} >Cancel</Button>
                        </div>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    )
}

export default DeleteCategoryModalWindow