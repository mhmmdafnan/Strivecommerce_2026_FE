import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import produk from "../assets/img/produk/kursi 1.jpg";
import { useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../Component/Loading";

const KeranjangPage = () => {

    const [cookies, setCookie, removeCookie] = useCookies();
    const apiUrl = import.meta.env.VITE_API_URL; // URL API
    const [dataKeranjang, setDataKeranjang] = useState([]);
    const [loading,setLoading] = useState(false);
    const [dbKeranjang, setDbKeranjang] = useState([
        {
            toko: "Toko Mebelesia",
            id: 0,
            product : [{
                    id: 1,
                    nama: "Kursi Kayu Jati 1",
                    harga: 1000000,
                    gambar: produk,
                    total: 1,
                    isChecked: false,
                },
                {
                    id: 2,
                    nama: "Kursi Kayu Jati 2",
                    harga: 1100000,
                    gambar: produk,
                    total: 1,
                    isChecked: false,
                },
            ]
        },
        {
            toko: "Toko Olahraga",
            id: 1,
            product : [{
                    id: 3,
                    nama: "Sepatu Lari",
                    harga: 500000,
                    gambar: produk,
                    total: 1,
                    isChecked: false,
                },
                {
                    id: 4,
                    nama: "Bola Basket",
                    harga: 300000,
                    gambar: produk,
                    total: 1,
                    isChecked: false,
                },
                {
                    id: 5,
                    nama: "Bola Basket",
                    harga: 300000,
                    gambar: produk,
                    total: 1,
                    isChecked: false,
                },
                {
                    id: 6,
                    nama: "Bola Basket",
                    harga: 300000,
                    gambar: produk,
                    total: 1,
                    isChecked: false,
                },
                {
                    id: 7,
                    nama: "Bola Basket",
                    harga: 300000,
                    gambar: produk,
                    total: 1,
                    isChecked: false,
                },
            ]
        }
    ]);

    
  const [keranjang, setKeranjang] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data keranjang dari localStorage saat komponen dimuat
    const storedKeranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    setKeranjang(storedKeranjang);
  }, []);

  const handleCheckboxChange = (tokoId, produkId) => {
    // Perbarui status checkbox untuk produk tertentu
    const updatedKeranjang = dbKeranjang.map((toko) => {
      if (toko.id === tokoId) {
        return {
          ...toko,
          product: toko.product.map((produk) => {
            if (produk.id === produkId) {
              return { ...produk, isChecked: !produk.isChecked };
            }
            return produk;
          }),
        };
      }
      return toko;
    });
    setDbKeranjang(updatedKeranjang);
  };

  const addTotal = (tokoId, produkId) => {
    // Tambah jumlah produk dalam keranjang
    const updatedKeranjang = dbKeranjang.map((toko) => {
      if (toko.id === tokoId) {
        return {
          ...toko,
          product: toko.product.map((produk) => {
            if (produk.id === produkId) {
              return { ...produk, total: produk.total + 1 };
            }
            return produk;
          }),
        };
      }
      return toko;
    });
    setDbKeranjang(updatedKeranjang);
  };

  const subtractTotal = (tokoId, produkId) => {
    // Kurangi jumlah produk dalam keranjang
    const updatedKeranjang = dbKeranjang.map((toko) => {
      if (toko.id === tokoId) {
        return {
          ...toko,
          product: toko.product.map((produk) => {
            if (produk.id === produkId) {
              return { ...produk, total: Math.max(0, produk.total - 1) };
            }
            return produk;
          }),
        };
      }
      return toko;
    });
    setDbKeranjang(updatedKeranjang);
  };

  const handleSelectAll = (tokoId) => {
    // Pilih atau batalkan pilihan semua produk dalam toko tertentu
    const updatedKeranjang = dbKeranjang.map((toko) => {
      if (toko.id === tokoId) {
        const allChecked = toko.product.every((produk) => produk.isChecked);
        return {
          ...toko,
          product: toko.product.map((produk) => ({
            ...produk,
            isChecked: !allChecked,
          })),
        };
      }
      return toko;
    });
    setDbKeranjang(updatedKeranjang);
  };

  const countSelectedProducts = () => {
    // Hitung jumlah produk yang dipilih
    return dbKeranjang.reduce((count, toko) => {
      return (
        count +
        toko.product.reduce((tokoCount, produk) => {
          return produk.isChecked ? tokoCount + 1 : tokoCount;
        }, 0)
      );
    }, 0);
  };

  // Fungsi untuk menghitung total harga dari produk yang dipilih
  const calculateTotal = () => {
    return dbKeranjang.reduce((total, toko) => {
      return (
        total +
        toko.product.reduce((tokoTotal, produk) => {
          return produk.isChecked ? tokoTotal + produk.harga * produk.total : tokoTotal;
        }, 0)
      );
    }, 0);
  };

  const handleCheckout = () => {
    // Ambil hanya produk yang isChecked = true
    const checkedKeranjang = dbKeranjang
        .map((toko) => ({
        ...toko,
        product: toko.product.filter((produk) => produk.isChecked),
        }))
        .filter((toko) => toko.product.length > 0); // Hanya toko yang punya produk terpilih

    // Navigasi ke halaman checkout dengan data
    navigate("/checkout", { state: { keranjang: checkedKeranjang } });
    };

  function groupByToko(data) {
    const grouped = {};
    data.forEach((item) => {
      const namaToko = item.product.user.nama_toko;
      if (!grouped[namaToko]) {
        grouped[namaToko] = [];
      }
      grouped[namaToko].push(item);
    });
    // Ubah ke array of object { toko, product: [...] }
    return Object.entries(grouped).map(([toko, products], idx) => ({
      toko,
      id: idx,
      product: products,
    }));
  }

  useEffect(() => {
    // Simulasi pengambilan data produk berdasarkan idProduk
    const fetchKeranjang = async () => {
      setLoading(true);
      try {
        console.log(cookies.user_id);
        
        const response = await axios.get(`${apiUrl}/api/v1/cart`, {
          params : {
            userId : cookies.user_id
          }
        });
        // console.log(response.data.data);
        
        if (response.data.success) {
          const grouped = groupByToko(response.data.data);
          console.log(grouped);
          
          setDataKeranjang(grouped);

        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        console.log(error);
        
      } finally {
        setLoading(false)
      }
    }

    fetchKeranjang();

  }, []);

  return (
    <div className="w-full  ">
        {/* <Navbar /> */}
        
        <div className="header p-4">
            <h1>Keranjang</h1>
        </div>

        <div className="flex justify-center bg-gray-100 min-h-[calc(100vh-130px)]">
            <div className="lg:max-w-[1000px] w-full">
                <div className="keranjang-header lg:min-w-[650px] lg:bg-gray-100 p-4 w-full flex justify-center lg:justify-start "> 
                    <div className="keranjang-list mb-28 w-full lg:max-w-[900px] mx-auto lg:mx-0 ">
                        {
                          loading ? (
                            <div className="col-span-6 flex justify-center items-center h-80">
                              <Loading w={10} h={10} />
                            </div>
                          ) : (
                            <>
                            {
                              dataKeranjang && (
                                dataKeranjang.map((toko,id) => {
                                  return (
                                    <div key={id}>
                                      <div className="bg-white mb-4 py-1 w-full md:shadow-sm md:mx-auto mlg:max-w-[700px] rounded-xl" key={toko.id}>
                                        <div className="nama-toko p-2">
                                            <h2 className="ml-2 font-semibold"> <input className="pt-2  mr-2" type="checkbox" name="toko" id="" onClick={() => handleSelectAll(toko.id)} />{toko.toko}</h2>
                                        </div>
                                      {
                                        toko.product.map((produk,idd) => {
                                          return (
                                          <div className="produk-list p-2 flex items-center" key={idd}>
                                              <input className="pt-2 ml-2 mr-2 " type="checkbox" name="produk" id="" onClick={() => handleCheckboxChange(toko.id, produk.id)} checked={produk.isChecked} />
                                              <label htmlFor="produk" className="ml-2 flex  justify-between w-full">
                                                  <div className="flex items-center">
                                                      <img src={`${apiUrl}/pict/${produk.product.id}${produk.product.path}`} className="w-16 rounded-xl h-16 object-cover" alt="" />
                                                      <div className="ml-2">
                                                          <h3 className="text-sm ">{produk.product.nama}</h3>
                                                          <p className="text-xs text-gray-500">Rp. {produk.variasi.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                                                      </div>
                                                  </div>
                                                  <div className={`encounter justify-end items-center flex flex-1 `}>
                                                      <div className={`bg-gray-200 mr-2 rounded-full px-2 py-1 text-xs text-gray-700 transition-all duration-500 ${produk.isChecked ? "opacity-100" : "opacity-40"}`} onClick={() => subtractTotal(toko.id, produk.id)}>
                                                          -
                                                      </div>
                                                      <p className="text-xs text-gray-500">
                                                          {produk.quantity}
                                                      </p>
                                                      <div className={`bg-gray-200 mx-2 rounded-full px-2 py-1 text-xs text-gray-700 transition-all duration-500 ${produk.isChecked ? "opacity-100" : "opacity-40"}`} onClick={() => addTotal(toko.id, produk.id)}>
                                                          +
                                                      </div>
                                                  </div>
                                              </label>
                                          </div>

                                          )
                                        })
                                      }
                                      </div>
                                    </div>
                                  )
                                })

                              )
                            }
                            </>
                          )
                          
                        }

                    </div>    

                    <div className="checkout ml-4 hidden lg:block p-4 max-w-[500px] h-fit rounded-md w-full  bg-white shadow-md">
                  {
                    dbKeranjang.map((toko) => {
                        // Filter produk yang isChecked = true
                        const checkedProducts = toko.product.filter((produk) => produk.isChecked);
                        if (checkedProducts.length === 0) return null; // Skip toko jika tidak ada produk terpilih

                        return (
                        <div className="bg-gray-100 lg:bg-white mb-4 py-1 w-full  md:mx-auto mlg:max-w-[700px] rounded-xl" key={toko.id}>
                            <div className="nama-toko p-2" key={toko.id}>
                            <h2 className="ml-2 font-semibold">
                                {toko.toko}
                            </h2>
                            </div>
                            {
                            checkedProducts.map((produk) => (
                                <div className="produk-list p-2 flex items-center" key={produk.id}>
                                <label htmlFor="produk" className="ml-2 flex justify-between w-full">
                                    <div className="flex items-center">
                                    <div className="ml-2">
                                        <h3 className="text-sm ">{produk.nama}</h3>
                                        <p className="text-xs text-gray-500">Rp. {produk.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                                    </div>
                                    </div>
                                    <div className="encounter justify-end items-center flex flex-1">
                                    <p className="text-xs text-gray-500">
                                        {produk.total}
                                    </p>
                                    </div>
                                </label>
                                </div>
                            ))
                            }
                        </div>
                        );
                    })
                    }
                        
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold"><p className="font-light text-sm">Total:</p> Rp. { calculateTotal() > 0 ? calculateTotal().toLocaleString().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '-'}</h2>
                            <button 
                                className="bg-orange-500 text-white px-4 py-2 rounded-xl  hover:bg-orange-600"
                                onClick={handleCheckout}
                            >
                                Checkout {countSelectedProducts() > 0 ? `(${countSelectedProducts()})` : ""}
                            </button>
                        </div>
                    </div>

                </div>


                <div className="checkout lg:hidden p-4 h-fit fixed bottom-0  w-full bg-white shadow-md">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold"><p className="font-light text-sm">Total:</p> Rp. { calculateTotal() > 0 ? calculateTotal().toLocaleString().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '-'}</h2>
                        <button 
                            className="bg-orange-500 text-white px-4 py-2 rounded-xl  hover:bg-orange-600"
                            onClick={handleCheckout}
                        >
                            Checkout {countSelectedProducts() > 0 ? `(${countSelectedProducts()})` : ""}
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>
  );
}
export default KeranjangPage;