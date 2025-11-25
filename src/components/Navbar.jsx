import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h2
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Quiz App
      </h2>

      {user && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-xl 
                     hover:bg-red-600 transition shadow-md font-semibold"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
