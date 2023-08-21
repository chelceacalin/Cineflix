import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./css/AddNewMovieModalWindow.css";
import axios from "axios";

axios.defaults.withCredentials = true;

function AddNewMovieModalWindow({ isModalOpen, closeModal }) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [owner_username, setOwnerUsername] = useState("adminusername");
  const validationChecks = [
    { condition: !title, message: "Title should not be empty!" },
    { condition: !director, message: "Director should not be empty!" },
    {
      condition:
        availableCategories.length === 0 ||
        (availableCategories.length > 0 &&
          availableCategories[0].name !== categorySelect),
      message: "Invalid category name!",
    },
    { condition: !description, message: "Description should not be empty!" },
  ];
  useEffect(() => {
    let url = `http://localhost:8081/category?name=${category}`;
    axios
      .get(url)
      .then((response) => {
        setAvailableCategories(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  const handleImageBrowse = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedImage(file);
  };

  const resetForm = () => {
    setTitle("");
    setDirector("");
    setDescription("");
    setCategory("");
    setCategorySelect("");
    setSelectedImage(null);
  };

  const validRequest = () => {
    for (const check of validationChecks) {
      if (check.condition) {
        showToastError(check.message);
        return false;
      }
    }
    return true;
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

  const handleSave = () => {
    if (validRequest() == true) {
      let urlAddMovie = `http://localhost:8081/movies`;
      let movie = {
        title: title,
        director: director,
        description: description,
        isAvailable: true,
        category: categorySelect,
        owner_username: owner_username,
      };

      if (selectedImage) {
        axios
          .post(urlAddMovie, movie)
          .then((data) => {
            if (data.data) {
              let urlAddMovieImage = `http://localhost:8081/images/${data.data.id}`;
              const formData = new FormData();
              formData.append("image", selectedImage);
              axios
                .post(urlAddMovieImage, formData)
                .then((response) => {
                })
                .catch((error) => {
                  console.error("eroare " + error);
                });
            } else {
              console.error("Movie does not exist");
            }

            resetForm();
          })
          .catch((err) => {
            console.error(err);
          });

        closeModal();
      } else {
        showToastError("Image should not be empty! ");
      }
    }
  };
  return (
    <Dialog open={isModalOpen} onClose={closeModal}>
      <div className="modal-content wider-modal">
        <div className="header-container">
          <FontAwesomeIcon
            className="close-modal-button w-10 h-6 ml-4"
            icon={faTimes}
            onClick={closeModal}
          />
          <h2 className="header-title">Add new movie</h2>
        </div>
        <DialogContent className="modal-body">
          <div className="field-group">
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              className="input-field"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="field-group">
            <TextField
              label="Director"
              variant="outlined"
              fullWidth
              className="input-field"
              onChange={(e) => {
                setDirector(e.target.value);
              }}
            />
          </div>
          <div className="field-group">
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              className="input-field"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />

            <select
              className="input-field mt-2"
              onChange={(e) => {
                setCategorySelect(e.target.value);
              }}
            >
              <option value="">Select Category</option>
              {availableCategories &&
                availableCategories.slice(0, 7).map((categoryOption) => (
                  <option key={categoryOption.id} value={categoryOption.name}>
                    {categoryOption.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="field-group">
            <label className="mb-4">Description</label>
          </div>
          <div className="field-group">
            <textarea
              placeholder=" Write a description for the movie..."
              required
              rows="3"
              className="textarea-field w-full border-2"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="field-group image-upload-field">
            <div className=" ">
              <h2 className="text-xl font-bold mb-4">Image Upload</h2>
              <div
                className=" border-2 border-gray-400 p-4 rounded-lg mb-4"
                onDrop={handleImageDrop}
                onDragOver={(event) => event.preventDefault()}
              >
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="w-40 h-40 object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-500">
                    Drop or Browse to select an image
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageBrowse}
                className="mb-4"
              />
            </div>
          </div>
          <div className="modal-footer mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] "
              style={{ backgroundColor: "blue", fontWeight: "bold" }}
            >
              Save
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] "
              style={{ backgroundColor: "red", fontWeight: "bold" ,marginLeft:15}}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </div>
      <ToastContainer />
    </Dialog>
  );
}

export default AddNewMovieModalWindow;