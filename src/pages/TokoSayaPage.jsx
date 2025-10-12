import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import logoDefault from "../assets/img/logo_default.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import EditAccountModal from "../Component/EditAccountModal";
import GantiPasswordModal from "../Component/GantiPasswordModal";
import Loading from "../Component/Loading";
import { toast } from "react-toastify";

const TokoSayaPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cookies, setCookie, deleteCookie] = useCookies();
  const [dataProduk, setDataProduk] = useState([]);
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isGantiPasswordOpen, setGantiPasswordOpen] = useState(false);
  const [produkList, setProdukList] = useState([]);
  const inputRef = useRef(null);
  const idUser = cookies.user_id;
  const [loading, setLoading] = useState(false);

  const handleSelectAll = () => {
    const allChecked = produkList.every((item) => item.isChecked);
    const updatedList = produkList.map((item) => ({
      ...item,
      isChecked: !allChecked,
    }));
    setProdukList(updatedList);
  };

  const logout = () => {
    // Implement logout logic here
    deleteCookie("isLoggedIn");
    deleteCookie("token");
    deleteCookie("user_id");
    deleteCookie("role");
    deleteCookie("firstName");
    deleteCookie("lastName");
    deleteCookie("email");
    deleteCookie("telp");
    deleteCookie("nama_toko");
    deleteCookie("buka_toko");
    deleteCookie("klasifikasi_toko");
    deleteCookie("rating_toko");
    deleteCookie("gender");
    deleteCookie("path_file");
    // deleteCookie("tanggal_lahir");
    // Optionally, redirect to home or login page]
    navigate("/");
  };

  // const formatTanggal = (dateString) => {
  //   if (!dateString) return "";

  //   const tanggal = new Date(dateString);

  //   return tanggal.toLocaleDateString("id-ID", {
  //     day: "2-digit",
  //     month: "long",
  //     year: "numeric",
  //   });
  // };

  const handleCheckboxChange = (produkId) => {
    const updatedList = produkList.map((item) =>
      item.id === produkId ? { ...item, isChecked: !item.isChecked } : item
    );
    setProdukList(updatedList);
  };

  const handleTambahKlik = () => {
    // open new page;
    if (
      cookies.telp == "" ||
      cookies.telp == undefined ||
      cookies.telp == null ||
      cookies.gender == "" ||
      cookies.gender == undefined ||
      cookies.gender == null ||
      cookies.nama_toko == "" ||
      cookies.nama_toko == undefined ||
      cookies.nama_toko == null
    ) {
      toast.error("Lengkapi data diri terlebih dahulu sebelum menambah produk");
      setIsEditProfileModalOpen(true);
      return;
    }
    window.open("/tambahProduk", "_blank");
  };
  const handleEditKlik = (idProduk) => {
    // buka tab baru ke halaman /tambahProduk dengan query parameter
    window.open(`/editProduk/${idProduk}`, "_blank");
  };

  const handleUbahFoto = () => {
    inputRef.current.click(); // buka file picker
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Cek ukuran file (maksimal 2 MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2 MB");
      return;
    }

    // Cek format file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format file harus JPG, JPEG, atau PNG");
      return;
    }

    // Lanjutkan upload
    uploadFoto(file);
  };

  const uploadFoto = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.patch(
        `${apiUrl}/api/v1/users/profile-image/${cookies.user_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `${cookies["token"]}`,
          },
        }
      );
      setCookie("path_file", response.data.data.path_file);
      toast.success("Foto profil berhasil diupdate");
      // Refresh foto (misalnya set cookie baru atau reload user data)
    } catch (error) {
      // console.error("Upload gagal:", error);
      toast.error("Gagal mengunggah foto");
    }
  };

  const handleDeleteProduk = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Yakin ingin menghapus produk ini?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={() => closeToast()}
            >
              Batal
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={async () => {
                try {
                  const response = await axios.delete(
                    `${apiUrl}/api/v1/product/${id}`,
                    {
                      headers: {
                        token: `${cookies.token}`,
                      },
                    }
                  );

                  if (response.data.success) {
                    toast.dismiss(); // Tutup toast konfirmasi
                    toast.success("Produk berhasil dihapus");
                    setProdukList((prev) => prev.filter((p) => p.id !== id));
                  } else {
                    toast.error("Gagal menghapus produk");
                  }
                } catch (error) {
                  toast.error("Terjadi kesalahan saat menghapus");
                }
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  // Fetch data when page changes
  useEffect(() => {
    console.log(cookies);
    const fetchData = async () => {
      setLoading(true);
      try {
        const produkResponse = await axios.get(`${apiUrl}/api/v1/product`, {
          params: {
            idToko: cookies.user_id,
            total: 25,
          },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });
        // console.log(produkResponse.data.data);

        if (produkResponse.data.success) {
          setProdukList(produkResponse.data.data);
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 pb-20 md:mt-0">
        <h1 className="text-sm text-[#990808] cursor-pointer">
          {cookies.nama_toko}
        </h1>

        <div className="bg-white shadow-lg border-[1px] rounded-lg px-4 py-6 mt-4 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 mb-6 justify-center">
            {/* Kartu Foto Profil */}
            <div className="flex justify-center md:justify-start md:basis-1/2 max-w-[300px] w-full">
              <div className="w-72 h-96 bg-[#E9E9E9] rounded-lg p-4 border-2 border-[#990808] shadow-md">
                <div className="w-50 h-50 relative">
                  <div className="h-60 w-64 justify-center  flex">
                    <img
                      src={
                        cookies.path_file
                          ? apiUrl +
                            "/img/profile_image/" +
                            cookies["path_file"]
                          : logoDefault
                      }
                      alt="Profile"
                      className="w-full h-full object-contain rounded-lg cursor-pointer"
                    />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {/* Overlay Ubah Foto */}
                  <div
                    onClick={handleUbahFoto}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] text-white hover:scale-105 font-semibold text-lg px-2 py-1 bg-[#990808] rounded-lg text-center cursor-pointer transition-transform duration-300"
                  >
                    Ubah Foto
                  </div>
                </div>

                {/* Info Ukuran File */}
                <div className="text-xs mt-4 px-2">
                  Besar file:
                  <ul className="list-disc list-inside mb-2 px-1">
                    <li>Max 2 MB</li>
                  </ul>
                  Format:
                  <ul className="list-disc list-inside px-1">
                    <li>JPG, JPEG, PNG</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Diri */}
            <div className=" md:basis-1/2 px-2 md:px-0 w-full ">
              <div className="mb-2 md:mb-4">
                <h1 className="text-xl font-bold text-gray-800">
                  {cookies.nama_toko}
                </h1>
              </div>

              <div className="text-sm space-y-2">
                <div>
                  <h2>Nama Pengguna</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {cookies.firstName + " " + cookies.lastName}
                  </p>
                </div>
                <div>
                  <h2>Email</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {cookies.email}
                  </p>
                </div>
                <div>
                  <h2>Nomor Telepon</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {cookies.telp}
                  </p>
                </div>
                {/* <div>
                  <h2>Tanggal Lahir</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {formatTanggal(cookies.tanggal_lahir)}
                  </p>
                </div> */}
                <div>
                  <h2>Jenis Kelamin</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {cookies.gender == 1
                      ? "Laki-laki"
                      : cookies.gender == 0
                      ? "Perempuan"
                      : "-"}
                  </p>
                </div>
                {/* Tombol Aksi */}
                <div className="flex flex-col items-center md:items-start mt-4 space-y-2">
                  <div
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="flex items-center justify-center w-44 text-[#990808] border-2 border-[#990808] px-4 rounded-md hover:bg-[#990808] hover:text-white cursor-pointer transition-colors duration-300"
                  >
                    <MdOutlineEdit className="inline-block mr-1" />
                    Ubah Data Diri
                  </div>

                  <div
                    onClick={() => setGantiPasswordOpen(true)}
                    className="flex items-center justify-center w-44 bg-[#4B4B4A] text-white px-5 border-2 border-[#4B4B4A] rounded-md hover:bg-[#242323] hover:border-[#242323] cursor-pointer transition-colors duration-300"
                  >
                    Ubah Password
                  </div>
                  <div
                    className="flex items-center justify-center w-44 bg-[#ff0000] text-white px-5 border-2 border-[#ff0000] rounded-md hover:bg-[#990202] hover:border-[#990202] cursor-pointer transition-colors duration-300"
                    onClick={logout}
                  >
                    logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg border-[1px]  rounded-lg px-10 py-6 mt-4 max-w-5xl mx-auto">
          <div className="flex mb-4 justify-between">
            <h1 className="font-semibold">Produk Saya</h1>
            <div
              onClick={handleTambahKlik}
              className="bg-[#990808] text-white px-4 rounded-lg cursor-pointer hover:bg-[#d02525] transition-colors duration-300 flex items-center gap-2"
            >
              Tambah
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="table-area min-w-[900px]">
              {/* Header */}
              <div className="grid grid-cols-7 bg-[#dbd9d9] font-semibold text-center px-2 py-3">
                <div className="flex items-center gap-x-4">
                  <input
                    type="checkbox"
                    checked={
                      produkList.length > 0 &&
                      produkList.every((item) => item.isChecked)
                    }
                    onChange={handleSelectAll}
                  />
                  <span>ID</span>
                </div>
                <div>Nama Produk</div>
                <div>Kategori</div>
                <div>Stok</div>
                <div>Terjual</div>
                <div>Harga</div>
                <div>Aksi</div>
              </div>

              {/* Body */}
              <div className="max-h-[300px] overflow-y-auto divide-y divide-gray-300">
                {loading ? (
                  <div className="flex justify-center items-center h-80">
                    <Loading w={10} h={10} />
                  </div>
                ) : (
                  produkList.map((item) => {
                    const file_path = item.path ? JSON.parse(item.path) : [];
                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-7 items-center text-center px-2 py-2 hover:bg-gray-100 transition duration-200"
                      >
                        <div className="flex gap-x-4 items-center">
                          <input
                            type="checkbox"
                            checked={item.isChecked}
                            onChange={() => handleCheckboxChange(item.id)}
                          />
                          {item.id}
                        </div>
                        <div className="flex justify-start items-center gap-2">
                          <div>
                            <img
                              className="h-10 w-10 rounded-xl border border-gray-400 object-contain"
                              src={apiUrl + file_path[0]}
                              alt=""
                            />
                          </div>
                          <div>{item.nama}</div>
                        </div>
                        <div>{item.kategori}</div>
                        <div>{item.stok} pcs</div>
                        <div>{item.terjual} pcs</div>
                        <div>Rp {item.harga.toLocaleString("id-ID")}</div>
                        <div className="flex justify-center gap-2">
                          <div
                            onClick={() => handleEditKlik(item.id)}
                            className="text-gray-800 hover:text-[#990808] cursor-pointer"
                          >
                            <MdOutlineEdit className="text-xl" />
                          </div>
                          <div
                            onClick={() => handleDeleteProduk(item.id)}
                            className="text-gray-800 hover:text-[#ff0000] cursor-pointer"
                          >
                            <MdOutlineDeleteOutline className="text-xl" />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal  */}
      <EditAccountModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        onGantiPassword={() => setGantiPasswordOpen(true)}
        idUser={idUser}
      />

      {/* Modal Ganti Password */}
      <GantiPasswordModal
        isOpen={isGantiPasswordOpen}
        onClose={() => setGantiPasswordOpen(false)}
      />

      <div className="bg-[#F4F2EF] py-5 mx-auto text-center flex justify-center items-center">
        <p className="text-sm text-[#990808]">
          &copy; 2025 Strive Marketplace - Set Up Inc.
        </p>
      </div>
    </>
  );
};

export default TokoSayaPage;
