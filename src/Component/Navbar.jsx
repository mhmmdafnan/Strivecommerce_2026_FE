import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaAlignJustify } from "react-icons/fa6";
import {
  AiOutlineMenuFold,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineMoon,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import ava from "../assets/img/picture1.jpeg";
import Logo from "../assets/img/logo.png";

export default function Navbar() {
  const [isSideMenuOpen, setMenu] = useState(false);

  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate("/keranjang");
  };

  return (
    <main>
      <nav className="flex justify-between px-8 items-center py-4">
        <div className="flex items-center gap-8 ">
          {/* menu */}
          <AiOutlineMenu
            onClick={() => setMenu(true)}
            className="text-3xl cursor-pointer lg:hidden"
          />
          <Link
            className="hidden lg:block  text-gray-400 hover:text-black"
            to="/home"
          >
            Produk
          </Link>
          <Link
            className="hidden lg:block  text-gray-400 hover:text-black"
            to=""
          >
            Tentang
          </Link>
        </div>
        {/* logo */}
        <div className="">
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
            <Link className="font-bold text-gray-500" to="/home">
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
          <AiOutlineSearch className="text-xl hidden md:flex" />
          <AiOutlineMoon className="text-xl hidden md:flex" />
          <div onClick={handleCartClick} className="cursor-pointer">
            <AiOutlineShoppingCart className="text-xl hidden md:flex " />
            {/* <div className="hidden opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:block">
              keranjang
            </div> */}
          </div>
          <AiOutlineUser className="text-xl hidden md:flex" />
          <img
            width={40}
            height={40}
            className="h-8 w-8 rounded-full "
            src={ava}
            alt="avatar-img"
          />
          {/* avtar img */}
        </div>
      </nav>
      <hr className=" " />
    </main>
  );
}
