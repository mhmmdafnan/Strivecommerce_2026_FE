import { BrowserRouter, Routes, Route } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Halaman publik */}
          <Route path="/" element={<HomePage />} />
          <Route path="/detailProduk" element={<DetailProdukPage />} />

          <Route element={<LoginRoutes />}>
            <Route path="/akunSaya" element={<AkunSayaPage />} />
            <Route path="/tokoSaya" element={<TokoSayaPage />} />
            <Route path="/keranjang" element={<KeranjangPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/loading" element={<LoadingAcc />} />
            <Route path="/formUMKM" element={<FormUMKMPage />} />
            <Route path="/toko" element={<TokoPage />} />
            <Route path="/tambahProduk" element={<TambahProdukPage />} />
            <Route
              path="/editProduk/:idProduk"
              element={<TambahProdukPage />}
            />

            <Route path="/adminUmkmList" element={<AdminUmkmPage />} />
            <Route path="/adminPengajuan" element={<AdminPengajuanPage />} />
          </Route>

          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
