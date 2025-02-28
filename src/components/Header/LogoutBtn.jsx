import React from 'react';
import authService from '../../appwrite/auth.js';
import { useDispatch } from 'react-redux';
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className='px-5 py-2 rounded-full transition duration-300 bg-red-600 text-white hover:bg-red-700 shadow-md w-full sm:w-auto'
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
