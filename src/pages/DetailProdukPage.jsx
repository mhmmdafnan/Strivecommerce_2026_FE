import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Navbar from "../Component/Navbar";
import produk1 from "../assets/img/produk/kursi 1.jpg";
import produk2 from "../assets/img/produk/kursi 2.jpg";
import produk3 from "../assets/img/produk/kursi 3.jpg";
import foto from "../assets/img/produk/toko olahraga1.jpeg";

const DetailProdukPage = () => {
  return (
    <>
      <Navbar />
      {/* Konten */}
      <div className="h-screen px-5 md:px-10 py-5">
        {/* Navigation  */}
        <div className="flex gap-x-1 p-1 my-2">
          <div className="text-sm text-gray-600">Produk/</div>
          <div className="text-sm text-gray-600">Nama Toko/</div>
          <div className="text-sm text-black">Nama Produk</div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          {/* Konten Kiri  */}
          <div className="basis-1/2">
            <div className="flex rounded-xl border-2 max-h-[400px] h-[350px] items-center justify-center">
              <img
                src={produk1}
                className="object-contain h-full w-full rounded-xl object-center"
                alt=""
              />
            </div>
            <div className="flex gap-x-1 p-2">
              <div className="h-20 w-20 border-2 border-gray-500 rounded-xl">
                <img src={produk1} className="rounded-xl" alt="" />
              </div>
              <div className="h-20 w-20 border-2 border-gray-500 rounded-xl">
                <img src={produk2} className="rounded-xl" alt="" />
              </div>
              <div className="h-20 w-20 border-2 border-gray-500 rounded-xl">
                <img src={produk3} className="rounded-xl" alt="" />
              </div>
            </div>
          </div>
          {/* Konten Kanan  */}
          <div className="basis-1/2 px-2 h-[350px]">
            {/* Nama Produk  */}
            <div className="mb-2 text-3xl">Nama Produk</div>
            {/* Harga  */}
            <div className=" text-xl font-extralight">Rp. 100.000</div>
            <div className="border-b-2 rounded-xl border-[#D2D0D0] mt-4"></div>
            {/* Deskripsi Produk  */}
            <div className="">
              <h1 className="mt-4 text-xl">Deskripsi</h1>
              <div className="text-sm font-extralight text-black">
                Lorem ipsum dolor sit ametconsectetur adipisicing elit. Quam,
                dolore? Nulla fugiat vero minima corporis, totam iste error
                adipisci, rem incidunt esse nam! Voluptates, eaque nesciunt
                ratione quia praesentium nihil! Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Repudiandae soluta ad cumque ex
                impedit. Quia enim, numquam ut ea natus quaerat sunt minus
                accusamus eaque voluptatibus. Dolorem nostrum culpa iusto.
              </div>
            </div>
            <div className="border-b-2 rounded-xl border-[#D2D0D0] mt-10"></div>
            {/* Beli Produk  */}
            <div className="">
              <div className="flex justify-between mt-4">
                <h1 className="text-xl">Jumlah</h1>
                <div className="flex gap-x-2 items-center">
                  <div className="bg-[#E1DDDD] px-2 rounded-md w-fit h-fit cursor-pointer hover:bg-[#cac8c8]">
                    -
                  </div>
                  <div className="bg-[#E1DDDD] px-5 rounded-md w-fit h-fit cursor-pointer">
                    0
                  </div>
                  <div className="bg-[#E1DDDD] px-2 rounded-md w-fit h-fit cursor-pointer hover:bg-[#cac8c8]">
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
        </div>
      </div>
    </>
  );
};

export default DetailProdukPage;
