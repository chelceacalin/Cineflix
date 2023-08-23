import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
} from "@mui/material";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
axios.defaults.withCredentials = true;

function RentMovieModalView({
  isRentModalOpen,
  closeRentModal,
  title,
  director,
  owner,
}) {
    dayjs.extend(updateLocale)
    dayjs.updateLocale('en', {
        weekStart: 1
    })
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
              defaultValue={dayjs('2022-04-17')}
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
              <Button className="contained-button w-full" variant="contained">
                {" "}
                Rent
              </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RentMovieModalView;
