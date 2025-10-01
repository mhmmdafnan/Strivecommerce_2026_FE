import { React, useEffect, useState } from "react";
import Slider from "react-slick"; // tambahkan import ini

import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";
import Footer from "../Component/Footer";
import produk3 from "../assets/img/produk/kursi 3.jpg";
import logoHomePage from "../assets/img/logo_homepage.png";
import logoStrive from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Loading from "../Component/Loading";
import axios from "axios";
import KategoriUMKM from "../Component/KategoriUMKM";
// import cookies from "react-cookies";

const HomePage = () => {
  const navigate = useNavigate();
  const [dataProduk, setDataProduk] = useState([]);
  const [produkSlider, setProdukSlider] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [hasilSearch, setHasilSearch] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [onFocusSearch, setOnFocusSearch] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalProduk, setTotalProduk] = useState();
  const dataPerPage = 12; // jumlah data per halaman
  const [selectedKategori, setSelectedKategori] = useState(null);

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
      // console.warn("Invalid path:", path);
      return "/fallback-image.png";
    }
  };

  const handleNextClick = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePrevClick = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleSelectKategori = (id) => {
    console.log("Selected Kategori ID:", id);
    setSelectedKategori(id);
    // Lakukan sesuatu dengan ID kategori yang dipilih
  };

  useEffect(() => {
    const fetchSliderProduk = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/v1/product`, {
          params: {
            total: 10,
            orderBy: "harga_asc",
          },
        });

        if (res.data.success) {
          setProdukSlider(res.data.data);
        }
      } catch (error) {
        // console.error("Gagal fetch produk slider:", error);
      }
    };

    fetchSliderProduk();
  }, []);

  useEffect(() => {
    const fetchMainProduk = async () => {
      setLoadingPage(true);
      try {
        let allProdukRes; // <-- deklarasi di luar
        let jumlahRes;
        if (selectedKategori == null) {
          jumlahRes = await axios.get(apiUrl + `/api/v1/product/count`);
          allProdukRes = await axios.get(`${apiUrl}/api/v1/product`, {
            params: {
              total: dataPerPage,
              page: pageNumber,
            },
          });
        } else {
          jumlahRes = await axios.get(apiUrl + `/api/v1/product/count`, {
            params: {
              kategori: selectedKategori,
            },
          });
          allProdukRes = await axios.get(`${apiUrl}/api/v1/product`, {
            params: {
              total: dataPerPage,
              page: pageNumber,
              kategori: selectedKategori,
            },
          });
        }
        if (allProdukRes.data.success) {
          setTotalProduk(jumlahRes.data.total);
          setDataProduk(allProdukRes.data.data);
        }
      } catch (error) {
        // console.error("Gagal fetch produk utama:", error);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchMainProduk();
  }, [pageNumber, selectedKategori]);

  useEffect(() => {
    setLoadingSearch(true);
    if (searchQuery.trim() === "") {
      setHasilSearch([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoadingSearch(true);
      // console.log(`${apiUrl}/api/v1/product/search?keyword=${encodeURIComponent(searchQuery)}`);

      axios
        .get(
          `${apiUrl}/api/v1/product/search?keyword=${encodeURIComponent(
            searchQuery
          )}`
        )
        .then((res) => {
          if (res.data.success) {
            setHasilSearch(res.data.data); // atau res.data.result sesuai struktur
          } else {
            setHasilSearch([]);
          }
        })
        .catch((err) => {
          // console.error("Error fetching data:", err);
          setHasilSearch([]);
        })
        .finally(() => {
          setLoadingSearch(false);
        });
    }, 500); // 500ms delay (debounce)

    return () => clearTimeout(delayDebounce); // clear timer saat searchQuery berubah
  }, [searchQuery]);

  return (
    <>
      {/* container */}
      <div className="max-w-7xl  mx-auto font-bold dark:bg-[#dataPerPage1212]  px-5 md:px-20 py-5">
        {/* Produk Utama */}
        <div className="flex md:flex-col-2 items-center  justify-center md:justify-between h-60 bg-gradient-to-l from-[#ed4c4c] to-[#990808] rounded-xl shadow-lg py-5 px-4 md:pl-10">
          <div>
            <h1 className="font-light text-white">Selamat Datang di</h1>
            <h2 className="font-extrabold mt-4 mb-2 text-3xl md:text-4xl text-white">
              STRIVE MARKET
            </h2>
            {/* <div>
              <img src={logoStrive} className="w-48" alt="" />
            </div> */}
            <div className="text-white text-sm mt-4">
              E-comerce UMKM pertama se-
              <span className="font-semibold">Sulawesi Barat</span>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center w-40 h-40 mr-10">
            <img src={logoHomePage} className="w-full h-full" alt="" />
          </div>
        </div>
        {/* Search */}
        <div className="relative w-full flex justify-center mt-10 mb-5">
          <input
            type="text"
            placeholder="Temukan produk..."
            className="w-full p-2 outline-none font-normal border-2 border-gray-300 rounded-lg max-w-md active:border-[#990808] focus:border-[#990808] transition-all duration-500 md:focus:scale-105"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setOnFocusSearch(true)}
            onBlur={() => {
              setTimeout(() => setOnFocusSearch(false), 200); // delay agar klik pada hasil bisa diproses
            }}
          />

          {searchQuery.trim() !== "" && onFocusSearch && (
            <div className="absolute top-full left-1/2 font-normal -translate-x-1/2 w-full max-w-md bg-[#F4F2EF] rounded-lg z-50 mt-2 shadow-md">
              {loadingSearch ? (
                <p className="px-4 py-2">Loading...</p>
              ) : hasilSearch.length > 0 ? (
                hasilSearch.map((item, i) => (
                  <div
                    key={i}
                    className={`px-6 text-sm py-3 cursor-pointer hover:bg-gray-300 ${
                      i < hasilSearch.length - 1 ? "border-b border-white" : ""
                    }`}
                    onClick={() => {
                      navigate("/detailProduk/" + item.id);
                      setSearchQuery("");
                      setOnFocusSearch(false);
                    }}
                  >
                    <div className="flex items-center gap-x-2">
                      <img
                        src={getFirstImagePath(item.path)}
                        alt={item.nama}
                        className="h-8 object-contain rounded-md"
                      />
                      <div className="w-full">
                        <div>{item.nama}</div>
                        <div className="text-gray-500 text-xs">
                          {item.user.nama_toko}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">Tidak ditemukan</p>
              )}
            </div>
          )}
        </div>
        {/* Rekomendasi Produk  */}
        {produkSlider.length > 5 && (
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
                      className="p-2 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() => navigate("/detailProduk/" + item.id)}
                    >
                      <img
                        src={getFirstImagePath(item.path)}
                        alt={item.nama}
                        className="w-full h-40 object-contain rounded-3xl border-2  border-gray-200 "
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
        )}

        {/* List Produk */}
        <div className="relative mt-10">
          <KategoriUMKM onSelectCategory={handleSelectKategori} />
          <h2 className="text-xl mt-4 mb-2">Daftar Produk</h2>

          {/* Kategori Filter */}

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
            {loadingPage ? (
              <div className="col-span-6 flex justify-center items-center h-80">
                <Loading w={10} h={10} />
              </div>
            ) : (
              <>
                {dataProduk.map((produk) => (
                  <div
                    onClick={() => navigate("/detailProduk/" + produk.id)}
                    key={produk.id}
                    className="h-34 cursor-pointer hover:shadow-xl rounded-xl p-2"
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
          {!loadingPage && (
            <div className="flex justify-center items-center gap-x-2 mt-20">
              {pageNumber > 1 && (
                <span
                  className="bg-[#990808] cursor-pointer rounded-xl px-3 text-white"
                  onClick={handlePrevClick}
                >
                  Prev
                </span>
              )}

              {Array.from(
                { length: Math.ceil(totalProduk / dataPerPage) },
                (_, i) => i + 1
              )
                .filter(
                  (page) =>
                    // Tampilkan halaman yang dekat dengan halaman aktif (maks 5 halaman)
                    Math.abs(page - pageNumber) <= 2 ||
                    page === 1 ||
                    page === totalProduk
                )
                .map((page, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const isCurrent = page === pageNumber;
                  return (
                    <span
                      key={page}
                      className={`px-3 py-1 rounded-xl cursor-pointer ${
                        isCurrent
                          ? "bg-[#990808] text-white font-bold"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`}
                      onClick={() => setPageNumber(page)}
                    >
                      {page}
                    </span>
                  );
                })}

              {pageNumber < Math.ceil(totalProduk / dataPerPage) && (
                <span
                  className="bg-[#990808] cursor-pointer rounded-xl px-3 text-white"
                  onClick={handleNextClick}
                >
                  Next
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
