import React, { useEffect, useState } from "react";
import Logo from "../assets/img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import { useCookies } from "react-cookie";

const Sidebar = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [cookies, setCookie, deleteCookie] = useCookies();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const role = 1;

  // Fungsi Logout
  const removeAllCookie = () => {
    // Implement logout logic here
    console.log("User logged out");
    deleteCookie("isLoggedIn");
    deleteCookie("token");
    deleteCookie("user_id");
    deleteCookie("role");
    deleteCookie("firstName");
    deleteCookie("lastName");
    deleteCookie("email");
    deleteCookie("telp");
    deleteCookie("nama_toko");
    deleteCookie("buka_toko");
    deleteCookie("klasifikasi_toko");
    deleteCookie("rating_toko");
    deleteCookie("gender");
    deleteCookie("path_file");
    deleteCookie("tanggal_lahir");
    // Optionally, redirect to home or login page]
    navigate("/");
  };

  return (
    <div className={`md:mt-4 md:mb-4 md:ml-4 `}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full shadow-xl w-64 rounded-3xl bg-white text-black transform transition-transform duration-300 z-40
        ${
          isOpen ? "translate-x-0 " : "-translate-x-full "
        } md:translate-x-0 md:static md:block`}
      >
        <div
          className={`mb-4  text-3xl md:hidden ml-4 mt-4`}
          onClick={toggleSidebar}
        >
          X
        </div>

        <div className="pt-8">
          <img src={Logo} alt="Logo" className="mx-auto h-10" />
        </div>

        <div className="mt-12">
          <img
            src={apiUrl + "/img/profile_image/" + cookies.path_file}
            alt="Logo"
            className="mx-auto h-24 w-24 object-cover shadow-xl rounded-full"
          />

          <div className="text-center w-full mt-4">Selamat Datang</div>
          <div className="font-semibold text-center w-full">
            {/* {cookies.fullName} */}
            Nama Pengguna
          </div>
        </div>

        <nav className="p-4 space-y-2 mt-6">
          <NavLink
            to="/adminPengajuan"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 flex p-2 rounded-md"
                : "hover:bg-gray-200 hover:rounded-md p-2 transition duration-500  pb-2 flex"
            }
          >
            Pengajuan
          </NavLink>
          <NavLink
            to="/adminUmkmList"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 flex p-2 rounded-md"
                : "hover:bg-gray-200 hover:rounded-md p-2 transition duration-500  pb-2 flex"
            }
          >
            UMKM
          </NavLink>
        </nav>

        <div className="absolute bottom-0 w-full pb-4">
          <div
            className="flex justify-center items-center gap-x-2 w-full cursor-pointer hover:bg-gray-200 py-2"
            onClick={() => navigate("/")}
          >
            <FaUserCircle />
            <span className="text-sm">Halaman User</span>
          </div>
          <div
            className="flex justify-center items-center gap-x-2 w-full cursor-pointer hover:bg-gray-200 py-2"
            onClick={removeAllCookie}
          >
            <IoLogOutOutline />
            <span className="text-sm">Log Out</span>
          </div>
        </div>
      </div>

      {/* Hamburger */}
      <div className="l-0">
        {/* Hamburger Button */}
        <div className="p-4 md:hidden">
          <button
            onClick={toggleSidebar}
            className="text-2xl text-gray-800 focus:outline-none"
          >
            {isOpen ? "☰" : "☰"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
