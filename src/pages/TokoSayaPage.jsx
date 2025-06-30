import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import ava from "../assets/img/picture1.jpeg";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";

import produk from "../assets/img/produk/kursi 1.jpg";
import Navbar from "../Component/Navbar";

const TokoSayaPage = () => {
  const [produkList, setProdukList] = useState([
    {
      id: 1,
      nama: "Produk A",
      kategori: "Elektronik",
      stok: 50,
      terjual: 25,
      harga: 100000,
      gambar: produk,
    },
    {
      id: 2,
      nama: "Produk B",
      kategori: "Pakaian",
      stok: 80,
      terjual: 30,
      harga: 75000,
      gambar: produk,
    },
    {
      id: 3,
      nama: "Produk C",
      kategori: "Makanan",
      stok: 120,
      terjual: 70,
      harga: 15000,
      gambar: produk,
    },
    {
      id: 4,
      nama: "Produk D",
      kategori: "Aksesoris",
      stok: 40,
      terjual: 20,
      harga: 50000,
      gambar: produk,
    },
    {
      id: 5,
      nama: "Produk E",
      kategori: "Mainan",
      stok: 60,
      terjual: 15,
      harga: 30000,
      gambar: produk,
    },
    {
      id: 6,
      nama: "Produk F",
      kategori: "Peralatan Rumah Tangga",
      stok: 30,
      terjual: 10,
      harga: 200000,
      gambar: produk,
    },
    {
      id: 7,
      nama: "Produk G",
      kategori: "Olahraga",
      stok: 90,
      terjual: 40,
      harga: 120000,
      gambar: produk,
    },
    {
      id: 8,
      nama: "Produk H",
      kategori: "Kecantikan",
      stok: 70,
      terjual: 35,
      harga: 85000,
      gambar: produk,
    },
    {
      id: 9,
      nama: "Produk I",
      kategori: "Buku",
      stok: 110,
      terjual: 55,
      harga: 45000,
      gambar: produk,
    },
    {
      id: 10,
      nama: "Produk J",
      kategori: "Peralatan Kantor",
      stok: 20,
      terjual: 5,
      harga: 60000,
      gambar: produk,
    },
    {
      id: 11,
      nama: "Produk K",
      kategori: "Elektronik",
      stok: 50,
      terjual: 25,
      harga: 100000,
      gambar: produk,
    },
  ]);
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const toko = { id: 1, nama: "Toko Saya" };

  const handleSelectAll = () => {
    const allChecked = produkList.every((item) => item.isChecked);
    const updatedList = produkList.map((item) => ({
      ...item,
      isChecked: !allChecked,
    }));
    setProdukList(updatedList);
  };
  const handleCheckboxChange = (produkId) => {
    const updatedList = produkList.map((item) =>
      item.id === produkId ? { ...item, isChecked: !item.isChecked } : item
    );
    setProdukList(updatedList);
  };
  const handleTambahKlik = () => {
    // open new page
    window.open("/tambahProduk", "_blank");
  };
  const handleEditKlik = (idProduk) => {
    // buka tab baru ke halaman /tambahProduk dengan query parameter
    window.open(`/editProduk/${idProduk}`, "_blank");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 mb-20 md:mt-0">
        <h1 className="text-sm text-gray-600 cursor-pointer">Toko Saya</h1>

        <div className="bg-[#E9E9E9] shadow-lg border-[1px]  rounded-lg px-10 py-6 mt-4 max-w-5xl mx-auto">
          <div className="flex mb-4">
            <h1 className="font-semibold">Informasi Toko</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 mb-6 ">
            {/* Kartu Foto Profil */}
            <div className="flex justify-center md:justify-start md:basis-1/2 max-w-[300px]  w-full">
              <div className="bg-[#E9E9E9] rounded-lg p-4 border-2 border-[#EE6D3F] shadow-md">
                <div className="w-full h-50 relative">
                  <img
                    src={ava}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                  {/* Overlay Ubah Foto */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] text-[#EE6D3F] hover:scale-105 font-semibold text-lg px-2 py-1 border-2 border-[#EE6D3F] rounded-lg text-center cursor-pointer transition-transform duration-300">
                    Ubah Foto
                  </div>
                </div>

                {/* Info Ukuran File */}
                <div className="text-xs mt-4 px-2">
                  Besar file:
                  <ul className="list-disc list-inside mb-2 px-1">
                    <li>Max 2 MB</li>
                  </ul>
                  Format:
                  <ul className="list-disc list-inside px-1">
                    <li>JPG, JPEG, PNG</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Diri */}
            <div className="md:basis-1/2 px-2 md:px-0 w-full ">
              <div className="flex justify-between items-center mb-2 md:mb-4">
                <h1 className="text-xl font-bold text-gray-800">Nama Toko</h1>
              </div>

              <div className="text-sm space-y-2 mb-4">
                <div className="grid grid-cols-2 w-60 lg:w-72 items-center">
                  <h2 className="">Nama Pengguna</h2>
                  <p className="text-xs w-40 lg:w-80 font-extralight">
                    : John Doe
                  </p>
                </div>
                <div className="grid grid-cols-2 w-60 lg:w-72 items-center">
                  <h2 className="">Nomor Telepon</h2>
                  <p className="text-xs w-40 lg:w-80 font-extralight">
                    : +62 812-3456-7890
                  </p>
                </div>
                <div className="grid grid-cols-2 w-60 lg:w-72 items-center">
                  <h2 className="">Produk Terjual</h2>
                  <p className="text-xs w-40 lg:w-80 font-extralight">
                    : 5 Produk
                  </p>
                </div>
                <div className="grid grid-cols-2 w-60 lg:w-72 items-center">
                  <h2 className="">Alamat</h2>
                  <p className="text-xs w-40 lg:w-80 font-extralight">
                    : Jl. Kebon Jeruk No. 27, Jakarta
                  </p>
                </div>
                <div className="grid grid-cols-2 w-60 lg:w-72 items-center">
                  <h2 className="">Rating</h2>
                  <p className="text-xs w-40 lg:w-80 font-extralight">
                    : 4.5 (sangat baik)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#E9E9E9] shadow-lg border-[1px]  rounded-lg px-10 py-6 mt-4 max-w-5xl mx-auto">
          <div className="flex mb-4 justify-between">
            <h1 className="font-semibold">Daftar Produk</h1>
            <div
              onClick={handleTambahKlik}
              className="bg-[#EE6D3F] text-white px-4 rounded-lg cursor-pointer hover:bg-[#d25f35] transition-colors duration-300 flex items-center gap-2"
            >
              Tambah
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="table-area min-w-[900px]">
              {/* Header */}
              <div className="grid grid-cols-7 bg-[#dbd9d9] font-semibold text-center px-2 py-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      produkList.length > 0 &&
                      produkList.every((item) => item.isChecked)
                    }
                    onChange={handleSelectAll}
                  />
                  ID Produk
                </div>
                <div>Nama Produk</div>
                <div>Kategori</div>
                <div>Stok</div>
                <div>Terjual</div>
                <div>Harga</div>
                <div>Aksi</div>
              </div>

              {/* Body */}
              <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-300">
                {produkList.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-7 items-center text-center px-2 py-2 hover:bg-gray-100 transition duration-200"
                  >
                    <div className="flex gap-x-4 items-center">
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      {item.id}
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <div>
                        <img
                          className="h-10 w-10 rounded-xl border-2 border-gray-400 object-contain"
                          src={item.gambar}
                          alt=""
                        />
                      </div>
                      <div>{item.nama}</div>
                    </div>
                    <div>{item.kategori}</div>
                    <div>{item.stok} pcs</div>
                    <div>{item.terjual} pcs</div>
                    <div>Rp {item.harga.toLocaleString("id-ID")}</div>
                    <div className="flex justify-center gap-2">
                      <div
                        onClick={() => handleEditKlik(item.id)}
                        className="text-gray-800 hover:text-[#EE6D3F] cursor-pointer"
                      >
                        <MdOutlineEdit className="text-xl" />
                      </div>
                      <div className="text-red-500 hover:text-red-700 cursor-pointer">
                        <MdOutlineDeleteOutline className="text-xl" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokoSayaPage;
