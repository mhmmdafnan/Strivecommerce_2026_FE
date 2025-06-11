import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import DetailProdukPage from "./pages/DetailProdukPage.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Halaman publik */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/detailProduk" element={<DetailProdukPage />} />
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
