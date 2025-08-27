import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";
import { useState } from "react";
import logoStrive from "../assets/img/logo.png";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useCookies } from "react-cookie";

const footer = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const showLoginModal = () => {
    setLoginModalOpen(true);
  };

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onSuccess={() => {
          setLoginModalOpen(false);
          navigate("/tokoSaya");
        }}
        onClose={() => setLoginModalOpen(false)}
      />
      <footer className="py-4 bg-[#F4F2EF]">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-x-16">
          {/* Kolom 1 - Info Website */}
          <div>
            {/* <h2 className="text-xl font-bold mb-3"></h2> */}
            <div className="mb-3 w-32 px-2 py-4">
              <img src={logoStrive} alt="" />
            </div>
            <p className="text-sm leading-relaxed">
              Strive Commerce adalah platform e-commerce untuk membantu UMKM
              memasarkan produk secara digital dan memperluas jangkauan pasar.
            </p>
          </div>

          {/* Kolom 2 - Kontak */}
          <div>
            <h2 className="text-xl font-bold mb-3">Kontak Kami</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Jl. Pahlawan No. 123, Majene, Sulawesi
                Barat
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} /> +62 812-3456-7890
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> support@strivecommerce.com
              </li>
            </ul>
          </div>

          {/* Kolom 3 - Link Cepat */}
          <div>
            <h2 className="text-xl font-bold mb-3">Admin</h2>
            <p
              className="bg-[#990808] text-white font-semibold px-4 py-1 w-fit  rounded-full text-sm cursor-pointer hover:scale-105 duration-300"
              onClick={
                cookies["isLoggedIn"]
                  ? () => navigate("/tokoSaya")
                  : showLoginModal
              }
            >
              {cookies["isLoggedIn"] ? "Halaman Toko" : "Login Toko"}
            </p>
          </div>
        </div>
        <div className="container mx-auto text-center flex justify-center items-center">
          <p className="text-sm text-[#990808]">
            &copy; 2025 Strive Marketplace - Set Up Inc.
          </p>
        </div>
      </footer>
    </>
  );
};

export default footer;
