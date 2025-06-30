import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import fotoToko from "../assets/img/market foto.png";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaLocationDot, FaShareNodes } from "react-icons/fa6";

import Navbar from "../Component/Navbar";
import ModalShare from "../Component/ShareModal";
import produk1 from "../assets/img/produk/kursi 1.jpg";
import produk2 from "../assets/img/produk/kursi 2.jpg";
import produk3 from "../assets/img/produk/kursi 3.jpg";
import { MdOutlineStoreMallDirectory } from "react-icons/md";

const produkList = [
  {
    id: 1,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk1,
  },
  {
    id: 2,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk2,
  },
  {
    id: 3,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk3,
  },
  {
    id: 4,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk1,
  },
  {
    id: 5,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk2,
  },
  {
    id: 6,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk3,
  },
  {
    id: 7,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk1,
  },
  {
    id: 8,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk2,
  },
  {
    id: 9,
    nama: "Nama Barang wkwkwkwkwkkwkwkw",
    harga: "Rp. 100.000",
    toko: "Toko",
    gambar: produk3,
  },
  // dan seterusnya
];

const TokoPage = () => {
  const navigate = useNavigate();
  const Toko = { namaToko: "Nama Toko", Kabupaten: "Majene" };

  const [openModal, setOpenModal] = useState(false);
  const shareUrl = `${window.location.origin}${location.pathname}`;
  const shareText = `Cek Toko ${Toko.namaToko}, cuma di sini!`;
  return (
    <>
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-5 mb-20 md:mt-0">
        {/* Navigation */}
        <div className="flex gap-x-1 p-1 my-2">
          <div className="text-sm text-gray-400 hover:text-gray-800 cursor-pointer">
            Home /
          </div>
          <div className="text-sm text-[#EE6D3F] hover:text-[#bc5b38] cursor-pointer">
            {Toko.namaToko}
          </div>
        </div>
        {/* Toko Card  */}
        <div className="flex justify-between items-center px-6 py-8 border-[1px] border-[#ADB0B6] shadow-xl rounded-xl">
          <div className="flex items-center gap-x-5 ">
            <div className="h-24 w-24 bg-slate-300 rounded-full ">
              <img
                src={fotoToko}
                className="object-contain h-full w-full p-2"
                alt=""
              />
            </div>
            <div onClick={() => navigate("/toko")} className="cursor-pointer">
              <div className="text-xl font-semibold hover:text-[#EE6D3F]">
                Toko
              </div>
              <div className="flex mb-2 text-xs items-center gap-x-1 text-gray-500 hover:text-gray-800">
                <FaLocationDot /> {Toko.Kabupaten}
              </div>
              <div className="flex gap-x-2">
                <div
                  onClick={() => {
                    window.open("https://wa.me/6281225759764", "_blank");
                  }}
                  className="text-xs flex items-center gap-x-1 px-2 py-1 rounded-xl bg-[#EE6D3F] text-white hover:bg-[#bc5b38] cursor-pointer"
                >
                  <IoChatboxEllipsesOutline /> Chat Penjual
                </div>
                <div
                  onClick={() => setOpenModal(true)}
                  className="text-xs flex items-center gap-x-1 p-2 border-2 border-gray-600 rounded-xl bg-white text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  <FaShareNodes className="hover:scale-125 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-1 text-2xl font-semibold ">10</div>
            <div className="text-xs text-gray-500">Barang Terjual</div>
          </div>
        </div>
        {/* List Produk*/}
        <div className="mt-10">
          <div className="flex justify-between">
            <h2 className="text-xl mb-4">Produk di toko ini</h2>
            <div className="flex items-center gap-x-4">
              <span>Urutkan :</span>
              {/* option sort by  */}
              <select className="border-2 border-gray-300 rounded-md py-1 px-4 text-sm">
                <option value="semua">Semua</option>
                <option value="terbaru">Terbaru</option>
                <option value="terlaris">Terlaris</option>
                <option value="termurah">Termurah</option>
                <option value="termahal">Termahal</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
            {produkList.map((produk) => (
              <div
                onClick={() => navigate("/detailProduk")}
                key={produk.id}
                className="h-34 cursor-pointer hover:shadow-md rounded-xl p-2"
              >
                <img
                  src={produk.gambar}
                  className="w-full h-30 object-cover rounded-3xl border-2 border-gray-200 hover:scale-105 transition-all duration-300"
                  alt={produk.nama}
                />
                <div className="p-2">
                  <div className="text-sm font-extralight text-black">
                    {produk.harga}
                  </div>
                  <div className="text-md font-medium text-black truncate">
                    {produk.nama}
                  </div>
                  <div className="flex items-center gap-x-1 text-sm font-extralight text-gray-500">
                    <MdOutlineStoreMallDirectory />
                    {produk.toko}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalShare
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        url={shareUrl}
        text={shareText}
      />
    </>
  );
};

export default TokoPage;
