import React from "react";
function UserCineflix({ name, surname, role, isActive, date, classes }) {
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
          {isActive}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {date}
        </div>
      </td>
      <td className={classes}>
        <div>
          <button className="font-normal bg-white hover:border-hover-cream hover:text-hover-cream text-blue-marine border border-blue-marine py-2 px-6">
            Edit
          </button>
        </div>
      </td>
      <td className={classes}>
        <div>
          <button className="font-normal bg-blue-marine hover:border-hover-cream hover:bg-hover-cream text-white border border-blue-marine py-2 px-6">
            Update
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserCineflix;
