import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

axios.defaults.withCredentials = true;

function CreateCategoryModalWindow({ isModalOpen, closeModal, signal }) {
  const [categoryDTO, setCategoryDTO] = useState("");

  const createCategory = () => {
    let url = "http://localhost:8081/category/create";
    axios.post(url, { name: categoryDTO }).then(() => {
      signal();
      closeModal();
    });
  };

  return (
    <Dialog open={isModalOpen} onClose={closeModal}>
      <FontAwesomeIcon
        className="closeModalWindowButton"
        icon={faTimes}
        onClick={closeModal}
      />
      <DialogContent>
        <div className="mt-6">
          <TextField
            id="outlined-read-only-input"
            label="Name"
            onChange={(e) => {
              setCategoryDTO(e.target.value);
            }}
          />
        </div>
        <div className="mt-2 mb-2">
          <Button
            className="contained-button w-full"
            variant="contained"
            onClick={createCategory}
          >
            Add
          </Button>
        </div>
        <div className="mb-2">
          <Button
            className="outlined-button w-full"
            variant="outlined"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryModalWindow;
