import React from "react";
function UserCineflix({ name, job, date, index, classes }) {
  return (
    <tr key={name}>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {name}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {job}
        </div>
      </td>
      <td className={classes}>
        <div variant="small" color="blue-gray" className="font-normal">
          {date}
        </div>
      </td>
      <td className={classes}>
        <div>
        <button className="bg-basic-red text-white font-bold py-2 px-4 rounded-full">test</button>
          
        </div>
      </td>
    </tr>
  );
}

export default UserCineflix;
