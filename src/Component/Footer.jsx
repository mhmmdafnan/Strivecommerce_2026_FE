import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";
import { useState } from "react";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

const footer = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
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
      <footer className="bg-[#EE6D3F] text-white py-4">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-x-16">
          {/* Kolom 1 - Info Website */}
          <div>
            <h2 className="text-xl font-bold mb-3">Strive Commerce</h2>
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
              className="bg-white text-[#EE6D3F] px-4 py-1 w-fit  rounded-full text-sm cursor-pointer hover:scale-105 duration-300"
              onClick={showLoginModal}
            >
              Login Toko
            </p>
          </div>
        </div>
        <div className="container mx-auto text-center flex justify-center items-center">
          <p className="text-sm">
            &copy; 2025 Strive Marketplace - Set Up Inc.
          </p>
        </div>
      </footer>
    </>
  );
};

export default footer;
