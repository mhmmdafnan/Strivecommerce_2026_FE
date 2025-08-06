import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal.jsx";
import { useState } from "react";
import { useCookies } from "react-cookie";


const footer = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["isLoggedIn"]);
  const showLoginModal = () => {
    setLoginModalOpen(true);
  };

  return (
    <>
        <LoginModal
        isOpen={isLoginModalOpen}
        onSuccess={() => {
          setLoginModalOpen(false);
          navigate("/akunSaya");
        }}
        onClose={() => setLoginModalOpen(false)}
      />
    <footer className="bg-[#EE6D3F] text-white py-4">
      <div className="container mx-auto text-center flex justify-between items-center">
        <p className="text-sm">&copy; 2025 Strive Marketplace - Set Up Inc.</p>
        {cookies.isLoggedIn ? (
            <p className="bg-white text-[#EE6D3F] px-4 py-1 rounded-full text-sm cursor-pointer" onClick={() => navigate("/tokoSaya")}>
              Toko
            </p>
          ) : (
            <p className="bg-white text-[#EE6D3F] px-4 py-1 rounded-full text-sm cursor-pointer" onClick={showLoginModal}>
              Login Toko
            </p>
          )}
        
      </div>
    </footer>
    </>
  );
};

export default footer;
