import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import Sidebar from "../Component/Sidebar";
import foto from "../assets/img/picture1.jpeg";
import kursi from "../assets/img/produk/kursi 1.jpg";
import DetailPengajuanModal from "../Component/DetailPengajuanModal.jsx";
import Loading from "../Component/Loading.jsx";

function MainPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [selectedId, setSelectedId] = useState(null);
  const [idPengajuan, setIdPengajuan] = useState();
  const [isDetailPengajuanModalOpen, setIsDetailPengajuanModalOpen] =
    useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleAksiClick = (id) => {
    // console.log("id dalam fungsi", id);
    setIdPengajuan(id);
    setIsDetailPengajuanModalOpen(true);
    // setTrigger(!trigger)
  };

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage * totalPerPage < totalItems) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Handle Delete Properti
  const handleDelete = (id) => {};

  // Fetch data when page changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/pengajuan`, {
          headers: {
            token: cookies["token"],
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchParams.get("success-add") === "true") {
      setSuccessMessage("Data berhasil ditambahkan!");
      searchParams.delete("success-add");
      setSearchParams(searchParams);
    } else if (searchParams.get("success-edit") === "true") {
      setSuccessMessage("Data berhasil diperbarui!");
      searchParams.delete("success-edit");
      setSearchParams(searchParams);
    } else if (searchParams.get("success-delete") === "true") {
      setSuccessMessage("Data berhasil dihapus!");
      searchParams.delete("success-delete");
      setSearchParams(searchParams);
    } else if (searchParams.get("error") === "true") {
      setSuccessMessage("Terdapat Kesalahan hubungi admin!");
      searchParams.delete("error");
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex md:bg-[#FFA485] h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 md:shadow-xl border-2 border-r-emerald-600 ml-0 md:ml-6 md:mt-4 mt-16 bg-white md:p-4 md:rounded-3xl md:mr-4 md:mb-4 overflow-hidden">
          {/* Display Success Alert */}
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-4 my-2 rounded-md flex justify-between items-center">
              <span>{successMessage}</span>
              <button
                className="text-green-800 font-bold ml-4"
                onClick={() => setSuccessMessage("")}
              >
                ✕
              </button>
            </div>
          )}

          {/* Display Error Alert */}
          {errorMessage && (
            <div className="bg-red-100 text-red-800 p-4 my-2 rounded-md flex justify-between items-center">
              <span>{errorMessage}</span>
              <button
                className="text-red-800 font-bold ml-4"
                onClick={() => setErrorMessage("")}
              >
                ✕
              </button>
            </div>
          )}
          <h1 className="text-xl font-bold">Daftar Pengajuan UMKM</h1>

          <div className="table-area text-sm mt-4 max-h-[460px] overflow-y-auto">
            <div className="grid grid-cols-4 md:grid-cols-6 text-center  py-2 bg-gray-200 border-y-[1px] border-gray-400 text-black mb-2">
              <div className="hidden md:block">ID Unit</div>
              <div>Nama UMKM</div>
              <div>Tanggal</div>
              <div className="hidden md:block">Email User</div>
              <div>Status</div>
              <div>Aksi</div>
            </div>

            {loading ? (
              <div className="items-center justify-center hidden md:flex h-80">
                <Loading w={10} h={10} />
              </div>
            ) : (
              <>
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-4 md:grid-cols-6 text-center mb-2 hover:bg-[#f9dcd2] rounded-lg transition duration-300 "
                    >
                      <div className="items-center justify-center hidden md:flex">
                        <p>P-{item.id}</p>
                      </div>
                      <div className="items-center justify-center flex">
                        <p>{item.nama_toko}</p>
                      </div>
                      <div className="items-center justify-center flex">
                        <p>{formatTanggal(item.time_pengajuan)}</p>
                      </div>
                      <div className="items-center justify-center hidden md:flex">
                        <p>{item.email}</p>
                      </div>
                      <div className="items-center justify-center flex">
                        {/* <p className="bg-[#00E92B] text-white px-2 py-1 rounded-lg"> */}
                        <p
                          className={`px-2 rounded-lg ${
                            item.status_pengajuan == 0
                              ? "bg-gray-300 text-black"
                              : item.status == 1
                              ? "bg-blue-600 text-white"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {item.status_pengajuan == 0 && "Diajuan"}
                          {item.status_pengajuan == 1 && "Diterima"}
                          {item.status_pengajuan == 99 && "Ditolak"}
                        </p>
                      </div>
                      <div className="items-center justify-center flex">
                        <span
                          className="material-symbols-outlined p-1 cursor-pointer hover:text-[#EE6D3F] transition duration-300"
                          onClick={() => handleAksiClick(item.id)}
                        >
                          info
                        </span>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      {/* Modal  */}
      <DetailPengajuanModal
        isOpen={isDetailPengajuanModalOpen}
        onClose={() => setIsDetailPengajuanModalOpen(false)}
        idPengajuan={idPengajuan}
        isPengajuan={true}
      />
    </>
  );
}

export default MainPage;
