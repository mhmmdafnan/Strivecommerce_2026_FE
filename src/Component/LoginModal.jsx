import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../assets/img/logo.png";
import LogoGoogle from "../assets/img/googleIcon.png";
import axios from "axios";
import Loading from "./Loading";

import { useCookies } from "react-cookie";

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const apiUrl = import.meta.env.VITE_API_URL; // URL API
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const firstInputRef = useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies(["isLoggedIn"]);

  const [formData, setFormData] = useState({
    // inisialisasi state untuk menyimpan data form
    email: "",
    pass: "",
  });

  const sendData = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!check_empty()) {
      setShowEmptyError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/v1/login`, {
        email: formData.email,
        password: formData.pass,
      });

      if (response.data.success) {
        setCookie("isLoggedIn", true);
        setCookie("token", response.data.token);
        setCookie("user_id", response.data.id_user);
        setCookie("role", response.data.role);
        setCookie("firstName", response.data.firstname);
        setCookie("lastName", response.data.lastname);
        setCookie("gender", response.data.gender);
        setCookie("email", response.data.email);
        setCookie("tanggal_lahir", response.data.tanggal_lahir);
        setCookie("telp", response.data.telp);
        setCookie("path_file", response.data.path_file);
        setCookie("nama_toko", response.data.nama_toko);
        setCookie("buka_toko", response.data.buka_toko);
        setCookie("klasifikasi_toko", response.data.klasifikasi_toko);
        setCookie("rating_toko", response.data.rating_toko);
        onSuccess(response);
      } else {
        setShowLoginError(true);
      }
    } catch (error) {
      setShowLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  const check_empty = () => {
    if (formData.email === "") {
      return false;
    }
    if (formData.pass === "") {
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    // mengubah state saat nilai input berubah
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowLoginError(false);
    setShowEmptyError(false);
  };

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black w-full max-w-md rounded-lg shadow-lg px-12 pt-6 pb-12 relative">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </div>
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img src={Logo} alt="Logo" className="mx-auto h-10" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-700 dark:text-white">
          Selamat Datang
        </h2>
        <p className="text-center text-xs text-gray-500 mb-10 dark:text-gray-300">
          Belum punya akun?
          <span
            onClick={() => {
              if (location.pathname === "/register") {
                onClose(); // jika sudah di halaman "/"
              } else {
                navigate("/register"); // jika bukan di halaman "/"
              }
            }}
            className="text-[#EE6D3F] font-bold hover:underline pl-1 cursor-pointer"
          >
            Daftar
          </span>
        </p>

        <form onSubmit={sendData} className="space-y-3 ">
          <input
            ref={firstInputRef}
            className="bg-[#d8d8d8] text-xs px-3 py-2 mb-3 block rounded-lg w-full focus:ring-1 focus:ring-[#ff8052] focus:outline-none"
            name="email"
            required
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <div className="relative">
            <input
              className={`bg-[#d8d8d8] text-xs ${
                showLoginError ? "mb-0" : "mb-8"
              } px-3 py-2 block rounded-lg w-full focus:ring-1 focus:ring-[#ff8052] focus:outline-none`}
              name="pass"
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.pass}
              onChange={handleChange}
            />

            {/* Icon toggle */}
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {showLoginError && (
            <div className="text-red-500 text-xs " id="message-div">
              *email atau password tidak sesuai
            </div>
          )}

          <button
            className="w-full bg-[#EE6D3F] hover:bg-[#ff8052] h-10 transition duration-150 px-3 py-2 rounded-lg text-white text-xs md:text-sm"
            type="submit"
            // onClick={sendData}
          >
            {loading ? (
              <div className="flex justify-center  items-center gap-2">
                <Loading w={4} h={4} />
              </div>
            ) : (
              <>Sign In</>
            )}
          </button>
          <button className="flex justify-center items-center mt-3 w-full  border border-gray-300 hover:bg-gray-200 text-xs px-3 py-2 rounded-lg gap-2">
            <img src={LogoGoogle} alt="Google" className="w-4 h-4" />
            Sign In with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
