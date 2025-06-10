import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Navbar from "../Component/Navbar";
import fotoToko from "../assets/img/produk/toko olahraga1.jpeg";
import produk1 from "../assets/img/produk/kursi 1.jpg";
import produk2 from "../assets/img/produk/kursi 2.jpg";
import produk3 from "../assets/img/produk/kursi 3.jpg";

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* container */}
      <div className="mx-20 font-bold h-screen p-4">
        {/* Produk Utama */}
        <div className="flex flex-row gap-x-4 mb-8 md:mb-16">
          <div className="relative basis-full lg:basis-2/3 h-80">
            <img
              src={fotoToko}
              className="w-full object-cover h-full rounded-3xl"
              alt=""
            />
            {/* Overlay Teks */}
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-tr from-[#C9C9C9] to-[#636363] opacity-95 text-white px-4 py-2 rounded-xl">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-2 items-center">
                  <div className="h-12 w-12">
                    <img
                      src={produk1}
                      className="w-full h-full object-cover rounded-3xl border-2 border-gray-200"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="text-lg font-semibold">Toko</h1>
                    <span className="text-sm font-extralight">
                      Rp. xxxxxx,00
                    </span>
                  </div>
                </div>
                <div className="flex bg-white rounded-full text-xl text-gray-800 items-center justify-center p-2">
                  <AiOutlineShoppingCart />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:basis-1/3 rounded-3xl h-80 w-full bg-slate-800">
            <img
              src={fotoToko}
              className="w-full object-cover h-full rounded-3xl"
              alt=""
            />
          </div>
        </div>
        {/* List Produk rekomendasi Karousel */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
          <div className="h-44 ">
            <img
              src={produk1}
              className="w-full h-full object-cover rounded-3xl border-2 border-gray-200"
              alt=""
            />
          </div>
          <div className="h-44 ">
            <img
              src={produk2}
              className="w-full h-full object-cover rounded-3xl border-2 border-gray-200"
              alt=""
            />
          </div>
          <div className="h-44 ">
            <img
              src={produk3}
              className="w-full h-full object-cover rounded-3xl border-2 border-gray-200"
              alt=""
            />
          </div>
          <div className="h-44 ">
            <img
              src={produk1}
              className="w-full h-full object-cover rounded-3xl border-2 border-gray-200"
              alt=""
            />
          </div>
          <div className="h-44 ">
            <img
              src={produk2}
              className="w-full h-full object-cover rounded-3xl border-2 border-gray-200"
              alt=""
            />
          </div>
          <div className="h-44 ">
            <img
              src={produk3}
              className="w-full h-full object-cover rounded-3xl border-2 border-gray-200"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
