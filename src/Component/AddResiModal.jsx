import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AddResiModal = ({ isOpen, onClose, onSuccess, id }) => {
  const [resi, setResi] = useState("");
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(false); // tambahkan ini jika belum ada
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!isOpen) return null;

  const onSuccessResi = async (e) => {
    e.preventDefault(); // penting untuk mencegah reload halaman

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/api/v1/acc_transaksi`, {
        transaksiId: id,
        resi: resi,
      }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      console.log(response.data.data);

      if (response.data.success) {
        onSuccess?.(); // trigger callback kalau ada
        onClose(); // tutup modal
      }
    } catch (error) {
      console.error("Gagal mengirim resi:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-4 dark:bg-black w-full max-w-md rounded-lg shadow-lg pt-6 pb-4 relative">
        <div
          className="absolute right-3 top-2 text-xl cursor-pointer px-1 rounded-md hover:bg-red-400"
          onClick={onClose}
        >
          X
        </div>
        <h1 className="text-lg font-semibold">Apakah anda sudah mengirimkan barang?</h1>
        <form onSubmit={onSuccessResi} className="w-full flex flex-col items-center">
          <label
            className="block mt-4 mb-1 text-xs text-gray-700 dark:text-white text-center"
            htmlFor="resi"
          >
            Masukkan Nomor Resi Pengiriman
          </label>
          <input
            type="text"
            name="resi"
            value={resi}
            onChange={(e) => setResi(e.target.value)}
            className="bg-gray-200 rounded-md px-2 py-1 w-full"
          />

          <div className="w-full flex justify-center gap-2 mt-2">
            <input
              type="submit"
              value={loading ? "Mengirim..." : "Kirim"}
              className="mt-4 bg-blue-500 cursor-pointer hover:bg-blue-400 text-white rounded-md px-4 py-2 disabled:opacity-50"
              disabled={loading || !resi}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResiModal;
