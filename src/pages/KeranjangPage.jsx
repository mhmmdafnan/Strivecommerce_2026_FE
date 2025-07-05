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
  const [loading, setLoading] = useState(false);
  const [dbKeranjang, setDbKeranjang] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data keranjang dari localStorage saat komponen dimuat
    // const storedKeranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
    // setKeranjang(storedKeranjang);
  }, []);

  const handleCheckboxChange = (
    produkId,
    tokoId,
    namaProduk,
    namaToko,
    harga,
    qtty,
    variasi,
    path
  ) => {
    const produkBaru = {
      produkId,
      namaProduk,
      harga,
      qtty,
      variasi,
      path,
    };

    setDbKeranjang((prev) => {
      // Cek apakah toko sudah ada di keranjang
      const tokoIndex = prev.findIndex((t) => t.tokoId === tokoId);

      if (tokoIndex !== -1) {
        const toko = prev[tokoIndex];

        // Cek apakah produk sudah ada dalam produk[]
        const produkIndex = toko.produk.findIndex(
          (p) => p.produkId === produkId
        );

        if (produkIndex !== -1) {
          // Produk ditemukan → hapus produk dari toko.produk
          const updatedProduk = toko.produk.filter(
            (p) => p.produkId !== produkId
          );

          // Jika produk sudah kosong, hapus seluruh toko
          if (updatedProduk.length === 0) {
            return prev.filter((_, i) => i !== tokoIndex);
          }

          // Update array toko dengan produk yang sudah dihapus
          const updatedToko = {
            ...toko,
            produk: updatedProduk,
          };

          const updatedKeranjang = [...prev];
          updatedKeranjang[tokoIndex] = updatedToko;

          return updatedKeranjang;
        } else {
          // Produk belum ada → tambahkan ke produk[]
          const updatedToko = {
            ...toko,
            produk: [...toko.produk, produkBaru],
          };

          const updatedKeranjang = [...prev];
          updatedKeranjang[tokoIndex] = updatedToko;

          return updatedKeranjang;
        }
      } else {
        // Toko belum ada → buat entri toko dan produk baru
        return [
          ...prev,
          {
            tokoId,
            namaToko,
            produk: [produkBaru],
          },
        ];
      }
    });
  };

  const addTotal = (tokoId, produkId) => {
    // Tambah jumlah produk dalam keranjang
    console.log(tokoId, produkId);
    
    const newDbKeranjang = dbKeranjang.map(toko => {
      
      if (toko.tokoId === tokoId) {
        // console.log(toko);
        return {
          ...toko,
          produk: toko.produk.map(p => {
            
            if (p.produkId === produkId) {
              return { ...p, qtty: p.qtty + 1 };
            }
            return p;
          })
        };
      }
      return toko;
    });

    const newDataKeranjang =   dataKeranjang.map(toko => {
      if (toko.id === tokoId) {
        return {
          ...toko,
          product: toko.product.map(item => {
            if (item.product.id === produkId) {
              return {
                ...item,
                quantity: item.quantity + 1
              };
            }
            return item;
          })
        };
      }
      return toko;
    });

    setDataKeranjang(newDataKeranjang);
    setDbKeranjang(newDbKeranjang);
  };

  const subtractTotal = (tokoId, produkId) => {
    // Kurangi jumlah produk dalam keranjang
        
    const newDbKeranjang = dbKeranjang.map(toko => {
      
      if (toko.tokoId === tokoId) {
        // console.log(toko);
        return {
          ...toko,
          produk: toko.produk.map(p => {
            
            if (p.produkId === produkId) {
              return { ...p, qtty: p.qtty - 1 };
            }
            return p;
          })
        };
      }
      return toko;
    });

    const newDataKeranjang =   dataKeranjang.map(toko => {
      if (toko.id === tokoId) {
        return {
          ...toko,
          product: toko.product.map(item => {
            if (item.product.id === produkId) {
              return {
                ...item,
                quantity: item.quantity - 1
              };
            }
            return item;
          })
        };
      }
      return toko;
    });

    setDataKeranjang(newDataKeranjang);
    setDbKeranjang(newDbKeranjang);
  };

  const handleSelectAll = (tokoId, namaToko, produkList) => {
    setDbKeranjang((prev) => {
      const tokoIndex = prev.findIndex((t) => t.tokoId === tokoId);

      if (tokoIndex !== -1) {
        // ✅ Toko sudah ada → anggap sebagai "uncheck all", hapus toko dari keranjang
        return prev.filter((_, i) => i !== tokoIndex);
      }

      // ❌ Toko belum ada → anggap sebagai "select all", tambahkan semua produk

      const produkBaruSemua = produkList.map((p) => ({
        produkId: p.product.id,
        namaProduk: p.product.nama,
        harga: p.variasi.harga,
        variasi : p.variasi.nama,
        qtty: p.quantity || 1,
        path : p.product.path
      }));

      return [
        ...prev,
        {
          tokoId,
          namaToko,
          produk: produkBaruSemua,
        },
      ];
    });
  };

  const countSelectedProducts = () => {
    const produkIdSet = new Set();
    dbKeranjang.forEach((toko) => {
      toko.produk.forEach((produk) => {
        produkIdSet.add(produk.produkId);
      });
    });

    return produkIdSet.size;
  };

  // Fungsi untuk menghitung total harga dari produk yang dipilih
  const calculateTotal = () => {
    return dbKeranjang.reduce((totalSemuaToko, toko) => {
      const totalToko = toko.produk.reduce((subtotal, produk) => {
        const jumlah = produk.qtty || 1;
        return subtotal + produk.harga * jumlah;
      }, 0);

      return totalSemuaToko + totalToko;
    }, 0);
  };

  const handleCheckout = () => {
 
    navigate("/checkout", { state: { keranjang: dbKeranjang } });
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
          params: {
            userId: cookies.user_id,
          },
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
        setLoading(false);
      }
    };

    fetchKeranjang();
  }, []);

  useEffect(() => {
    // console.log(JSON.stringify(dbKeranjang));
    console.log(dbKeranjang);
  }, [dbKeranjang]);

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
              {loading ? (
                <div className="col-span-6 flex justify-center items-center h-80">
                  <Loading w={10} h={10} />
                </div>
              ) : (
                <>
                  {dataKeranjang &&
                    dataKeranjang.map((toko, id) => {
                      return (
                        <div key={id}>
                          <div
                            className="bg-white mb-4 py-1 w-full md:shadow-sm md:mx-auto mlg:max-w-[700px] rounded-xl"
                            key={toko.id}
                          >
                            <div className="nama-toko p-2">
                              <h2 className="ml-2 font-semibold">
                                <input
                                  className="pt-2  mr-2"
                                  type="checkbox"
                                  name="toko"
                                  id=""
                                  onClick={() =>
                                    handleSelectAll(
                                      toko.id,
                                      toko.toko,
                                      toko.product
                                    )
                                  }
                                />
                                {toko.toko}
                              </h2>
                            </div>
                            {toko.product.map((produk, idd) => {
                              return (
                                <div
                                  className="produk-list p-2 flex items-center"
                                  key={idd}
                                >
                                  <input
                                    className="pt-2 ml-2 mr-2 "
                                    type="checkbox"
                                    name="produk"
                                    id=""
                                    onClick={() =>
                                      handleCheckboxChange(
                                        produk.product.id,
                                        toko.id,
                                        produk.product.nama,
                                        toko.toko,
                                        produk.variasi.harga,
                                        produk.quantity,
                                        produk.variasi.nama,
                                        produk.product.path,
                                      )
                                    }
                                    checked={dbKeranjang.some(
                                      (dbToko) =>
                                        dbToko.tokoId === toko.id &&
                                        dbToko.produk.some(
                                          (p) =>
                                            p.produkId === produk.product.id
                                        )
                                    )}
                                  />
                                  <label
                                    htmlFor="produk"
                                    className="ml-2 flex  justify-between w-full"
                                  >
                                    <div className="flex items-center">
                                      <img
                                        src={`${apiUrl}/pict/${produk.product.id}${produk.product.path}`}
                                        className="w-16 rounded-xl h-16 object-cover"
                                        alt=""
                                      />
                                      <div className="ml-2">
                                        <h3 className="text-sm flex items-center">
                                          {produk.product.nama} {produk.variasi.nama != "-" && (
                                            <p className="text-[10px] ml-1 text-gray-500">({produk.variasi.nama})</p>
                                          )}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                          Rp.{" "}
                                          {produk.variasi.harga
                                            .toString()
                                            .replace(
                                              /\B(?=(\d{3})+(?!\d))/g,
                                              "."
                                            )}
                                        </p>
                                      </div>
                                    </div>
                                    <div
                                      className={`encounter justify-end items-center flex flex-1 `}
                                    >
                                      <div
                                        className={`bg-gray-200 mr-2 rounded-full px-2 py-1 text-xs text-gray-700 transition-all duration-500 ${
                                          dbKeranjang.some(
                                            (dbToko) =>
                                              dbToko.tokoId === toko.id &&
                                              dbToko.produk.some(
                                                (p) =>
                                                  p.produkId ===
                                                  produk.product.id
                                              )
                                          )
                                            ? "opacity-100"
                                            : "opacity-40"
                                        }`}
                                        onClick={() =>
                                          subtractTotal(toko.id, produk.product.id)
                                        }
                                      >
                                        -
                                      </div>
                                      <p className="text-xs text-gray-500">
                                        {produk.quantity}
                                      </p>
                                      <div
                                        className={`bg-gray-200 mx-2 rounded-full px-2 py-1 text-xs text-gray-700 transition-all duration-500 ${
                                          dbKeranjang.some(
                                            (dbToko) =>
                                              dbToko.tokoId === toko.id &&
                                              dbToko.produk.some(
                                                (p) =>
                                                  p.produkId ===
                                                  produk.product.id
                                              )
                                          )
                                            ? "opacity-100"
                                            : "opacity-40"
                                        }`}
                                        onClick={() =>
                                          addTotal(toko.id, produk.product.id)
                                        }
                                      >
                                        +
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </>
              )}
            </div>

            <div className="checkout ml-4 hidden lg:block p-4 max-w-[500px] h-fit rounded-md w-full  bg-white shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  <p className="font-light text-sm">Total:</p> Rp.{" "}
                  {calculateTotal() > 0
                    ? calculateTotal()
                        .toLocaleString()
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : "-"}
                </h2>
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-xl  hover:bg-orange-600"
                  onClick={handleCheckout}
                >
                  Checkout{" "}
                  {countSelectedProducts() > 0
                    ? `(${countSelectedProducts()})`
                    : ""}
                </button>
              </div>
            </div>
          </div>

          <div className="checkout lg:hidden p-4 h-fit fixed bottom-0  w-full bg-white shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                <p className="font-light text-sm">Total:</p> Rp.{" "}
                {calculateTotal() > 0
                  ? calculateTotal()
                      .toLocaleString()
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : "-"}
              </h2>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-xl  hover:bg-orange-600"
                onClick={handleCheckout}
              >
                Checkout{" "}
                {countSelectedProducts() > 0
                  ? `(${countSelectedProducts()})`
                  : ""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default KeranjangPage;
