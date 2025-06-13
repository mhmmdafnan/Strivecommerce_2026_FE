import React, { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Navbar from "../Component/Navbar";
import produk1 from "../assets/img/produk/kursi 1.jpg";
import produk2 from "../assets/img/produk/kursi 2.jpg";
import produk3 from "../assets/img/produk/kursi 3.jpg";
import fotoToko from "../assets/img/market foto.png";
import { useNavigate } from "react-router-dom";

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
const produk = {
  nama: "Kursi Gaming Ergonomis",
  harga: 100000,
  deskripsi: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, dolore? 
  Nulla fugiat vero minima corporis, totam iste error adipisci, rem incidunt esse nam! 
  Voluptates, eaque nesciunt ratione quia praesentium nihil! Lorem ipsum dolor sit amet consectetur,
  adipisicing elit. Repudiandae soluta ad cumque ex impedit. Quia enim, numquam ut ea natus quaerat 
  sunt minus accusamus eaque voluptatibus. Dolorem nostrum culpa iusto..`,
  fotoProduk: [produk1, produk2, produk3],
};

const DetailProdukPage = () => {
  const navigate = useNavigate();
  const [fotoUtama, setFotoUtama] = useState(produk.fotoProduk[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [jumlahProduk, setJumlahProduk] = useState(1);
  const [stokProduk, setStokProduk] = useState(10);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const jumlahProdukHandler = (action) => {
    if (action === "tambahkan") {
      if (jumlahProduk >= stokProduk) {
        alert(`Jumlah produk melebihi stok yang tersedia (${stokProduk})`); 
        return;
      }
      setJumlahProduk((prev) => prev + 1);
    } else {
      setJumlahProduk((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 4, spacing: 15 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 20 },
      },
    },
  });

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 mb-20 md:mt-0">
        {/* Navigation */}
        <div className="flex gap-x-1 p-1 my-2">
          <div className="text-sm text-gray-400 hover:text-gray-800 cursor-pointer">
            Produk /
          </div>
          <div className="text-sm text-gray-400 hover:text-gray-800 cursor-pointer">
            Nama Toko /
          </div>
          <div className="text-sm text-[#EE6D3F] hover:text-[#bc5b38] cursor-pointer">
            {produk.nama}
          </div>
        </div>
        {/* Konten Pembelian Produk  */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Gambar Utama */}
            <div className="basis-1/2 max-w-4xl">
              <div
                className="flex rounded-xl border-[1px] border-gray-500 max-h-[400px] h-[350px] items-center justify-center overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
              >
                <img
                  src={fotoUtama}
                  className="h-full w-full object-contain rounded-xl transition-transform duration-300 cursor-zoom-in"
                  style={
                    zoom
                      ? {
                          transform: "scale(2)",
                          transformOrigin: "center",
                          transformOrigin: `${position.x}% ${position.y}%`,
                          transition: "transform 0.2s ease-in-out",
                        }
                      : { transform: "scale(1)" }
                  }
                  alt={produk.nama}
                />
              </div>
              {/* foto lainnya - desktop */}
              <div className="flex md:hidden gap-2 p-2">
                {produk.fotoProduk.map((foto, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setFotoUtama(foto);
                      setSelectedIndex(index);
                    }}
                    className={`h-20 w-20 rounded-xl cursor-pointer transition-all duration-200 
                 border-[1px] hover:border-[#EE6D3F] ${
                   selectedIndex === index
                     ? "border-[#EE6D3F] ring-2 ring-[#EE6D3F]"
                     : "border-gray-500"
                 }`}
                  >
                    <img
                      src={foto}
                      className="rounded-xl h-full w-full object-cover"
                      alt={`foto-${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Produk */}
            <div className="basis-1/2 px-2 max-w-4xl">
              <div className="mb-2 text-3xl">{produk.nama}</div>
              <div className="text-xl font-extralight">
                Rp. {produk.harga.toLocaleString("id-ID")}
              </div>
              <div className="border-b-2 rounded-xl border-[#D2D0D0] mt-4" />

              {/* Deskripsi */}
              <div className="">
                <h1 className="mt-4 text-xl">Deskripsi</h1>
                <div className="text-sm font-extralight text-black overflow-hidden transition-all duration-300 h-[175px] overflow-y-auto">
                  {produk.deskripsi}
                </div>
              </div>
              <div className="mt-6 hidden md:block">
                <span className="text-[#EE6D3F] text-sm font-semibold">
                  Stok Produk :{" "}
                </span>
                <span className="text-sm font-semibold">{stokProduk} </span>
              </div>
              <div className="border-b-2 rounded-xl border-[#D2D0D0] " />
            </div>
          </div>

          {/* Galeri dan Tombol Beli */}
          <div className="hidden md:flex flex-col md:flex-row mt-4 gap-4 ">
            <div className="md:basis-1/2 flex gap-2 p-2 max-w-4xl">
              {produk.fotoProduk.map((foto, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setFotoUtama(foto);
                    setSelectedIndex(index);
                  }}
                  className={`h-20 w-20 rounded-xl cursor-pointer transition-all duration-200 
              border-[1px] hover:border-[#EE6D3F] ${
                selectedIndex === index
                  ? "border-[#EE6D3F] ring-2 ring-[#EE6D3F]"
                  : "border-gray-500"
              }`}
                >
                  <img
                    src={foto}
                    className="rounded-xl h-full w-full object-cover"
                    alt={`foto-${index}`}
                  />
                </div>
              ))}
            </div>

            {/* Jumlah & Beli — untuk Desktop */}
            <div className="basis-1/2 hidden md:block md:max-w-4xl md:px-4">
              <div className="flex justify-between">
                <h1 className="text-xl">Jumlah</h1>
                <div className="flex gap-x-2 items-center">
                  <div
                    onClick={() => jumlahProdukHandler("kurang")}
                    className="bg-[#E1DDDD] px-2 rounded-md cursor-pointer hover:bg-[#cac8c8]"
                  >
                    -
                  </div>
                  <div className="bg-[#E1DDDD] px-5 rounded-md">
                    {jumlahProduk}
                  </div>
                  <div
                    onClick={() => jumlahProdukHandler("tambahkan")}
                    className="bg-[#E1DDDD] px-2 rounded-md cursor-pointer hover:bg-[#cac8c8]"
                  >
                    +
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 mt-4">
                <div className="bg-[#E1DDDD] hover:bg-gray-300 w-fit p-2 text-xl rounded-lg cursor-pointer">
                  <AiOutlineShoppingCart />
                </div>
                <div className="flex bg-[#EE6D3F] hover:bg-[#cf582d] font-semibold text-white justify-center items-center w-full rounded-lg cursor-pointer">
                  Beli
                </div>
              </div>
            </div>
          </div>

          {/* Jumlah & Beli — Fixed Bottom di hp */}
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-black shadow-2xl p-4 border-t md:hidden z-50 ">
            <div className="">
              <span className="text-[#EE6D3F] text-xs font-semibold">
                Stok Produk :
              </span>
              <span className="text-xs font-semibold">10 </span>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-base font-medium">Jumlah</h1>
              <div className="flex gap-x-2 items-center">
                <div className="bg-[#E1DDDD] px-2 rounded-md cursor-pointer hover:bg-[#cac8c8]">
                  -
                </div>
                <div className="bg-[#E1DDDD] px-5 rounded-md">0</div>
                <div className="bg-[#E1DDDD] px-2 rounded-md cursor-pointer hover:bg-[#cac8c8]">
                  +
                </div>
              </div>
            </div>
            <div className="flex gap-x-2 mt-4">
              <div className="bg-[#E1DDDD] w-fit p-2 text-xl rounded-lg">
                <AiOutlineShoppingCart />
              </div>
              <div className="flex bg-[#EE6D3F] font-semibold text-white justify-center items-center w-full rounded-lg cursor-pointer">
                Beli
              </div>
            </div>
          </div>
        </div>
        {/* Bagian Toko  */}
        <div className="flex justify-between items-center px-4 py-2 border-[1px] border-[#ADB0B6] shadow-xl rounded-xl">
          <div className="flex items-center gap-x-5 ">
            <div className="h-16 w-16 bg-slate-300 rounded-full ">
              <img
                src={fotoToko}
                className="object-contain h-full w-full p-2"
                alt=""
              />
            </div>
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <div className="text-xl font-semibold hover:text-[#EE6D3F]">
                Toko
              </div>
              <div className="text-xs ">XX barang terjual</div>
            </div>
          </div>
          <div className="text-xl p-1 hover:scale-125  cursor-pointer">
            <IoChatboxEllipsesOutline />
          </div>
        </div>
        {/* Rekomendasi Produk  */}
        <div className="relative mt-10">
          <h2 className="text-xl mb-4">Produk lainnya di toko ini</h2>

          {/* Panah Kiri */}
          <button
            onClick={() => instanceRef?.current?.prev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>

          {/* Panah Kanan */}
          <button
            onClick={() => instanceRef?.current?.next()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <FaChevronRight />
          </button>

          {/* Slider */}
          <div ref={sliderRef} className="keen-slider pb-4">
            {produkList.map((item) => (
              <div
                key={item.id}
                className="keen-slider__slide p-2 hover:shadow-md rounded-xl cursor-pointer"
              >
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-40 object-contain rounded-xl border-[1px] border-gray-600 hover:scale-105 transition-all duration-300"
                />
                <div className="mt-2 text-sm text-black font-light">
                  {item.harga}
                </div>
                <div className="text-md font-medium text-black truncate">
                  {item.nama}
                </div>
                <div className="text-sm text-gray-500">{item.toko}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailProdukPage;
