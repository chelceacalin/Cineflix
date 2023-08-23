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
import { DateTime, Settings } from 'luxon';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
axios.defaults.withCredentials = true;

function RentMovieModalView({
  isRentModalOpen,
  closeRentModal,
  title,
  director,
  owner,
}) {
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
        transform="right-380 up-25"
        size="6x"
      ></FontAwesomeIcon>
      <DialogContent>
        You are renting {title} directed by {director} from {owner}. 
        <p>Please fill
        in the return date below and go pick up your movie from the physical
        shelf or the owner.</p>
        <div className="">
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <DatePicker
              label={<span style={{ fontFamily: "Sanchez" }}>Return date</span>}
              defaultValue={DateTime.fromISO({ zone: 'UTC' })}
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
        <div className="mt-4">
          <FormControl fullWidth>
            <div className="mt-2 mb-2">
              <Button className="contained-button w-full" variant="contained">
                {" "}
                Rent
              </Button>
            </div>
            <div className="mb-2">
              <Button
                className="outlined-button w-full"
                variant="outlined"
                onClick={closeRentModal}
              >
                Cancel
              </Button>
            </div>
          </FormControl>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RentMovieModalView;
