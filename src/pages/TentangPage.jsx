import React from "react";
import img from "../assets/img/logo.png";
import img2 from "../assets/img/fitur_tentang.png";
import img3 from "../assets/img/manfaat_tentang.png";
import Footer from "../Component/Footer";

const TentangPage = () => {
  return (
    <>
      <div className="bg-[#f4f2ef] max-w-7xl mx-auto px-5 md:px-20 py-5">
        <div className="flex flex-col items-center md:items-start justify-center mb-6">
          <h1 className="text-2xl font-bold text-center md:text-left">
            Tentang Strive
          </h1>
        </div>

        {/* Bagian 1 - Profil singkat */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 mt-6 px-4 py-8">
          <div className="w-full md:w-1/2 flex items-center justify-center px-4">
            <img
              src={img}
              className="w-full h-auto max-w-sm"
              alt="Strive Logo"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-y-4 px-4">
            <h1 className="font-bold text-2xl mb-2">Strive</h1>
            <p className="text-justify">
              Strive Commerce merupakan platform e-commerce yang dirancang
              khusus untuk mendukung pelaku UMKM dalam memasarkan produk mereka
              secara digital. Nama Strive dipilih karena melambangkan semangat
              perjuangan dan usaha tanpa henti dari para pelaku UMKM untuk terus
              berkembang. Melalui Strive Commerce, pelaku usaha tidak hanya
              mendapatkan wadah untuk berjualan, tetapi juga kesempatan untuk
              memperluas jangkauan pasar mereka hingga ke berbagai daerah, tanpa
              terbatas oleh lokasi fisik.
            </p>
          </div>
        </div>

        {/* Bagian 2 - Fitur */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 mt-6 mb-6 bg-white px-4 py-8 rounded-xl">
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-y-4 px-4">
            <h1 className="font-bold text-2xl mb-2">Fitur Unggulan</h1>
            <p className="text-justify">
              Website ini menyediakan berbagai fitur yang memudahkan proses
              jual-beli secara online. UMKM dapat dengan mudah mengunggah produk
              mereka, melengkapi deskripsi, harga, serta gambar, sehingga
              pembeli dapat melihat detail produk secara jelas. Di sisi lain,
              pembeli dapat melakukan pemesanan produk secara langsung melalui
              website dengan sistem keranjang belanja dan metode pembayaran
              online yang aman. Selain itu, terdapat juga fitur komunikasi yang
              memungkinkan pembeli terhubung langsung dengan penjual untuk
              bertanya atau melakukan pemesanan secara lebih personal.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center px-4">
            <img
              src={img2}
              className="w-full h-auto max-w-sm"
              alt="Fitur Unggulan"
            />
          </div>
        </div>

        {/* Bagian 3 - Manfaat */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 mt-6 px-4 py-8">
          <div className="w-full md:w-1/2 flex items-center justify-center px-4">
            <img src={img3} className="w-full h-auto max-w-sm" alt="Manfaat" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-y-4 px-4">
            <h1 className="font-bold text-2xl mb-2">Manfaat</h1>
            <p className="text-justify">
              Dengan hadirnya Strive Commerce, UMKM mendapatkan manfaat besar
              dalam memperkuat keberadaan digital mereka, membangun brand, dan
              meningkatkan penjualan. Pembeli pun diuntungkan karena bisa
              menemukan berbagai produk lokal berkualitas dengan cara yang lebih
              mudah dan cepat. Selain memberikan efisiensi, platform ini juga
              berperan dalam mendukung perekonomian daerah dengan mempertemukan
              pelaku UMKM dan konsumen secara langsung melalui teknologi
              digital.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TentangPage;
