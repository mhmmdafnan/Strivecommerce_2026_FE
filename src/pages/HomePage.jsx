import { React, useEffect, useState } from "react";
import Slider from "react-slick"; // tambahkan import ini

import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

import Navbar from "../Component/Navbar";
import fotoToko from "../assets/img/produk/toko olahraga1.jpeg";
import produk1 from "../assets/img/produk/kursi 1.jpg";
import produk2 from "../assets/img/produk/kursi 2.jpg";
import produk3 from "../assets/img/produk/kursi 3.jpg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Loading from "../Component/Loading";
import axios from "axios";
// import cookies from "react-cookies";

const HomePage = () => {
  const navigate = useNavigate();
  const [dataProduk, setDataProduk] = useState([]);
  const [produkSlider, setProdukSlider] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const CustomPrev = (props) => (
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
      onClick={props.onClick}
    >
      <FaChevronLeft />
    </div>
  );

  const CustomNext = (props) => (
    <div
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
      onClick={props.onClick}
    >
      <FaChevronRight />
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil dua data secara paralel
        const [allProdukRes, sliderProdukRes] = await Promise.all([
          axios.get(`${apiUrl}/api/v1/product`, {
            params: {
              total: 12,
            },
          }),
          axios.get(`${apiUrl}/api/v1/product`, {
            params: {
              total: 10,
              orderBy: "harga_asc",
            },
          }),
        ]);

        console.log(sliderProdukRes.data.data);

        // Set data produk umum
        if (allProdukRes.data.success) {
          setDataProduk(allProdukRes.data.data);

          if (cookies["token"]) {
            setCookie("isLoggedIn", true, { path: "/" });
            setCookie("token", cookies["token"], { path: "/" });
          }
        }

        // Set produk slider
        if (sliderProdukRes.data.success) {
          setProdukSlider(sliderProdukRes.data.data);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>

      {/* container */}
      <div className="max-w-7xl mx-auto font-bold h-screen px-5 md:px-20 py-5">
        {/* Produk Utama */}
        <div className="flex flex-row gap-x-4 mb-2 md:mb-4">
          <div className="relative basis-full lg:basis-2/3 h-80">
            {/* Overlay Teks Atas */}
            <div className="absolute top-3 left-4 w-fit bg-[#FE5D26] bg-opacity-80 text-white px-4 py-2 rounded-xl cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-1 md:gap-x-2 items-center">
                  <div className="flex text-4xl items-center justify-center hover:scale-110 transition-all duration-300 ">
                    <MdOutlineStoreMallDirectory />
                  </div>
                  <div className="group max-w-20 md:max-w-40 overflow-hidden">
                    <h1 className="text-lg font-semibold whitespace-nowrap group-hover:animate-marquee">
                      Toko Olahraga Unsulbar
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <img
              src={fotoToko}
              className="w-full object-cover h-full rounded-3xl"
              alt=""
            />
            {/* Overlay Teks Bawah */}
            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-tr from-[#C9C9C9] to-[#636363] opacity-95 text-white px-4 py-2 rounded-xl hover:scale-95 transition-all duration-500 cursor-pointer">
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
                    <span className="text-sm font-extralight">Rp. xxxxxx</span>
                  </div>
                </div>
                <div className="flex bg-white rounded-full text-xl text-gray-800 items-center justify-center p-2  hover:scale-125 transition-all duration-300">
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
        {/* Rekomendasi Produk  */}
        <div className="relative mt-10">
          <h2 className="text-xl mb-4">Rekomendasi Produk</h2>

          {loading ? (
            <div className="col-span-6 flex justify-center items-center h-40">
              <Loading w={10} h={10} />
            </div>
          ) : (
            <>
              <Slider
                {...sliderSettings}
                prevArrow={<CustomPrev />}
                nextArrow={<CustomNext />}
              >
                {produkSlider.map((item) => (
                  <div key={item.id} className="p-2">
                    <img
                      src={apiUrl + "/pict/" + item.id + item.path}
                      alt={item.nama}
                      className="w-full h-40 object-contain rounded-xl border border-gray-600 hover:scale-105 transition-all duration-300"
                    />
                    <div className="mt-2 text-sm text-black font-light">
                      {item.variasi?.[0]?.harga
                        ? `Rp. ${item.variasi[0].harga.toLocaleString("id-ID")}`
                        : "Harga tidak tersedia"}
                    </div>
                    <div className="text-md font-medium text-black truncate">
                      {item.nama}
                    </div>
                    <div className="text-sm text-gray-500">{item.toko}</div>
                  </div>
                ))}
              </Slider>
            </>
          )}
        </div>

        {/* List Produk */}
        <div className="relative mt-10">
          <h2 className="text-xl mb-4">Daftar Produk</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
            {loading ? (
              <div className="col-span-6 flex justify-center items-center h-80">
                <Loading w={10} h={10} />
              </div>
            ) : (
              <>
                {dataProduk.map((produk) => (
                  <div
                    onClick={() => navigate("/detailProduk/" + produk.id)}
                    key={produk.id}
                    className="h-34 cursor-pointer hover:shadow-md rounded-xl p-2"
                  >
                    <img
                      src={apiUrl + "/pict/" + produk.id + produk.path}
                      className="w-full h-30 object-cover rounded-3xl border-2 border-gray-200 hover:scale-105 transition-all duration-300"
                      alt={produk.nama}
                    />
                    <div className="p-2">
                      <div className="text-xs font-extralight text-black">
                        Rp. {(produk.variasi[0].harga).toLocaleString("id-ID")}
                      </div>
                      <div className="text-md font-medium text-black truncate">
                        {produk.nama}
                      </div>
                      <div className="flex items-center gap-x-1 text-sm font-extralight text-gray-500 truncate">
                        <MdOutlineStoreMallDirectory />
                        {produk.user.nama_toko}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
