import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";

const EditAccountModal = ({ isOpen, onClose, onGantiPassword, idUser }) => {
  const navigate = useNavigate();
  // const backendUrl = import.meta.env.VITE_API_URL;
  // const [cookies, setCookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    jenisKelamin: "",
    tanggalLahir: "",
    telepon: "",
  });

  // Handler untuk setiap perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form: gunakan FormData untuk multipart (untuk file upload jika diperlukan)
  const handleSubmit = async (e) => {
    onClose();
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
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EE6D3F] text-gray-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Jenis Kelamin<span className="text-red-500">*</span>
            </label>
            <select
              name="jenisKelamin"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EE6D3F] text-gray-600"
            >
              <option value="" className="text-gray-300">
                -- Pilih Jenis Kelamin --
              </option>
              <option value="1">Laki-laki</option>
              <option value="2">Perempuan</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Tanggal Lahir<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggalLahir"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EE6D3F] text-gray-600"
            />
          </div>

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
              required
              // value={formData.telepon == "undefined" ? "-" : formData.telepon}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EE6D3F] text-gray-600"
            />
          </div>

          <div className="flex justify-center items-center">
            <div
              onClick={handleSubmit}
              className="w-fit px-5 bg-[#EE6D3F] hover:bg-[#d25f35] text-white py-2 rounded-xl font-semibold cursor-pointer"
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
