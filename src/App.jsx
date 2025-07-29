import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DetailProdukPage from "./pages/DetailProdukPage.jsx";
import AkunSayaPage from "./pages/AkunSayaPage.jsx";
import TokoPage from "./pages/TokoPage.jsx";
import TokoSayaPage from "./pages/TokoSayaPage.jsx";
import AdminUmkmPage from "./pages/AdminUmkmPage.jsx";
import AdminPengajuanPage from "./pages/AdminPengajuanPage.jsx";
import KeranjangPage from "./pages/KeranjangPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import FormUMKMPage from "./pages/FormUMKMPage.jsx";
import LoadingAcc from "./pages/LoadingACC.jsx";
import LoginRoutes from "./Component/LoginRoutes.jsx";
import TambahProdukPage from "./Component/TambahProduk.jsx";
import Navbar from "./Component/Navbar.jsx";
import AlamatPage from "./pages/AlamatPage.jsx";
import TambahAlamat from "./pages/TambahAlamat.jsx";
import PaymentPage from "./pages/PaymentPage.jsx"
import { useState } from "react";
import { ThemeProvider } from "./Component/ThemeContext.jsx";

// Wrapper untuk mengatur kondisi Navbar
const AppRoutes = ({ isLoginModal, setIsLoginModal }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isRegisterRoute = location.pathname === "/register";

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* {!(isAdminRoute || isRegisterRoute) && ( */}
        <Navbar
          // isLoginModal={isLoginModal}
          // setIsLoginModal={setIsLoginModal}
        />
      {/* )} */}
      <Routes>
        {/* Halaman publik */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/detailProduk/:idProduk"
          element={
            <DetailProdukPage
              isLoginModal={isLoginModal}
              setIsLoginModal={setIsLoginModal}
            />
          }
        />

        <Route element={<LoginRoutes />}>
          <Route path="/akunSaya" element={<AkunSayaPage />} />
          <Route path="/tokoSaya" element={<TokoSayaPage />} />
          {/* <Route path="/keranjang" element={<KeranjangPage />} /> */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/loading" element={<LoadingAcc />} />
          <Route path="/formUMKM" element={<FormUMKMPage />} />
          <Route path="/toko/:userId" element={<TokoPage />} />
          <Route path="/alamat" element={<AlamatPage />} />
          <Route path="/TambahAlamat" element={<TambahAlamat />} />
          <Route path="/toko/:idToko" element={<TokoPage />} />
          <Route path="/tambahProduk" element={<TambahProdukPage />} />
          <Route path="/editProduk/:idProduk" element={<TambahProdukPage />} />
          <Route path="/adminUmkmList" element={<AdminUmkmPage />} />
          <Route path="/adminPengajuan" element={<AdminPengajuanPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
        </Route>

        <Route path="/register" element={<SignupPage />} />
      </Routes>
    </>
  );
};

// Main App
export default function App() {
  const [isLoginModal, setIsLoginModal] = useState(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes
          isLoginModal={isLoginModal}
          setIsLoginModal={setIsLoginModal}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}
