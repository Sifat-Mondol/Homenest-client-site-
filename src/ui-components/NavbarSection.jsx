import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../auth-context/AuthProvider";

const NavbarSection = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HomeNest
        </Link>
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="hover:text-blue-500">Home</NavLink>
          <NavLink to="/all-properties" className="hover:text-blue-500">All Properties</NavLink>
          {user && (
            <>
              <NavLink to="/add-property" className="hover:text-blue-500">Add Property</NavLink>
              <NavLink to="/my-properties" className="hover:text-blue-500">My Properties</NavLink>
              <NavLink to="/my-ratings" className="hover:text-blue-500">My Ratings</NavLink>
            </>
          )}
          {!user ? (
            <>
              <NavLink to="/login" className="px-3 py-1 bg-blue-600 text-white rounded">Login</NavLink>
              <NavLink to="/register" className="px-3 py-1 bg-green-600 text-white rounded">Signup</NavLink>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="User"
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                  <p className="px-4 py-1">{user.displayName}</p>
                  <p className="px-4 py-1 text-sm text-gray-500">{user.email}</p>
                  <button
                    onClick={logOut}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSection;
