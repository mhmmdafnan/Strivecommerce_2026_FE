import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import Sidebar from "../Component/Sidebar";
import foto from "../assets/img/picture1.jpeg";
import kursi from "../assets/img/produk/kursi 1.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../Component/Loading.jsx";
import DetailPengajuanModal from "../Component/DetailPengajuanModal.jsx";

function MainPage() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cookies] = useCookies();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [idPengajuan, setIdPengajuan] = useState();
  const [isDetailPengajuanModalOpen, setIsDetailPengajuanModalOpen] =
    useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
  const handleAksiClick = (id) => {
    setIdPengajuan(id);
    setIsDetailPengajuanModalOpen(true);
    // setTrigger(!trigger)
  };

  // Handle Delete
  const handleDelete = (id) => {};

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

  // Fetch data when page changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/toko`);
        setData(response.data.data);
      } catch (error) {
        // console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex bg-[#FFA485] h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 md:shadow-xl ml-0 md:ml-6 md:mt-4 mt-16 bg-white md:p-4 md:rounded-3xl md:mr-4 md:mb-4 overflow-hidden">
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
          <h1 className="text-xl font-bold">Daftar UMKM</h1>

          <div className="table-area text-sm mt-4 max-h-[460px] overflow-y-auto">
            <div className="grid grid-cols-4 md:grid-cols-5 text-center py-2 bg-gray-200 border-y-[1px] border-gray-400 text-black mb-2">
              <div className="hidden md:block">ID Unit</div>
              <div>Nama UMKM</div>
              <div>Alamat</div>
              <div className="hidden md:block">Email User</div>

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
                      className="grid grid-cols-4 md:grid-cols-5 text-center mb-2 hover:bg-[#f9dcd2] rounded-lg transition duration-300 "
                    >
                      <div className="items-center justify-center hidden md:flex">
                        <p>P-{item.id}</p>
                      </div>
                      <div className="items-center justify-center flex">
                        <p>{item.nama_toko}</p>
                      </div>
                      <div className="items-center justify-center flex">
                        {item.alamat[0] ? (
                          <p className="text-gray-700">
                            {item.alamat[0].kabupaten}
                          </p>
                        ) : (
                          <p className="text-red-500">Alamat belum tersedia</p>
                        )}
                      </div>
                      <div className="items-center justify-center hidden md:flex">
                        <p>{item.email}</p>
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

          {/* Modal Delete */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white w-fit max-w-2xl rounded-lg shadow-lg p-6 relative">
                {/* Tombol Close */}
                <div
                  onClick={() => setShowDeleteModal(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </div>

                <h2 className="text-center text-xl font-semibold mb-6">
                  Delete Property
                </h2>
                <div className="flex justify-center mb-5">
                  <span className="material-symbols-outlined text-[100px] text-red-500">
                    error
                  </span>
                </div>
                <div className="flex gap-y-2 mb-10 mx-5 w-fit ">
                  Apakah anda yakin ingin menghapus property ini?
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => {
                      handleDelete(selectedId); // panggil fungsi delete
                      setShowDeleteModal(false); // tutup modal
                    }}
                  >
                    Ya, Hapus
                  </button>
                  <button
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modal  */}
      <DetailPengajuanModal
        isOpen={isDetailPengajuanModalOpen}
        onClose={() => setIsDetailPengajuanModalOpen(false)}
        idPengajuan={idPengajuan}
        isPengajuan={false} // Set to false since this is for UMKM
      />
    </>
  );
}

export default MainPage;
