import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { data, useNavigate, useParams } from "react-router-dom";
import Loading from "../Component/Loading";
// useEffect

const CheckoutPage = () => {
  //   console.log(keranjang);
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL; // URL API
  const [copyRek, setCopyRek] = useState(false);
  const [copyTotal, setCopyTotal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataPayment, setDataPayment] = useState({});
  const navigate = useNavigate();

  const [cookies, setCokie, removeCookie] = useCookies();

  const handleCopyRek = async () => {
    try {
      await navigator.clipboard.writeText(dataPayment?.toko?.rek_toko);
      setCopyRek(true);
      setTimeout(() => setCopyRek(false), 2000); // Reset pesan setelah 2 detik
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

  const handleCopyTotal = async () => {
    try {
      await navigator.clipboard.writeText(dataPayment?.harga);
      setCopyTotal(true);
      setTimeout(() => setCopyTotal(false), 2000); // Reset pesan setelah 2 detik
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(cookies.user_id);

        const response = await axios.get(`${apiUrl}/api/v1/transaksi`, {
          params: {
            transaksiId: id,
            userId: cookies.user_id,
          },
        });
        // console.log(response.data.data);

        if (response.data.data == null) {
          navigate("/keranjang");
        } else {
          console.log(response.data.data);
          setDataPayment(response.data.data);
        }
      } catch (error) {
        // navigate('/keranjang');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="judul p-4">
        <h1 className="">Payment</h1>
      </div>

      <div className="flex justify-center bg-gray-100 lg:h-[calc(100vh-72px)]  ">
        <div className="pembungkus-utama p-4 mt-4 lg:mt-10 w-full sm:max-w-[600px] md:max-w-[600px] lg:max-w-[600px]">
          <div className="bg-white p-4 shadow-lg rounded-lg">
            {loading ? (
              <div className="w-full flex justify-center items-center">
                <Loading w={10} h={10} />
              </div>
            ) : (
              <>
                <h2 className="w-full text-center text-xl">Pembayaran</h2>
                <div className="text-xs text-gray-500 mt-8">
                  Silahkan transfer ke Nomor Rekening BRI di bawah ini
                </div>
                <div className="no-rek mt-4 bg-gray-100 rounded-md px-2 py-1 flex items-center justify-between">
                  <div className="flex-grow text-center">
                    <p className="text-2xl text-blue-500">
                      {dataPayment?.toko?.rek_toko?.match(/.{1,4}/g)?.join(" ")}
                    </p>
                  </div>
                  <div
                    onClick={handleCopyRek}
                    className="ml-4 cursor-pointer text-sm bg-white px-2 py-1 rounded-md "
                  >
                    {copyRek ? "copied!" : "copy"}
                  </div>
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  a.n {dataPayment?.toko?.an_rek.toUpperCase()}
                </div>

                <div className=" mt-8">
                  <p className="text-xs text-gray-500">
                    Total yang perlu dibayar :
                  </p>
                </div>
                <div className="w-full flex items-center justify-between text-center text-xl mt-1 bg-gray-100 px-2 rounded-md py-1">
                  <div className="flex-grow">
                    Rp. {dataPayment?.harga?.toLocaleString("id-ID")},00
                  </div>
                  <div
                    onClick={handleCopyTotal}
                    className="ml-4 cursor-pointer text-sm bg-white px-2 py-1 rounded-md "
                  >
                    {copyTotal ? "copied!" : "copy"}
                  </div>
                </div>
                <div className="chat-penjual mt-8 text-xs">
                  Silahkan hubungi penjual jika sudah melakukan pembayaran dan
                  kirimkan bukti pembayaran.
                </div>
                <div className="flex w-full items-center justify-center mt-3">
                  <button
                    className="bg-orange-500 text-center text-white text-lg px-3 py-1 rounded-lg shadow-md"
                    onClick={() => {
                      const noWa = dataPayment?.toko?.telp?.replace(/^0/, "62");
                      if (noWa) {
                        window.open(`https://wa.me/${noWa}`, "_blank");
                      } else {
                        alert("Nomor telepon penjual tidak tersedia.");
                      }
                    }}
                  >
                    Hubungi Penjual
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
