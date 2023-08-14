import React from "react";
import Button from '@mui/material/Button';

import EditRoleModalWindow from "./EditRoleModalWindow";

function UserCineflix({ name, firstName, lastName, role, email, username, classes }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <tr key={name}>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {name}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
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
          <Button onClick={handleOpen} className="font-normal bg-white hover:border-hover-cream hover:text-hover-cream text-blue-marine border border-blue-marine py-2 px-6">
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
          />
        </div>
      </td>
    </tr>
  );
}

export default UserCineflix;
