import React, { useEffect } from "react";
import Button from '@mui/material/Button';

import EditRoleModalWindow from "./EditRoleModalWindow";

function UserCineflix({ name, firstName, lastName, role, email, username, classes,updateUser }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <tr key={name}>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal max-w-[200px]">
          {name}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal max-w-[200px]">
              <span value="User" className="font-bold">{role}</span>
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {email}
        </div>
      </td>
      <td className={classes}>
        <div>
          <Button onClick={handleOpen} className="outlined-button font-normal py-2 px-6" variant="outlined">
            Edit
          </Button>
          <EditRoleModalWindow
            isModalOpen={open}
            closeModal={handleClose}
            firstName={firstName}
            lastName={lastName}
            name={name}
            role={role}
            email={email}
            username={username}
            updateUser={updateUser}
          />
        </div>
      </td>
    </tr>
  );
}

export default UserCineflix;
