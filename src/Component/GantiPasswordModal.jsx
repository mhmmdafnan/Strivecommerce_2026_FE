import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { toast } from "react-toastify";

const GantiPasswordModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [showPasswordLama, setShowPasswordLama] = useState(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [showPasswordBaruConf, setShowPasswordBaruConf] = useState(false);
  const [cookies] = useCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordLama || !passwordBaru || !konfirmasiPassword) {
      toast.error("Semua kolom wajib diisi.");
      return;
    }

    if (passwordBaru !== konfirmasiPassword) {
      toast.error("Konfirmasi password tidak cocok.");
      return;
    }

    try {
      const response = await axios.patch(
        `${apiUrl}/api/v1/users/password/${cookies.user_id}`,
        {
          passwordLama: passwordLama,
          password: passwordBaru,
        },
        {
          headers: {
            token: `${cookies["token"]}`,
          },
        }
      );

      toast.success("Password berhasil diubah.");
      onClose(); // tutup modal jika pakai modal
    } catch (error) {
      // console.error("Gagal:", error);
      toast.error(error.response?.data?.message || "Gagal mengubah password.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </div>

        <h2 className="text-center text-xl font-semibold mb-6">
          Ganti Password
        </h2>

        <div className="space-y-6">
          {/* Password Lama */}
          <div className="relative">
            <label className="text-sm font-medium">Password Lama</label>
            <input
              type={showPasswordLama ? "text" : "password"}
              value={passwordLama}
              onChange={(e) => setPasswordLama(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EE6D3F] text-gray-600"
            />
            <div
              className="absolute top-12 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPasswordLama(!showPasswordLama)}
            >
              {showPasswordLama ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Password Baru */}
          <div className="relative">
            <label className="text-sm font-medium">Password Baru</label>
            <input
              type={showPasswordBaru ? "text" : "password"}
              value={passwordBaru}
              onChange={(e) => setPasswordBaru(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EE6D3F] text-gray-600"
            />
            <div
              className="absolute top-12 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPasswordBaru(!showPasswordBaru)}
            >
              {showPasswordBaru ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Konfirmasi Password Baru */}
          <div className="relative">
            <label className="text-sm font-medium">Konfirmasi Password</label>
            <input
              type={showPasswordBaruConf ? "text" : "password"}
              value={konfirmasiPassword}
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#EE6D3F] text-gray-600"
            />
            <div
              className="absolute top-12 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPasswordBaruConf(!showPasswordBaruConf)}
            >
              {showPasswordBaruConf ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div
              onClick={handleSubmit}
              className="w-fit px-5 mt-6 bg-[#EE6D3F] hover:bg-[#d25f35] text-white py-2 rounded-xl font-semibold cursor-pointer"
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

export default GantiPasswordModal;
