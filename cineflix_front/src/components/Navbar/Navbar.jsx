import React, { useState } from "react";
import "./css/Navbar.css";

function Navbar() {
  const [selectedItem, setSelectedItem] = useState("movies"); // Initialize with the default selected item

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const getIconURL = (item) => {
    const iconName = item
    if (iconName === selectedItem) {
      return `Navbar_Icons/${iconName}_selected_icon.png`;
    }
    return `Navbar_Icons/${iconName}_default_icon.png`;
  };

  return (
    <div className="flex h-screen w-auto">
      <div className="flex flex-col h-full p-3 bg-white shadow w-60">
        <div className="flex flex-col h-full space-y-3 justify-between">
          <div className="flex items-center mt-10 ml-3" >
            <img src="Navbar_Icons/cineflix_logo.png" alt="Cineflix Logo" />
          </div>

          <div className="overflow-y-auto">
            <ul className="flex flex-col pt-2 pb-4 space-y-1 text-sm ">
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  onClick={() => handleItemClick("movies")}
                >
                  <img src={getIconURL("movies")} alt="Movies Icon" />
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  onClick={() => handleItemClick("profile")}
                >
                  <img src={getIconURL("profile")} alt="Profile Icon" />
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  onClick={() => handleItemClick("role_management")}
                >
                  <img src={getIconURL("role_management")} alt="Role Management Icon" />
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  onClick={() => handleItemClick("category_management")}
                >
                  <img src={getIconURL("category_management")} alt="Category Icon" />
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <a
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md mb-10"
                  onClick={() => handleItemClick("logout")}
                >
                  <img src={getIconURL("logout")} alt="Logout Icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
