import React from "react";
import Button from '@mui/material/Button';

import EditRoleModalWindow from "./EditRoleModalWindow";

function UserCineflix({ name, surname, role, email, date, classes }) {
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
          {surname}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {/* TODO make default value in dropdown to be variable
            the value should be from database */}
          {/* TODO make the dropdown pretty Opional*/}
          <form>
            <select name="roles">
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </form>
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {email}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {date}
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
            name={name}
            surname={surname}
            role={role}
            email={email}
          />
        </div>
      </td>
    </tr>
  );
}

export default UserCineflix;
