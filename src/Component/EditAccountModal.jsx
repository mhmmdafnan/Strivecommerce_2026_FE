import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const EditAccountModal = ({ isOpen, onClose, onGantiPassword, idUser }) => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cookies, setCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama_toko: cookies["nama_toko"] || "",
    // inisialisasi state untuk menyimpan data form
    firstName: cookies["firstName"] || "",
    lastName: cookies["lastName"] || "",
    email: cookies["email"] || "",
    jenisKelamin: cookies["gender"] || "",
    // tanggalLahir: cookies["tanggal_lahir"] || "",
    telepon: cookies["telp"] || "",
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // bulan dimulai dari 0
    const day = `0${date.getDate()}`.slice(-2);

    return `${year}-${month}-${day}`; // format YYYY-MM-DD
  };

  // Handler untuk setiap perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form: gunakan FormData untuk multipart (untuk file upload jika diperlukan)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.telepon || !formData.nama_toko || !formData.jenisKelamin) {
      toast.error("no telepon, nama toko, dan jenis kelamin wajib diisi.");
      return;
    }

    try {
    
      // Kirim data ke backend (ganti URL sesuai kebutuhan)
      const response = await axios.patch(
        `${apiUrl}/api/v1/users/${idUser}`,
        formData,
        {
          headers: {
            token: `${cookies["token"]}`,
          },
        }
      );

      const result = await response.data;

      if (response.data.success) {
        setCookie("nama_toko", formData.nama_toko);
        setCookie("firstName", formData.firstName);
        setCookie("lastName", formData.lastName);
        setCookie("email", formData.email);
        setCookie("gender", formData.jenisKelamin);
        // setCookie("tanggal_lahir", formData.tanggalLahir);
        setCookie("telp", formData.telepon);
        toast.success("Data Akun berhasil diupdate!");
        onClose(); // Tutup modal setelah submit
        // Bisa juga panggil fungsi refresh data atau redirect
      } else {
        toast.error("Gagal memperbarui data: " + result.message);
      }
    } catch (error) {
      // console.error("Gagal mengirim data:", error);
      toast.error("Gagal mengupdate data akun. Silakan coba lagi.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative ">
        {/* Tombol Close */}
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </div>

        <h2 className="text-center text-xl font-semibold mb-6">
          Update Informasi
        </h2>

        {/* Form */}
        <div className="space-y-4 ">
          <div className="space-y-4 overflow-auto w-full max-h-[60vh] px-2">
            <div>
              <label className="text-sm font-medium">
                Nama Toko<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama_toko"
                value={formData.nama_toko}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#990808] text-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Nama Awal<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#990808] text-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Nama Akhir<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#990808] text-gray-600"
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Jenis Kelamin<span className="text-red-500">*</span>
              </label>
              <select
                name="jenisKelamin"
                onChange={handleChange}
                value={formData.gender} //
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#990808] text-gray-600"
              >
                <option value="" disabled>
                  -- Pilih Jenis Kelamin --
                </option>
                <option value="1">Laki-laki</option>
                <option value="0">Perempuan</option>
              </select>
            </div>

            {/* <div>
              <label className="text-sm font-medium">
                Tanggal Lahir<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggalLahir"
                value={formatDateForInput(formData.tanggalLahir)}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#990808] text-gray-600"
              />
            </div> */}

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full mt-1 p-2 border rounded bg-gray-200 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                No Telepon<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="telepon"
                // value={formData.telepon}
                // required
                value={formData.telepon == "undefined" ? "-" : formData.telepon}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#990808] text-gray-600"
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div
              onClick={handleSubmit}
              className="w-fit px-5 bg-[#990808] hover:bg-[#bd1d1d] text-white py-2 rounded-xl font-semibold cursor-pointer"
            >
              <MdOutlineEdit className="inline-block mr-1" />
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditAccountModal;
