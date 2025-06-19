import { BrowserRouter, Routes, Route } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DetailProdukPage from "./pages/DetailProdukPage.jsx";
import AkunSayaPage from "./pages/AkunSayaPage.jsx";
import TokoPage from "./pages/TokoPage.jsx";
import TokoSayaPage from "./pages/TokoSayaPage.jsx";
import AdminPengajuanPage from "./pages/AdminPengajuanPage.jsx";
import AdminUmkmPage from "./pages/AdminUmkmPage.jsx";
import KeranjangPage from "./pages/KeranjangPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import FormUMKMPage from "./pages/FormUMKMPage.jsx";
import LoadingAcc from "./pages/LoadingACC.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Halaman publik */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/detailProduk" element={<DetailProdukPage />} />
          <Route path="/akunSaya" element={<AkunSayaPage />} />
          <Route path="/formUMKM" element={<FormUMKMPage />} />
          <Route path="/toko" element={<TokoPage />} />
          <Route path="/tokoSaya" element={<TokoSayaPage />} />
          <Route path="/keranjang" element={<KeranjangPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/adminPengajuan" element={<AdminPengajuanPage />} />
          <Route path="/adminUmkmList" element={<AdminUmkmPage />} />
          <Route path="/loading" element={<LoadingAcc />} />
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
