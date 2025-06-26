import Slider from "react-slick"; // tambahkan import ini
import React, { useEffect, useRef, useState } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

import Navbar from "../Component/Navbar";
import ModalShare from "../Component/ShareModal";
import produk1 from "../assets/img/produk/kursi 1.jpg";
import produk2 from "../assets/img/produk/kursi 2.jpg";
import produk3 from "../assets/img/produk/kursi 3.jpg";
import fotoToko from "../assets/img/market foto.png";
import { data, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import LoginModal from "../Component/LoginModal";
import Loading from "../Component/Loading";


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

const DetailProdukPage = ({isLoginModal, setIsLoginModal}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [indexStok, setIndexStok] = useState(0);
  const location = useLocation();
  const idProduk = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const [fotoProduk, setFotoProduk] = useState([]);
  const [fotoUtama, setFotoUtama] = useState(produk.fotoProduk[0]);
  const [loadingProduk, setLoadingProduk] = useState(false);
  const [dataProduk, setDataProduk] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [jumlahProduk, setJumlahProduk] = useState(1);
  const [stokProduk, setStokProduk] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const shareUrl = `${window.location.origin}${location.pathname}`;
  const shareText = `Cek produk ${produk.nama}, cuma di sini!`;
  const [loadingKeranjang, setLoadingKeranjang] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["isLoggedIn"]);

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

  const CustomPrev = (props) => (
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
      onClick={props.onClick}
    >
      <FaChevronLeft />
    </div>
  );
  
  const onSuccessLogin = (data) => {
    console.log(data);
    setCookie("isLoggedIn", true);
    setCookie("token", data.data.token);
    console.log(data.data.id_user);
    
    setCookie("id_user", data.data.id_user)
    
    setIsLoginModal(false)
    // console.log(cookies["token"], data.data.token);
  }


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
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const onKeranjangClick = () => {
    if (!cookies.isLoggedIn){
      setIsLoginModal(true);
    }else{
      setLoadingKeranjang(true);
      
      console.log(cookies.id_user);      
      console.log(dataProduk.variasi[indexStok].id);
      console.log(dataProduk.id)
      
      axios.post(`${apiUrl}/api/v1/add_to_cart`, {
        productId : dataProduk.id,
        userId : cookies.id_user,
        variasiId : dataProduk.variasi[indexStok].id,
        quantity : jumlahProduk,
      })
      .then((res) => {
          console.log("berhasil: ", res);
      }).catch(() => {
        alert("Gagal menambahkan ke keranjang!");
        console.error(err);
      }).finally(() => {
        setLoadingKeranjang(false);
      });
    }
  }

  useEffect(() => {
    
    // Simulasi pengambilan data produk berdasarkan idProduk
    const fetchProduk = async () => {
      setLoadingProduk(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/product/` + idProduk, {});
        console.log(response.data.data);
        
        if (response.data.success) {
          setDataProduk(response.data.data);
          // const fotolist = response.data.data.path.split(",");
          // setFotoProduk(fotolist);

          const fotoList = response.data.data.path.split(",");
          const fotoObj = fotoList.map((item, i) => ({ [`item${i+1}`]: item }));
          setFotoProduk(fotoObj);

        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        console.log(error);
        
      } finally {
        setLoadingProduk(false);
      }
    }

    fetchProduk();

  }, []);

  return (
    <div className="dark:bg-[#393E41]">
      <LoginModal
        isOpen={isLoginModal}
        onClose={() => setIsLoginModal(false)}
        onSuccess={(data) => onSuccessLogin(data)}
      />
      
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-5 mb-20 md:mt-0">
        {/* Navigation */}
        <div className="flex gap-x-1 p-1 my-2">
          <div className="text-sm text-gray-400 hover:text-gray-800 cursor-pointer">
            Produk /
          </div>
          <div className="text-sm text-gray-400 hover:text-gray-800 cursor-pointer">
            Nama Toko /
          </div>
          <div className="text-sm text-[#EE6D3F] dark:text-white hover:text-[#bc5b38] cursor-pointer">
            {
              !loadingProduk && (
                <>
                  {dataProduk ? dataProduk.nama : "-"}
                </>
              )
            }
          </div>
        </div>
        {/* Konten Pembelian Produk  */}
        <div className="mb-10 dark:text-white">
          <div className="flex flex-col md:flex-row gap-10">
            {
              loadingProduk ? (
                <div className="col-span-6 flex justify-center items-center w-full">
                  <Loading w={10} h={10} />
                </div>
              ) : (
                  <>
                      
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
                          {fotoProduk.map((foto, index) => (
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
                  </>
              )
            }

            {/* Detail Produk */}
            <div className="basis-1/2 px-2 max-w-4xl">
              <div className="mb-2 text-3xl">
                  {
                    loadingProduk ? (
                      <div className="col-span-6 flex justify-center items-center h-full">
                        <Loading w={10} h={10} />
                      </div>
                    ) : (
                        <div className="flex items-end">
                          <div>
                           {dataProduk ? dataProduk.nama  : ""}
                          </div>
                          <div className="text-sm text-gray-500 ml-2">
                           {dataProduk ? "(" +  dataProduk.variasi[indexStok].nama + ")"  : ""}
                          </div>
                           {/* " (" + dataProduk.variasi[indexStok].nama + ")" */}

                        </div>
                    )
                  }
              </div>
              <div className="text-xl font-extralight">
                {
                    loadingProduk ? (
                      <></>
                    ) : (
                        <>
                           Rp. {dataProduk ? dataProduk.variasi[indexStok].harga.toLocaleString("id-ID") : "-"}
                        </>
                    )
                  }
                
              </div>
              <div className="border-b-2 rounded-xl border-[#D2D0D0] mt-4" />

              {/* Deskripsi */}
              <div className="">
                <h1 className="mt-4 text-xl">Deskripsi</h1>
                <div className="text-sm font-extralight text-black dark:text-gray-100 overflow-hidden transition-all duration-300 md:h-[150px] h-[50px] overflow-y-auto">
                  {
                    loadingProduk ? (
                      <div className="col-span-6 flex justify-center items-center h-full">
                        <Loading w={10} h={10} />
                      </div>
                    ) : (
                        <>
                           {dataProduk ? dataProduk.desc : "-"}
                        </>
                    )
                  }
                </div>
              </div>
              <div className="variasi mb-4">
                <div className="variasi flex gap-3">
                  {
                    !loadingProduk && dataProduk && dataProduk.variasi.length > 1 && Array.isArray(dataProduk.variasi) && (
                      <>
                        {dataProduk.variasi.map((variasi, index) => (
                          <div
                            onClick={() => {
                              setIndexStok(index);
                            }} 
                            key={index} 
                            className={`${index == indexStok ? 'bg-[#EE6D3F] text-white dark:bg-[#4b5563] ' : 'bg-gray-200'} px-2 py-1 dark:bg-[#222831] dark:hover:dark:bg-[#4b5563] rounded-lg cursor-pointer hover:bg-[#EE6D3F]  hover:text-white transition-colors duration-300`}>
                            {variasi.nama} {/* tampilkan nama variasi, atau info lain */}
                          </div>
                        ))}
                      </>
                    )
                  }
                </div>
              </div>
              <div className="mt-4 hidden md:block">
                <span className="text-[#EE6D3F] dark:text-gray-400 text-sm font-semibold">
                  Stok Produk :{" "}
                </span>
                <span className="text-sm font-semibold">
                  {
                    loadingProduk ? (
                      <>
                      </>
                    ) : (
                        <>
                           {dataProduk ? dataProduk.variasi[0].stok : "-"}
                        </>
                    )
                  }
                </span>
              </div>
              <div className="border-b-2 rounded-xl border-[#D2D0D0] " />
            </div>
          </div>

          {/* Galeri dan Tombol Beli */}
          <div className="hidden md:flex flex-col md:flex-row mt-2 gap-4 ">
            <div className="md:basis-1/2 flex gap-2 p-2 max-w-4xl">
              {fotoProduk.map((foto, index) => (
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
            {
              !loadingProduk && (
                <div className="basis-1/2 hidden md:block md:max-w-4xl md:px-4">
                  <div className="flex justify-between">
                    <h1 className="text-xl">Jumlah</h1>
                    <div className="flex gap-x-2 items-center">
                      <div
                        onClick={() => jumlahProdukHandler("kurang")}
                        className="bg-[#E1DDDD] dark:bg-[#222831] dark:hover:dark:bg-[#4b5563] px-2 rounded-md cursor-pointer hover:bg-[#cac8c8]"
                      >
                        -
                      </div>
                      <div className="bg-[#E1DDDD] dark:bg-[#222831] px-5 rounded-md">
                        {jumlahProduk}
                      </div>
                      <div
                        onClick={() => jumlahProdukHandler("tambahkan")}
                        className="bg-[#E1DDDD] dark:bg-[#222831] dark:hover:dark:bg-[#4b5563] px-2 rounded-md cursor-pointer hover:bg-[#cac8c8]"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-2 mt-4">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="p-2 border-black dark:bg-[#222831] dark:border-[#222831] border-2 dark:hover:dark:bg-[#4b5563] rounded-xl hover:text-[#EE6D3F] dark:hover:text-white dark:hover:border-[#4b5563] hover:border-[#EE6D3F] cursor-pointer transition-all duration-200"
                    >
                      <FaShareNodes className="hover:scale-125 transition-transform duration-500" />
                    </button>
                    <div className="bg-[#E1DDDD] dark:bg-[#222831] hover:bg-gray-300 dark:hover:dark:bg-[#4b5563] w-10 p-2 text-xl rounded-lg cursor-pointer" onClick={onKeranjangClick}>
                      {
                        loadingKeranjang ? (
                          <>
                            <div className="col-span-6 flex  justify-center items-center h-full">
                              <Loading w={4} h={4} />
                            </div>
                          </>
                        ) : (
                          <>
                            <AiOutlineShoppingCart className="hover:scale-125 transition-transform duration-500"/>
                          </>
                        )
                      }
                    </div>
                    <div className="flex bg-[#EE6D3F] dark:bg-[#222831] dark:hover:dark:bg-[#4b5563] hover:bg-[#cf582d] font-semibold text-white justify-center items-center w-full rounded-lg cursor-pointer">
                      Beli
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          {/* Jumlah & Beli — Fixed Bottom di hp */}
          {
            !loadingProduk && (
              <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#393E46] dark:border-0 shadow-black shadow-2xl p-4 border-t md:hidden z-50 ">
                <div className="">
                  <span className="text-[#EE6D3F] text-xs font-semibold dark:text-gray-400">
                    Stok Produk :
                  </span>
                  <span className="text-xs font-semibold">
                    {
                      loadingProduk ? (
                        <>
                        </>
                      ) : (
                          <>
                            {dataProduk ? dataProduk.variasi[0].stok : "-"}
                          </>
                      )
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-base font-medium">Jumlah</h1>
                  <div className="flex gap-x-2 items-center">
                    <div className="bg-[#E1DDDD] dark:bg-[#222831] px-2 rounded-md cursor-pointer hover:bg-[#cac8c8]">
                      -
                    </div>
                    <div className="bg-[#E1DDDD] dark:bg-[#222831] px-5 rounded-md">0</div>
                    <div className="bg-[#E1DDDD] dark:bg-[#222831] px-2 rounded-md cursor-pointer hover:bg-[#cac8c8]">
                      +
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-2 mt-4">
                  <div
                    onClick={() => setOpenModal(true)}
                    className="p-2 border-black border-2 dark:bg-[#222831] dark:border-[#222831] rounded-xl hover:text-[#EE6D3F] hover:border-[#EE6D3F] cursor-pointer transition-all duration-200"
                  >
                    <FaShareNodes className="hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div className="bg-[#E1DDDD] dark:bg-[#222831] w-10 p-2 text-xl rounded-lg" onClick={onKeranjangClick}>
                    {
                      loadingKeranjang ? (
                        <>
                          <div className="col-span-6 flex justify-center items-center h-full">
                            <Loading w={4} h={4} />
                          </div>
                        </>
                      ) : (
                        <>
                          <AiOutlineShoppingCart />
                        </>
                      )
                    }
                  </div>
                  <div className="flex bg-[#EE6D3F] dark:bg-[#222831] font-semibold text-white justify-center items-center w-full rounded-lg cursor-pointer">
                    Beli
                  </div>
                </div>
              </div>
            )
          }
        </div>
        {/* Bagian Toko  */}
        <div className="flex justify-between dark:bg-[#222831] items-center px-4 py-2 border-[1px] border-[#ADB0B6] dark:border-0 shadow-xl rounded-xl">
          
          {
            loadingProduk ? (
              <>
                <div className="col-span-6 flex justify-center items-center h-full">
                  <Loading w={7} h={7} />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-x-5 dark:text-white">
                  <div className="h-16 w-16 bg-slate-300 rounded-full ">
                    <img
                      src={fotoToko}
                      className="object-contain h-full w-full p-2"
                      alt=""
                    />
                  </div>
                  <div onClick={() => navigate("/toko")} className="cursor-pointer">
                    <div className="text-xl font-semibold hover:text-[#EE6D3F]">
                      {dataProduk ? dataProduk.user.nama_toko : ""}
                    </div>
                    <div className="text-xs ">XX barang terjual</div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    window.open(`https://wa.me/62${dataProduk ? dataProduk.user.telp.replace(/^0/,"") : ``}`, "_blank");
                  }}
                  className="text-xl p-1 hover:scale-125  cursor-pointer"
                >
                  <IoChatboxEllipsesOutline className="dark:text-white"/>
                </div>
              </>


            )
          }
          
        </div>
        {/* Rekomendasi Produk  */}
        <div className="relative mt-10 dark:text-white">
          <h2 className="text-xl mb-4">Produk lainnya di toko ini</h2>

          <Slider
            {...sliderSettings}
            prevArrow={<CustomPrev />}
            nextArrow={<CustomNext />}
          >
            {produkList.map((item) => (
              <div
                key={item.id}
                className="p-2 hover:shadow-md rounded-xl cursor-pointer"
              >
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-40 object-contain rounded-xl border border-gray-600 hover:scale-105 transition-all duration-300"
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
          </Slider>
        </div>
      </div>
      <ModalShare
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        url={shareUrl}
        text={shareText}
      />
    </div>
  );
};

export default DetailProdukPage;
