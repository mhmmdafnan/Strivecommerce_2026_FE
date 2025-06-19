import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import SignupImg from "../assets/img/market foto.png";
import Logo from "../assets/img/logo.png";

import LoginModal from "../Component/LoginModal";

const signupPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const firstInputRef = useRef(null);
  // const backendUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    // inisialisasi state untuk menyimpan data form
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    confPass: "",
  });

  const check_empty = () => {
    if (formData.email === "") {
      return false;
    }
    if (formData.pass === "") {
      return false;
    }
    if (formData.confPass === "") {
      return false;
    }
    if (formData.firstName === "") {
      return false;
    }
    if (formData.lastName === "") {
      return false;
    }

    if (formData.pass != formData.confPass) {
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    // mengubah state saat nilai input berubah
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const msg_div = document.getElementById("message-div");
    if (!msg_div.classList.contains("hidden")) {
      msg_div.classList.add("hidden");
    }
  };

  const sendData = (loginData) => {
    setLoading(true);
    try {
      axios
        .post(`${apiUrl}/api/v1/register`, {
          firstName: loginData.firstName,
          lastName: loginData.lastName,
          email: loginData.email,
          pass: loginData.pass,
        })
        .then((response) => {
          console.log(response);
          setLoading(false);
          if (response.success) {
            navigate("/");
          } else {
            const msg_div = document.getElementById("message-div");
            msg_div.classList.remove("hidden");
            // msg_div.innerHTML = response.data.message;
          }
        })
        
    } catch (error) {
        setLoading(false);
        const msg_div = document.getElementById("message-div");
        msg_div.classList.remove("hidden");
        msg_div.innerHTML = "Terjadi kesalahan, silakan coba lagi.";
    } finally {
      setLoading(false);
    }
    

  };

  const onSubmitClick = () => {
    navigate("/home");
  };

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <div className="h-screen bg-white">
      {/* Wrapper card */}
      {/* Logo */}
      <div className="flex justify-center py-5">
        <img src={Logo} alt="Logo" className="mx-auto h-10" />
      </div>

      <div className=" w-full flex flex-col md:flex-row items-center justify-center gap-5 md:gap-0 h-[calc(100vh-170px)] md:h-[calc(100vh-100px)]">
        {/* Kiri: Gambar */}
        <div className="hidden md:block md:w-2/4">
          <div className="flex justify-center items-center">
            <img
              src={SignupImg}
              alt="Interior"
              className="w-fit object-cover"
            />
          </div>
          <p className="text-center text-xs text-gray-400 ">
            Copyright by
            <span className="pl-1 text-[#EE6D3F] font-bold">XXXXXXXX</span>
          </p>
        </div>
        {/* Kanan: Form */}
        <div className="w-full md:w-2/4  flex justify-center md:justify-start items-center bg-white ">
          <div className="w-full max-w-md mx-5 lg:mx-10 rounded-xl px-14 py-6 border-2 border-[#B2B2B2] shadow-xl">
            {/* Heading */}
            <h2 className="text-center text-2xl font-semibold text-gray-800 ">
              Selamat Datang
            </h2>
            <p className="text-center text-xs text-gray-500 mb-10">
              Sudah punya akun?
              <span
                onClick={() => {
                  setLoginModalOpen(true);
                }}
                className="text-[#EE6D3F] font-bold hover:underline pl-1 cursor-pointer"
              >
                Login
              </span>
            </p>

            {/* Form */}
            <div className="space-y-3" >
              <input
                ref={firstInputRef}
                type="text"
                placeholder="First Name"
                className="bg-[#d8d8d8] text-xs px-3 py-2 mb-3 block rounded-lg w-full focus:ring-1  focus:ring-[#ff8052] focus:outline-none"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="bg-[#d8d8d8] text-xs px-3 py-2 mb-3 block rounded-lg w-full focus:ring-1  focus:ring-[#ff8052] focus:outline-none"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                className="bg-[#d8d8d8] text-xs px-3 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-[#ff8052] focus:outline-none"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="pass"
                  className="bg-[#d8d8d8] text-xs px-3 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-[#ff8052] focus:outline-none"
                  value={formData.pass}
                  onChange={handleChange}
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="relative mb-2">
                <input
                  type={showConfPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confPass"
                  value={formData.confPass}
                  onChange={handleChange}
                  className="bg-[#d8d8d8] text-xs px-3 py-2 mb-10 block rounded-lg w-full focus:ring-1 focus:ring-[#ff8052] focus:outline-none"
                />
                <div
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowConfPassword(!showConfPassword)}
                >
                  {showConfPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div
                onClick={sendData.bind(this, formData)}
                className="w-full text-center bg-[#EE6D3F] hover:bg-[#ff8052] transition duration-150 px-3 py-2  rounded-lg text-white text-xs md:text-sm font-semibold cursor-pointer"
              >
                Sign Up
              </div>
            </div>

            <div className="text-red-500 text-xs hidden mb-3" id="message-div">
              *isian form tidak benar
            </div>
          </div>
        </div>
      </div>
      {/* Modal Ganti Password */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default signupPage;
