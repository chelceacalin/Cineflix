import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  makeStyles,
  TextField,
} from "@mui/material";
import axios from "axios";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.withCredentials = true;

function CreateCategoryModalWindow({
  isModalOpen,
  closeModal,
  signal,
  setErrorMessage,
  errorMessage,
}) {
  const [categoryDTO, setCategoryDTO] = useState("");

  const createCategory = () => {
    if (categoryDTO.length < 2) {
      showToastError("Category should have more than 2 characters!");
    } else if (categoryDTO.charAt(0)!==categoryDTO.charAt(0).toUpperCase()) {
      showToastError("Category should start with an uppercase letter!");
    } else {
      let url = "/category/create";
      axios
        .post(url, {
          name: categoryDTO,
        })
        .then(() => {
          signal();
          closeModal();
          setCategoryDTO("");
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(error.response.data);
          }
        });
    }
  };

  const showToastError = (message) => {
    toast.error(message, {
      className: "bg-red-500 text-black p-4 rounded-lg",
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
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
            defaultValue=""
            onChange={(e) => {
              setCategoryDTO(e.target.value);
            }}
          />
        </div>
        <div className="text-basic-red font-bold w-52 text-center">
          {errorMessage}
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
            onClick={() => {
              setCategoryDTO("");
              closeModal();
            }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
}

export default CreateCategoryModalWindow;
