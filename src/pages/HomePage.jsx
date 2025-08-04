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
import logoHomePage from "../assets/img/logo_homepage.png";
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

  const getFirstImagePath = (path) => {
    try {
      if (!path) return "/fallback-image.png";
      const parsed = JSON.parse(path);
      if (Array.isArray(parsed)) return apiUrl + parsed[0];
      if (typeof parsed === "string") return apiUrl + parsed;
      return "/fallback-image.png";
    } catch (e) {
      console.warn("Invalid path:", path);
      return "/fallback-image.png";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil dua data secara paralel
        const [allProdukRes, sliderProdukRes] = await Promise.all([
          axios.get(`${apiUrl}/api/v1/product`, {
            params: {
              total: 20,
            },
          }),
          axios.get(`${apiUrl}/api/v1/product`, {
            params: {
              total: 10,
              orderBy: "harga_asc",
            },
          }),
        ]);

        console.log("slider", sliderProdukRes.data.data);
        console.log("all", allProdukRes.data.data);

        // Set data produk umum
        if (allProdukRes.data.success) {
          setDataProduk(allProdukRes.data.data);

          // if (cookies["token"]) {
          //   setCookie("isLoggedIn", true, { path: "/" });
          //   setCookie("token", cookies["token"], { path: "/" });
          // }
        }

        // Set produk slider
        if (sliderProdukRes.data.success) {
          console.log(sliderProdukRes.data);

          setProdukSlider(sliderProdukRes.data.data);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    // console.log(cookies);

    fetchData();
  }, []);

  return (
    <>
      {/* container */}
      <div className="max-w-7xl mx-auto h-screen dark:bg-[#121212] bg-white px-5 md:px-20 py-5">
        {/* Produk Utama */}
        <div className="flex md:flex-col-2 items-center  justify-center md:justify-between h-60 bg-gradient-to-r from-[#f76b1c] to-[#fcae1e] rounded-xl shadow-lg py-5 px-4 md:pl-10">
          <div>
            <div className="font-light text-white">Selamat Datang di</div>
            <div className="font-extrabold mt-4 mb-2 text-3xl md:text-4xl text-white">
              STRIVE MARKET
            </div>
            <div className="text-white">
              E-comerce UMKM pertama se-
              <span className="font-semibold">Sulawesi Barat</span>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center w-40 h-40 mr-10">
            <img src={logoHomePage} className="w-full h-full" alt="" />
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
                  <div
                    key={item.id}
                    className="p-2 hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => navigate("/detailProduk/" + item.id)}
                  >
                    <img
                      src={getFirstImagePath(item.path)}
                      alt={item.nama}
                      className="w-full h-40 object-contain rounded-xl border border-gray-600 "
                    />
                    <div className="mt-2 text-sm text-black font-light">
                      {item.harga
                        ? `Rp. ${item.harga.toLocaleString("id-ID")}`
                        : "Harga tidak tersedia"}
                    </div>
                    <div className="text-md font-medium text-black truncate">
                      {item.nama}
                    </div>
                    <div className="flex items-center gap-x-1 text-sm font-extralight text-gray-500 truncate">
                      <MdOutlineStoreMallDirectory />
                      {item.user.nama_toko}
                    </div>
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
                      src={getFirstImagePath(produk.path)}
                      className="w-full h-40 object-contain rounded-3xl border-2 border-gray-200 hover:scale-105 transition-all duration-300"
                      alt={produk.nama}
                    />
                    <div className="p-2">
                      <div className="text-xs font-extralight text-black">
                        Rp. {produk.harga.toLocaleString("id-ID") ?? 0}
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
