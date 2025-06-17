import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
import PDFViewer from "./PDFViewer.jsx";
// import LoadingModal from "../Component/LoadingModal.jsx";
const DetailPengajuanModal = ({ isOpen, onClose, idUmkm }) => {
  // const backendUrl = import.meta.env.VITE_API_URL;
  const ngrokURL = "";
  const [pengajuan, setPengajuan] = useState([
    {
      idUmkm: 1,
      userFirstName: "John",
      userEmail: "john@example.com",
      umkmName: "UMKM ABC",
      noTelponUser: "08123456789",
      alamat: "Jl. Contoh Alamat No. 123",
      waktu_pengajuan: "2023-10-01T12:00:00Z",
      status: 0, // 0: pending, 1: accepted, 2: rejected
      berkas: "/docs/ktp.pdf",
    },
  ]);
  // const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState();

  const now = new Date();
  const formattedDate =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    " " +
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0");

  const handleTolak = async () => {};

  function getCurrentDateTime() {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, "0");

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1); // bulan dimulai dari 0
    const day = pad(now.getDate());

    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const handleTerima = async () => {};

  useEffect(() => {
    // if (!idTransaksi) return;
    // console.log(cookies);
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-fit max-w-2xl rounded-lg shadow-lg p-6 relative">
        {/* Tombol Close */}
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </div>

        <h2 className="text-center text-xl font-semibold mb-6">
          Detail Pengajuan
        </h2>

        {/* Data Pengajuan */}
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4 w-fit">
          <p>ID Pengajuan</p>
          <p>: T-{pengajuan[0]?.idUmkm || "-"}</p>

          <p>Nama User</p>
          <p>: {pengajuan[0]?.userFirstName || "-"}</p>

          <p>Nama UMKM</p>
          <p>: {pengajuan[0]?.umkmName || "-"}</p>

          <p>Email User</p>
          <p>: {pengajuan[0]?.userEmail || "-"}</p>

          <p>No Telpon</p>
          <p>: P-{pengajuan[0]?.noTelponUser || "-"}</p>

          <p>Alamat</p>
          <p>: P-{pengajuan[0]?.alamat || "-"}</p>

          <p>Tanggal Pengajuan</p>
          <p>
            :{" "}
            {pengajuan[0]?.waktu_pengajuan
              ? new Date(pengajuan.waktu_pengajuan).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "-"}
          </p>

          <p>Status</p>
          <p>: {pengajuan[0]?.status || "-"}</p>
        </div>

        <hr className="my-4" />

        <div>
          <p className="font-medium mb-2">Berkas :</p>
          <div className="flex gap-4 overflow-x-auto">
            <p className="text-xs text-gray-600 underline">
              <a href={pengajuan[0]?.berkas} target="#">
                Berkas 1
              </a>
              <PDFViewer fileUrl={pengajuan[0]?.berkas} />
            </p>
          </div>
        </div>

        {/* Tombol Aksi */}
        {pengajuan[0].status == 0 && (
          <div className="flex justify-end gap-x-2 items-center mt-6">
            <button
              onClick={handleTolak}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Tolak pengajuan
            </button>
            <button
              onClick={handleTerima}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Terima pengajuan
            </button>
          </div>
        )}
      </div>
      {/* <LoadingModal
        isOpen={loading}
        // onSelectAdmin={handleSelectAdmin}
        // admins={admins}
      /> */}
    </div>
  );
};
export default DetailPengajuanModal;
