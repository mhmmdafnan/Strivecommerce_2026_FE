import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "./ThemeContext.jsx";
// import { FaAlignJustify } from "react-icons/fa6";
import {
  AiOutlineMenuFold,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineMoon,
  AiOutlineUser,
} from "react-icons/ai";

// import { Cookies } from "react-cookie";
import { useCookies } from "react-cookie";

import ava from "../assets/img/picture1.jpeg";
import Logo from "../assets/img/logo.png";
import ToggleDarkMode from "../Component/ToggleDarkMode.jsx"
import LoginModal from "./LoginModal.jsx";

export default function Navbar({isLoginModal, setIsLoginModal}) {
  const [isSideMenuOpen, setMenu] = useState(false);
  // const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  
  const showLoginModal = () => {
    setIsLoginModal(true);
  };

  const [cookies, setCookie, removeCookie] = useCookies();

  const handleCartClick = () => {
    navigate("/keranjang");
  };

  const onSuccessLogin = (data) => {
    console.log(data);
    setCookie("isLoggedIn", true);
    setCookie("token", data.data.token);
    setCookie("user_id", data.data.id_user)
    
    setIsLoginModal(false)
    // console.log(cookies["token"], data.data.token);
  }



  return (
    <main className="relative dark:bg-[#3b3b3b]">
      <LoginModal
        isOpen={isLoginModal}
        onClose={() => setIsLoginModal(false)}
        onSuccess={(data) => onSuccessLogin(data)}
      />
      <nav className="flex justify-between px-8 items-center py-4">
        <div className="flex items-center gap-8 ">
          {/* menu */}
          <AiOutlineMenu
            onClick={() => setMenu(true)}
            className="text-3xl cursor-pointer lg:hidden"
          />
          <Link
            className="hidden lg:block  text-gray-400 dark:text-gray-300 dark:hover:text-gray-100 hover:text-black"
            to="/"
          >
            Produk
          </Link>
          <Link
            className="hidden lg:block  text-gray-400 dark:text-gray-300 dark:hover:text-gray-100 hover:text-black"
            to=""
          >
            Tentang
          </Link>
        </div>
        {/* logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={Logo} alt="Logo" className="mx-auto h-10" />
        </div>
        {/* sidebar mobile menu */}
        <div
          className={`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transition-all z-50
    ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="text-black bg-white flex-col absolute left-0 top-0 h-screen px-4 gap-6 z-50 w-56 flex ">
            {/* logo */}
            <div className="flex justify-between items-center py-6">
              <div className="">
                <img src={Logo} alt="Logo" className="mx-auto h-6" />
              </div>
              <AiOutlineMenuFold
                onClick={() => setMenu(false)}
                className="text-3xl items-center hover:text-red-600 cursor-pointer"
              />
            </div>
            <Link className="font-bold text-gray-500" to="/">
              Produk
            </Link>
            <Link className="font-bold text-gray-500" to="">
              Tentang
            </Link>
          </div>
        </div>

        {/* last section */}
        <div className="flex items-center gap-4">
          {/* cart icon */}
          <div  className="cursor-pointer group w-4 md:w-12 transition-all flex duration-500"
            // onClick={() => setDarkMode(!darkMode)}
          >
              <ToggleDarkMode darkMode={darkMode} setDarkMode={setDarkMode}/>
          </div>
          {/* <div onClick={handleCartClick} className="cursor-pointer group w-6 hover:w-32 transition-all flex items-center duration-500">
            <AiOutlineSearch className="text-xl hidden md:flex" /> */}
            {/* <AiOutlineShoppingCart className="text-xl hidden md:flex " /> */}
            {/* <div className="ml-2 hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap text-sm">
              <input type="text" className="border-2 rounded-lg w-24 px-2"/>
            </div> */}

          {/* </div> */}

          {
            (cookies.isLoggedIn) ? (
              <div onClick={handleCartClick} className="cursor-pointer group w-6 hover:w-24 transition-all flex duration-500">
                <AiOutlineShoppingCart className="text-xl hidden md:flex dark:text-white"/>
                <span className="md:ml-2 hidden dark:text-white group-hover:flex opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap text-sm">
                  Keranjang
                </span>
              </div>
            ) : null
          }

          

          {/* <AiOutlineUser className="text-xl hidden md:flex" /> */}
          {
            (cookies["isLoggedIn"]) ? (
              <>
                <img
                onClick={() => navigate("/akunSaya")}
                width={40}
                height={40}
                className="h-8 w-8 rounded-full cursor-pointer "
                src={ava}
                alt="avatar-img"
              />
              </>
            ) : (
              <>
              <div className="cursor-pointer dark:text-white group ml-4 justify-center hover:border-b-2 border-[#FE5D26] dark:border-white transition-all flex duration-500" onClick={showLoginModal}>
                Login
              </div>
              </>
            )
            
          }
          
          {/* avtar img */}
        </div>
      </nav>
      <hr className=" " />
    </main>
  );
}
