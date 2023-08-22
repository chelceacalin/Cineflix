import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, DialogContent, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./css/DetailsMovieModalView.css";
import "./css/AddNewMovieModalWindow.css";
import axios from "axios";
import { Autocomplete } from "@mui/material";
axios.defaults.withCredentials = true;

function DetailsMovieModalView({
  isModalOpen,
  closeModal,
  defaultTitle,
  defaultDirector,
  defaultCategory,
  id,
  triggerRefresh,
  setTriggerRefresh,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [title, setTitle] = useState(defaultTitle);
  const [director, setDirector] = useState(defaultDirector);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(defaultCategory);

 

  const fetchMovieImage = async () => {
    try {
      const response = await axios.get(`/imagesByMovieID/${id}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "image/png" });
      const avatarUrl = URL.createObjectURL(blob);

      setSelectedImage(avatarUrl);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get(`/movies/${id}`).then((data) => {
      if (data.data.description.length > 0) {
        setDescription(data.data.description);
      }
    });
    fetchMovieImage();
  }, []);
  const validationChecks = [
    { condition: !title, message: "Title should not be empty!" },
    { condition: !director, message: "Director should not be empty!" },
    { condition: !description, message: "Description should not be empty!" },
  ];
  const handleImageBrowse = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedImageFile(file);
    }
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedImageFile(file);
    }
  };

  useEffect(()=>{
    let url=`/category`
    axios
    .get(url)
    .then((response) => {
      setAvailableCategories(response.data.content);
    })
    .catch((error) => {
      console.error(error);
    });
  },[])

 

  const validRequest = () => {
    for (const check of validationChecks) {
      if (check.condition) {
        showToast(check.message);
        return false;
      }
    }
    return true;
  };

  const handleSave = () => {
    if (validRequest()) {
      if (!category) {
        showToast("Category " + category + " does not exist ");
      } else {
        let finalCategory =  category;

        if (selectedImageFile) {
          const formData = new FormData();

          formData.append("image", selectedImageFile);

          axios
            .post(`/images/${id}`, formData)
            .then((response) => {
              if (response.status === 200) {
                showToast("Image uploaded successfully!", "bg-green-500");
              } else {
                showToast("Failed to upload image.");
              }
            })
            .catch((error) => {
              showToast("Error uploading image: " + error.message);
            });
        }

        let movie = {
          title: title,
          director: director,
          description: description,
          category: finalCategory,
        };

        axios
          .post(`/movies/${id}`, movie)
          .then((response) => {
            showToast("Movie edited successfully!", "bg-green-500");
            setTriggerRefresh(!triggerRefresh);
            closeModal();
          })
          .catch((err) => {
            showToast("Error editing movie: " + error.message);
          });
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
          <h2 className="header-title">Edit movie</h2>
        </div>
        <DialogContent className="modal-body">
          <div className="field-group">
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              className="input-field"
              defaultValue={title}
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
              defaultValue={director}
              onChange={(e) => {
                setDirector(e.target.value);
              }}
            />
          </div>
            <Autocomplete
              onChange={(e,value) => setCategory(value)}
              value={category}
              options={availableCategories.map((c)=> c.name)}
              
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params}  label="Category" />}
            />
          <div className="field-group">
            <label className="mb-4">Description</label>
          </div>
          <div className="field-group">
            <textarea
              placeholder=" Write a description for the movie..."
              required
              rows="3"
              className="textarea-field w-full border-2"
              defaultValue={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="field-group image-upload-field">
            <div className=" ">
              <h2 className="text-xl font-bold mb-4">Image Upload</h2>
              <div
                className="border-2 border-gray-400 p-4 rounded-lg mb-4"
                onDrop={handleImageDrop}
                onDragOver={(event) => event.preventDefault()}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
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
              className="inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white hoverColorDetails
                 "
              style={{ backgroundColor: "#1E1D5B", fontWeight: "bold" }}
            >
              Save
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="inline-block rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white 
             "
              style={{
                backgroundColor: "#BE2517",
                fontWeight: "bold",
                marginLeft: 15,
              }}
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

const showToast = (message, color = "bg-red-500") => {
  const toastType = color === "bg-green-500" ? toast.success : toast.error;

  toastType(message, {
    className: `${color} text-black p-4 rounded-lg`,
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default DetailsMovieModalView;