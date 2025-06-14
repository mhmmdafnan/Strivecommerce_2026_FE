import { BrowserRouter, Routes, Route } from "react-router-dom";
import "keen-slider/keen-slider.min.css";

import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DetailProdukPage from "./pages/DetailProdukPage.jsx";
import AkunSayaPage from "./pages/AkunSayaPage.jsx";
import TokoPage from "./pages/TokoPage.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Halaman publik */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/detailProduk" element={<DetailProdukPage />} />
          <Route path="/akunSaya" element={<AkunSayaPage />} />
          <Route path="/toko" element={<TokoPage />} />
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
