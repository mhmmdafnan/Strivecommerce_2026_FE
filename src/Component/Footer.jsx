import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";
import { useState } from "react";
import logoStrive from "../assets/img/logo.png";
import watermark from "../assets/img/watermark_ikan.png";
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
      <footer
        className="py-4 bg-[#F4F2EF] relative overflow-hidden"
        style={{
          backgroundImage: `url(${watermark})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundSize: "clamp(250px, 35vw, 500px)",
        }}
      >
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
                <span>
                  <MapPin size={16} />
                </span>
                Jalan Prof. Dr. Baharuddin Lopa, S.H, Talumung, Baurung, Kec.
                Banggae Tim., Kabupaten Majene, Sulawesi Barat 91412
              </li>

              <li className="flex items-center gap-2">
                <Phone size={16} />

                <a
                  href="https://wa.me/6282218880188"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-black"
                >
                  0822-1888-0188
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Mail size={16} />

                <a
                  href="mailto:bisdig@unsulbar.ac.id"
                  className="hover:underline text-black"
                >
                  bisdig@unsulbar.ac.id
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3 - Link Cepat */}
          <div>
            <h2 className="text-xl font-bold mb-3">Admin</h2>

            <p
              className="bg-[#990808] text-white font-semibold px-4 py-1 w-fit rounded-full text-sm cursor-pointer hover:scale-105 duration-300"
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
