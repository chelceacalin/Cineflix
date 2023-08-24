import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { ToastContainer, toast } from "react-toastify";
axios.defaults.withCredentials = true;

function RentMovieModalView({
  isRentModalOpen,
  closeRentModal,
  title,
  director,
  owner,
  id,
  signal,

}) {
    dayjs.extend(updateLocale)
    dayjs.updateLocale('en', {
        weekStart: 1
    })
    const today = dayjs();
    const maxDate = today.add(14, "day");

    const [idUser, setIdUser] = useState("");
    const [date, setDate] = useState(new Date());

    const showToast = (message, color = "bg-red-500") => {
      const toastType = color === "bg-green-500" ? toast.success : toast.error;
    
      toastType(message, {
        className: `${color} text-black p-4 rounded-lg`,
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    useEffect(() => {
      const url = '/users/' + owner;
      axios.get(url).then((elems) => {
        setIdUser(elems.data.id);
      });
  
    }, []);


    const rentMovie = () =>{
      const url = '/movies/history';
      axios.post(url, {
        rentedDate: today,
        rentedUntil: date,
        movieId: id,
        userId: idUser
      }).then(response =>{
        signal();
        closeRentModal();
      }).catch((error) => {
        if(error.response){
          const message = JSON.stringify(error.response.data).replace('"', '').replace('"', '');
          showToast(message);
          closeRentModal();
        }
    })
    };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      open={isRentModalOpen}
      onClose={closeRentModal}
    >
      <FontAwesomeIcon
        className="closeModalWindowButton"
        icon={faTimes}
        onClick={closeRentModal}
        transform="right-630 grow-6"
      ></FontAwesomeIcon>
      <DialogContent>
      <p className="text-center">
        You are renting <span className="font-bold"> {title} </span>
        directed by <span className="font-bold"> {director} </span> from 
        <span className="font-bold"> {owner}</span>.</p> 
        <p className="text-center">Please fill in the return date below and go pick up your movie from the physical shelf or the owner.</p>
        <div className = "text-center pt-14">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={<span style={{ fontFamily: "Sanchez" }}>Return date</span>}
              defaultValue={dayjs()}
              minDate={today}
              maxDate={maxDate}
              slotProps={{
                textField: {
                  inputProps: {
                    style: { fontFamily: "Sanchez" },
                  },
                },
              }}
              sx={{
                width: { md: 259 },
              }}
              disabled={false}
              selected={date} 
              onChange={date => setDate(date)}
            />
          </LocalizationProvider>
        </div>
        <div className="pt-14 flex w-full">
            <div className="px-2 w-1/2">
              <Button
                className="outlined-button w-full"
                variant="outlined"
                onClick={closeRentModal}
              >
                Cancel
              </Button>
            </div>
            <div className="px-2 w-1/2">
              <Button className="contained-button w-full" variant="contained" onClick={rentMovie}>
                Rent
              </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RentMovieModalView;
