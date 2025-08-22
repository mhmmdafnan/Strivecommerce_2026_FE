import react, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../Component/Navbar";
import { CiLocationOn } from "react-icons/ci";
import SelectPengiriman from "../Component/SelectPengiriman";
import PilihAlamatModal from "../Component/PilihAlamatModal";
import BcaLogo from "../assets/img/logo/BCA.png";
import BRILogo from "../assets/img/logo/BRIVA.png";
import Gopay from "../assets/img/logo/gopay.png";
import Mandiri from "../assets/img/logo/Mandiri.png";
import { useCookies } from "react-cookie";
import Loading from "../Component/Loading";

const CheckoutPage = () => {
  const location = useLocation();
  const keranjang = location.state?.keranjang || [];
  const apiUrl = import.meta.env.VITE_API_URL; // URL API
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [pengiriman, setPengiriman] = useState(0);
  const [ongkir, setOngkir] = useState(12000);
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const ongkirSementara = [12000, 15000, 45000, 60000, 23000];
  const [showAlamatModal, setShowAlamatModal] = useState(false);
  const [dataAlamat, setDataAlamat] = useState([]);
  const [alamatAktif, setAlamatAktif] = useState([]);
  const [loadingAlamat, setLoadingAlamat] = useState(true);
  const navigate = useNavigate();
  const [cookie, setCokie, removeCookie] = useCookies();

  const handlePengirimanChange = (e) => {
    setPengiriman(e.target.value);
    setOngkir(ongkirSementara[e.target.value]);
  };

  const onCloseAlamatModal = () => {
    setShowAlamatModal(false);
  };

  const showAlamatModalHandler = (id) => {
    setAlamatAktif(dataAlamat.find((alamat) => alamat.id == id));
  };

  const onClickGantiAlamat = () => {
    setShowAlamatModal(true);
  };

  const generateOngkir = async () => {
    try {
      const response = await axios.get(
        "https://api-sandbox.collaborator.komerce.id/tariff/api/v1/calculate",
        {
          headers: {
            "x-api-key": "yourapikey",
          },
          params: {
            shipper_destination_id: 31597,
            receiver_destination_id: 368,
            weight: 490,
            item_value: 50000,
            cod: "no",
          },
        }
      );
    } catch (error) {
      // console.error("Error saat menghitung ongkir:", error);
    }
  };

  function totalPayment() {
    let total = 0;

    keranjang.forEach((toko) => {
      toko.produk.forEach((produk) => {
        total += produk.harga * produk.qtty;
      });
    });

    return total + 212000 + ongkir;
  }

  const creatTransaksi = async () => {
    // setLoadingAlamat(true);
    try {
      const produkIds = keranjang[0].produk.map((item) => item.produkId);
      const tokoId = keranjang[0].tokoId;
      const response = await axios.post(`${apiUrl}/api/v1/transaksi`, {
        userId: cookie.user_id,
        tokoId: tokoId,
        status: 0,
        harga: totalPayment(),
        time: new Date(),
        listIdProduk: JSON.stringify(produkIds),
      });
      const id = response.data.data;

      if (response.data.success) {
        navigate("/payment/" + id);
      } else {
        setShowLoginError(true);
      }
    } catch (error) {
      // setShowLoginError(true);
      // console.log(error);
    } finally {
      // setLoadingAlamat(false);
    }
  };

  useEffect(() => {
    const fetchProduk = async () => {
      setLoadingAlamat(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/alamat/` + cookie["user_id"],
          {}
        );

        if (response.data.success) {
          const alamatFromBE = response.data.data;

          setDataAlamat(alamatFromBE);
          const defaultAlamat = alamatFromBE.find(
            (alamat) => alamat.is_default === 1
          );
          setAlamatAktif(defaultAlamat ?? null);
        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        // console.log(error);
      } finally {
        setLoadingAlamat(false);
      }
    };

    const getOngkir = async () => {
      const res = await axios
        .get(`${apiUrl}/rajaongkir/ongkir`, {
          headers: {
            key: import.meta.env.VITE_ONGKIR_API_KEY,
          },
          params: {
            province: 34,
            city: "Majene",
            district: "Banggae",
          },
        })
        .catch((err) => {
          // console.error("Error:", err);
        });

      return res.data.rajaongkir.results;
    };

    getOngkir();
    fetchProduk();
  }, []);

  return (
    <>
      <PilihAlamatModal
        isOpen={showAlamatModal}
        onClose={onCloseAlamatModal}
        onSelect={showAlamatModalHandler}
        data={dataAlamat}
      />

      <div className="judul p-4">
        <h1 className="">Checkout</h1>
      </div>

      <div className="flex justify-center bg-gray-100 lg:h-[calc(100vh-72px)] ">
        <div className="pembungkus-utama mt-4 lg:mt-10 w-full md:max-w-[800px] lg:max-w-[1000px]">
          <div className="lg:flex w-ful ">
            <div className="lg:min-w-[650px] ">
              <div className="alamat bg-white mx-2 p-2 rounded-lg  shadow-md md:flex md:justify-between justify-center items-center">
                {loadingAlamat ? (
                  <div className="col-span-6 w-full flex justify-center items-center h-40">
                    <Loading w={10} h={10} />
                  </div>
                ) : (
                  <>
                    <div className="">
                      <p className="text-xs text-gray-600">Alamat Pengiriman</p>
                      <div className="flex items-center flex-row gap-2 mt-1">
                        <CiLocationOn />
                        <p>
                          {alamatAktif.bangunan} - {alamatAktif.nama}
                        </p>
                      </div>
                      <div className="font-light text-xs text-gray-500 truncate">
                        {alamatAktif.provinsi.nama},{" "}
                        {alamatAktif.kabupaten.nama},{" "}
                        {alamatAktif.kecamatan.nama}
                      </div>
                      <div className="font-light text-xs text-gray-500 truncate">
                        {alamatAktif.detail}
                      </div>
                      <div className="font-light text-xs text-gray-500">
                        {alamatAktif.kodePos}
                      </div>
                      <div className="font-light text-xs text-gray-500">
                        {alamatAktif.notelp}
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-2 md:mt-0">
                      <div
                        className="bg-orange-500 text-center min-w-36 max-w-96 text-white text-xs px-4 py-2 rounded-lg cursor-pointer"
                        onClick={onClickGantiAlamat}
                      >
                        Ganti Alamat
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="product-checkout mt-2 mx-2 p-2 bg-white rounded-lg shadow-md">
                {keranjang.map((toko) => {
                  // Filter produk yang isChecked = true
                  // const checkedProducts = toko.product.filter((produk) => produk.isChecked);
                  // if (checkedProducts.length === 0) return null; // Skip toko jika tidak ada produk terpilih

                  return (
                    <div
                      className=" lg:bg-white mb-4 py-1 w-full md:mx-auto mlg:max-w-[700px] rounded-xl"
                      key={toko.id}
                    >
                      <div className="nama-toko p-2" key={toko.id}>
                        <h2 className="ml-2 font-semibold">{toko.toko}</h2>
                      </div>
                      {toko.produk.map((produk) => (
                        <div
                          className="produk-list p-2 flex items-center"
                          key={produk.produkId}
                        >
                          <label
                            htmlFor="produk"
                            className="ml-2 flex  justify-between w-full"
                          >
                            <div className="flex items-center">
                              <img
                                src={apiUrl + JSON.parse(produk.path)[0]}
                                className="w-16 rounded-xl h-16 object-cover"
                                alt=""
                              />
                              <div className="ml-2">
                                <h3 className="text-sm ">
                                  {produk.namaProduk}{" "}
                                  <span className="text-gray-500 text-sm">
                                    ({produk.qtty})
                                  </span>{" "}
                                  {produk.variasi != "-" && (
                                    <p className="text-[10px] ml-1 text-gray-500">
                                      ({produk.variasi})
                                    </p>
                                  )}
                                </h3>
                              </div>
                              {/* <div className="justify-end items-center flex flex-1 ml-4">
                                                                <div className={`bg-gray-200 mr-2 rounded-full px-2 py-1 text-xs text-gray-700 transition-all duration-500 ${produk.isChecked ? "opacity-100" : "opacity-40"}`} onClick={() => subtractTotal(toko.id, produk.id)}>
                                                                    -
                                                                </div>
                                                                <p className="text-xs text-gray-500">
                                                                    {produk.total}
                                                                </p>
                                                                <div className={`bg-gray-200 mx-2 rounded-full px-2 py-1 text-xs text-gray-700 transition-all duration-500 ${produk.isChecked ? "opacity-100" : "opacity-40"}`} onClick={() => addTotal(toko.id, produk.id)}>
                                                                    +
                                                                </div>
                                                                <div className="ml-4">
                                                                    <MdDelete className="text-md flex"/>
                                                                </div>
                                                            </div> */}
                            </div>
                            <div
                              className={`encounter justify-end items-center flex flex-1 `}
                            >
                              <p className="text-xs text-gray-500">
                                Rp.{" "}
                                {(produk.harga * produk.qtty)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              </p>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  );
                })}

                <div className="total-checkout p-2 border-t border-gray-200">
                  <div className="flex text-sm justify-between items-center">
                    <h2 className="font-semibold">Total Barang</h2>
                    <p className="font-semibold">
                      {/* Rp. {keranjang.reduce((total, toko) => {
                                                return total + toko.product.reduce((subTotal, produk) => {
                                                    return subTotal + (produk.isChecked ? produk.harga * produk.total : 0);
                                                }, 0);
                                            }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} */}
                    </p>
                  </div>
                </div>

                <div className="total-checkout p-2 border-t border-gray-200">
                  <div className="pilih-pengiriman">
                    <h2 className="text-sm font-semibold mb-1">
                      Pilih Metode Pengiriman
                    </h2>
                    <div className="flex items-center">
                      <SelectPengiriman
                        handleChange={handlePengirimanChange}
                        pengiriman={pengiriman}
                      />
                      <p className="ml-4 text-sm text-gray-500">3-7 Hari</p>
                    </div>
                  </div>
                  <div className="flex mt-4 text-sm text-gray-500 justify-between items-center">
                    <h2 className="">Ongkos Kirim</h2>
                    <p className="">
                      Rp.{" "}
                      {ongkir.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                  </div>
                  <div className="flex mt-4 text-sm text-gray-500 justify-between items-center">
                    <h2 className="">PPN</h2>
                    <p className="">Rp. 212.000</p>
                  </div>
                </div>
                <div className="total-checkout p-2 border-t border-gray-200">
                  <div className="flex text-lg justify-between items-center">
                    <h2 className="font-semibold">Total</h2>
                    <p className="font-semibold">
                      Rp.{" "}
                      {totalPayment()
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mb-10 lg:mb-0">
              <div className="pembayaran p-2 mx-2 mt-2 lg:mt-0 bg-white rounded-lg shadow-md">
                <div className="title">
                  <h4>Piilh Metode Pembayaran</h4>
                </div>

                <label className="flex items-center my-2  justify-between gap-2">
                  <div className="flex items-center">
                    <img src={BRILogo} alt="" className="w-8 object-contain" />
                    <p className="ml-2">Transfer Bank BRI</p>
                  </div>
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value="BRIVA"
                    checked={metodePembayaran === "BRIVA"}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                  />
                </label>
                {/* <label className="flex items-center my-2  justify-between gap-2">
                  <div className="flex items-center">
                    <img src={BcaLogo} alt="" className="w-8 object-contain" />
                    <p className="ml-2">BCA Virtual Account</p>
                  </div>
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value="BCAVA"
                    checked={metodePembayaran === "BCAVA"}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                  />
                </label>
                <label className="flex items-center my-2  justify-between gap-2">
                  <div className="flex items-center">
                    <img src={Mandiri} alt="" className="w-8 object-contain" />
                    <p className="ml-2">Mandiri Virtual Account</p>
                  </div>
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value="Mandiri"
                    checked={metodePembayaran === "Mandiri"}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                  />
                </label>
                <label className="flex items-center my-black justify-between gap-2">
                  <div className="flex items-center">
                    <img src={Gopay} alt="" className="w-8 object-contain" />
                    <p className="ml-2">Gopay</p>
                  </div>
                  <input
                    type="radio"
                    name="metodePembayaran"
                    value="gopay"
                    checked={metodePembayaran === "gopay"}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                  />
                </label> */}
              </div>

              <div
                className="button-bayar text-white py-2 mt-2 mx-2 bg-orange-500 text-center rounded-lg shadow-md"
                onClick={creatTransaksi}
              >
                Bayar Sekarang
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
