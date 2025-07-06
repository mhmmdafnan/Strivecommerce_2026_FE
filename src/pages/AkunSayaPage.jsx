import React, { useEffect, useRef, useState } from "react";
// import useCookies from "react-cookie";
import { useNavigate } from "react-router-dom";
// import ava from "../assets/img/picture1.jpeg";
import { MdOutlineEdit, MdOutlineStore } from "react-icons/md";

import Navbar from "../Component/Navbar";
import EditAccountModal from "../Component/EditAccountModal";
import GantiPasswordModal from "../Component/GantiPasswordModal";
import { useCookies } from "react-cookie";

const AkunSayaPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL; // URL API
  const navigate = useNavigate();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isGantiPasswordOpen, setGantiPasswordOpen] = useState(false);
  const idUser = "10";
  const [cookies, setCookie, deleteCookie] = useCookies();
  const inputRef = useRef(null);

  const logout = () => {
    // Implement logout logic here
    console.log("User logged out");
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
    deleteCookie("tanggal_lahir");
    // Optionally, redirect to home or login page]
    navigate("/");
  };

  const handleUbahFoto = () => {
    inputRef.current.click(); // buka file picker
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("foto", file);
    // console.log(formData);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:3000/api/edit-foto",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         // Authorization: `Bearer ${token}`, // jika pakai token
    //       },
    //     }
    //   );

    //   console.log("Foto berhasil diubah:", response.data);
    //   // refresh data user atau tampilkan notifikasi
    // } catch (error) {
    //   console.error("Gagal upload foto:", error.response || error);
    // }
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "";

    const tanggal = new Date(dateString);

    return tanggal.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Fetch data when page changes
  useEffect(() => {
    console.log(cookies);
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 mb-20 md:mt-0">
        <h1 className="text-sm text-gray-600 cursor-pointer">Akun Saya</h1>

        <div className="bg-white shadow-lg border-[1px] rounded-lg px-4 py-6 mt-4 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 mb-6 justify-center">
            <div className="flex justify-end">
              <div
                onClick={() => {
                  cookies.buka_toko == 0
                    ? navigate("/formUMKM")
                    : navigate("/tokoSaya");
                }}
                className="md:hidden flex w-fit items-center justify-center text-white py-1 px-8 rounded-md bg-[#EE6D3F] hover:bg-[#d25f35] cursor-pointer transition-colors duration-300"
              >
                <MdOutlineStore className="inline-block mr-2 text-xl" />
                {cookies.buka_toko == 0 ? "Buka Toko" : "Toko Saya"}
              </div>
            </div>
            {/* Kartu Foto Profil */}
            <div className="flex justify-center md:justify-start md:basis-1/2 max-w-[300px] w-full">
              <div className="bg-[#E9E9E9] rounded-lg p-4 border-2 border-[#EE6D3F] shadow-md">
                <div className="w-full h-50 relative">
                  <img
                    src={apiUrl + "/img/profile_image/" + cookies["path_file"]}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
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
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[90%] text-[#EE6D3F] hover:scale-105 font-semibold text-lg px-2 py-1 border-2 border-[#EE6D3F] rounded-lg text-center cursor-pointer transition-transform duration-300"
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
            <div className="md:basis-1/2 px-2 md:px-0 w-full ">
              <div className="flex justify-between items-center mb-2 md:mb-4">
                <h1 className="text-xl font-bold text-gray-800">Data Diri</h1>
                <div className="hidden md:flex justify-end">
                  <div
                    onClick={() => {
                      cookies.buka_toko == 0
                        ? navigate("/formUMKM")
                        : navigate("/tokoSaya");
                    }}
                    className="flex w-fit items-center justify-center text-white  px-8 py-1 rounded-md bg-[#EE6D3F] hover:bg-[#d25f35] cursor-pointer transition-colors duration-300"
                  >
                    <MdOutlineStore className="inline-block mr-2 text-xl" />
                    {cookies.buka_toko == 0 ? "Buka Toko" : "Toko Saya"}
                  </div>
                </div>
              </div>

              <div className="text-sm space-y-2">
                <div>
                  <h2>Nama Pengguna</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {cookies["firstname"] + " " + cookies["lastname"]}
                  </p>
                </div>
                <div>
                  <h2>Email</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {cookies["email"]}
                  </p>
                </div>
                <div>
                  <h2>Nomor Telepon</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {cookies["telp"]}
                  </p>
                </div>
                <div>
                  <h2>Tanggal Lahir</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {formatTanggal(cookies["tanggal_lahir"])}
                  </p>
                </div>
                <div>
                  <h2>Jenis Kelamin</h2>
                  <p className="text-xs font-extralight text-gray-500">
                    {cookies["gender"] == 1 ? "Laki-laki" : "Perempuan"}
                  </p>
                </div>
                {/* Tombol Aksi */}
                <div className="mt-4 space-y-2">
                  <div
                    onClick={() => setIsEditProfileModalOpen(true)}
                    className="flex items-center justify-center w-44 text-[#EE6D3F] border-2 border-[#EE6D3F] px-4 rounded-md hover:bg-[#EE6D3F] hover:text-white cursor-pointer transition-colors duration-300"
                  >
                    <MdOutlineEdit className="inline-block mr-1" />
                    Ubah Data Diri
                  </div>

                  <div
                    onClick={() => setGantiPasswordOpen(true)}
                    className="flex items-center justify-center w-44 bg-[#4B4B4A] text-white px-5 border-2 border-[#4B4B4A] rounded-md hover:bg-[#242323] cursor-pointer transition-colors duration-300"
                  >
                    Ubah Password
                  </div>
                  <div
                    className="flex items-center justify-center w-44 bg-red-500 text-white px-5 border-2 border-red-500 rounded-md hover:bg-red-600 cursor-pointer transition-colors duration-300"
                    onClick={logout}
                  >
                    logout
                  </div>
                </div>
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
    </>
  );
};

export default AkunSayaPage;
