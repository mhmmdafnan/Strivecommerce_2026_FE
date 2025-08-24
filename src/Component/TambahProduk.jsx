import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";

const TambahProduk = () => {
  const navigate = useNavigate();
  const { idProduk } = useParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const firstInputRef = useRef(null);
  const [cookies, setCookies] = useCookies();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    deskripsi: "",
    media: [],
    harga: "",
  });

  const initialFormData = {
    nama: "",
    deskripsi: "",
    kategori: "",
    media: [],
    harga: "",
  };

  const check_empty = () => {
    if (formData.nama === "") {
      return false;
    }
    if (formData.kategori === "") {
      return false;
    }
    if (formData.deskripsi === "") {
      return false;
    }
    if (formData.harga === "") {
      return false;
    }
    if (!idProduk) {
      if (formData.media.length === 0) {
        return false;
      }
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({ ...prev, media: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews); // ini akan ganti gambar lama kalau ada
  };

  // Format angka jadi Rupiah
  const formatRupiah = (angka) => {
    if (!angka) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  // Ambil angka murni dari string input
  const toNumberOnly = (val) => {
    return val.replace(/[^\d]/g, "");
  };

  const handleSuccessToast = (pesan) => {
    toast.success(
      ({ closeToast }) => (
        <>
          <div className="">
            <div>{pesan}</div>
            <div className="flex justify-center gap-2 mt-2">
              <button
                className="px-3 py-1 rounded-xl border-2 text-white hover:bg-white hover:text-green-600 text-sm"
                onClick={() => window.close()}
              >
                Tutup Tab
              </button>
            </div>
          </div>
        </>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  const updateData = async (idProduk, produkData) => {
    const form = new FormData();

    // Data utama produk
    form.append("nama", produkData.nama);
    form.append("deskripsi", produkData.deskripsi);
    form.append("harga", produkData.harga);
    form.append("kategori", produkData.kategori || 0);
    form.append("userId", cookies.user_id);

    // Kirim file utama (pastikan ini objek File)
    const adaFileBaru = produkData.media.some((file) => file instanceof File);

    if (adaFileBaru) {
      produkData.media
        .slice()
        .reverse()
        .forEach((file) => {
          if (file instanceof File) {
            form.append("files", file);
          }
        });
    } else {
      // Kirim path lama agar backend tahu: pakai media yang sudah ada
      form.append("mediaLama", JSON.stringify(produkData.media));
    }

    try {
      const res = await axios.patch(
        `${apiUrl}/api/v1/product/${idProduk}`,
        form,
        {
          headers: {
            token: `${cookies["token"]}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handleSuccessToast("Produk berhasil diupdate!");
      return res.data.data;
    } catch (err) {
      // console.error("Gagal mengirim data:", err);
      toast.error("Gagal mengupdate produk");
      return null;
    }
  };

  const sendData = async (formData) => {
    const form = new FormData();

    // Data utama produk
    form.append("nama", formData.nama);
    form.append("deskripsi", formData.deskripsi);
    form.append("kategori", formData.kategori || 0);
    form.append("harga", formData.harga || 0);
    form.append("userId", cookies.user_id);

    // Kirim file utama (pastikan ini objek File)
    if (formData.media && formData.media[0]) {
      formData.media
        .slice()
        .reverse()
        .forEach((file) => {
          form.append("files", file);
          // formDataWithFiles.append("fileOrder[]", index);
        });
      // form.append("fileUtama", formData.media[0]);
    }

    //  Kirim ke backend
    try {
      const res = await axios.post(`${apiUrl}/api/v1/product`, form, {
        headers: {
          token: `${cookies["token"]}`,
          "Content-Type": "multipart/form-data",
        },
      });
      handleSuccessToast("Produk berhasil ditambahkan!");
      return res.data;
    } catch (err) {
      console.error("Gagal mengirim data:", err);
      toast.error("Gagal menambahkan produk");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (
      !formData.nama ||
      !formData.harga ||
      !formData.kategori ||
      !formData.deskripsi
    ) {
      toast.error(
        "Nama produk, harga, media, kategori, dan deskripsi wajib di isi!"
      );
      // setLoading(false);
      return;
    }

    if (idProduk) {
      // Update produk yang sudah ada
      // const result = await updateData(idProduk, formData);
      if (
        !formData.nama ||
        !formData.harga ||
        !formData.kategori ||
        !formData.deskripsi
      ) {
        toast.error(
          "Nama produk, harga, media, kategori, dan deskripsi wajib di isi!"
        );
        // setLoading(false);
        return;
      }
      await updateData(idProduk, formData);
    } else {
      // const result = await sendData(formData);
      await sendData(formData);
    }
  };

  useEffect(() => {
    firstInputRef.current?.focus();
    const fetchData = async () => {
      setLoading(true);
      if (idProduk) {
        try {
          const res = await axios.get(`${apiUrl}/api/v1/product/${idProduk}`, {
            headers: {
              token: `${cookies["token"]}`,
            },
          });
          const data = res.data.data;

          // Set nilai default form
          setFormData({
            nama: data.nama || "",
            kategori: data.kategori || "",
            deskripsi: data.desc || "",
            media: [],
            harga: data.harga || "",
          });
          // Simpan path gambar dari backend (jika banyak, pakai array)
          if (data.path) {
            const parsed = JSON.parse(data.path); // asumsi bentuknya array string
            setImagePreview(parsed);
          }
        } catch (error) {
          // console.error("Gagal memuat data Produk:", error);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => {
        if (!url.startsWith("/img")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imagePreview]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-5 mb-20 md:mt-0">
        {/* Navigation */}
        <div className="flex gap-x-1 p-1 my-2">
          <div
            onClick={() => navigate("/tokoSaya")}
            className="text-sm text-gray-400 hover:text-gray-800 cursor-pointer"
          >
            ß Toko Saya /
          </div>
          <div className="text-sm text-gray-400 hover:text-gray-800 cursor-pointer">
            {idProduk ? "Edit Produk" : "Tambah Produk"}
          </div>
        </div>
        <div className="bg-[#E9E9E9] shadow-lg border-[1px]  rounded-xl px-10 py-6 mt-4 max-w-5xl mx-auto">
          <div className="">
            <h1 className="text-xl font-bold mb-4">
              {idProduk ? "Edit Produk" : "Tambah Produk"}
            </h1>
            {loading ? (
              <div className="col-span-6 flex justify-center items-center h-80">
                <Loading w={10} h={10} />
              </div>
            ) : (
              <>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                  {/* Nama Unit */}
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="md:w-1/3 text-gray-700">Nama Unit</label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      className="mt-1 md:mt-0 p-2 border border-gray-300 rounded-lg w-full md:w-2/3 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none"
                      //   required
                    />
                  </div>

                  {/* kategori */}
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="md:w-1/3 text-gray-700">Kategori</label>
                    <select
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleChange}
                      className="mt-1 md:mt-0 p-2 border border-gray-300 rounded-lg w-full md:w-2/3 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none bg-white"
                    >
                      <option value="">-- Pilih Kategori --</option>
                      <option value="1">Kuliner</option>
                      <option value="2">Fashion</option>
                      <option value="3">Kriya / Kerajinan</option>
                      <option value="4">Agribisnis</option>
                      <option value="5">Jasa</option>
                      <option value="6">Digital</option>
                      <option value="7">Perdagangan</option>
                      <option value="8">Lainnya</option>
                    </select>
                  </div>

                  {/* Harga */}
                  <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <label className="md:w-1/3 text-gray-700">Harga</label>
                    <input
                      type="text"
                      value={formatRupiah(formData.harga)}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          harga: toNumberOnly(e.target.value),
                        })
                      }
                      className="mt-1 md:mt-0 p-2 border border-gray-300 rounded-lg w-full md:w-2/3 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none"
                    />
                  </div>

                  {/* Deskripsi  */}
                  <div className="flex flex-col md:flex-row md:items-start">
                    <label className="md:w-1/3 text-gray-700">Deskripsi</label>
                    <textarea
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleChange}
                      className="mt-1 md:mt-0 p-2 border rounded-lg w-full md:w-2/3 h-32 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none"
                      //   required
                    ></textarea>
                  </div>

                  {/* Foto */}
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="md:w-1/3 text-gray-700">
                      Foto Produk
                    </label>
                    <input
                      type="file"
                      name="media"
                      accept="image/*"
                      onChange={handleFileChange}
                      multiple
                      className="mt-1 md:mt-0 p-2 border bg-white border-gray-300 rounded-lg w-full md:w-2/3 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none"
                      //   required={!idProduk}
                    />
                  </div>
                  {imagePreview.length > 0 && (
                    <div className="mt-2 flex flex-row gap-2 md:ml-1 justify-end w-full flex-wrap">
                      {imagePreview.map((imgPath, index) => (
                        <img
                          key={index}
                          src={
                            imgPath.startsWith("/img")
                              ? apiUrl + imgPath
                              : imgPath
                          }
                          alt={`Foto ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-xl border-2 border-gray-500"
                        />
                      ))}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="bg-[#EE6D3F] text-white px-6 py-2 rounded-lg hover:bg-[#d25f35] transition"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Sukses Modal  */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 cursor-pointer ">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm text-center">
            <div className="flex justify-center items-center text-xl font-semibold text-black mb-4">
              <FaCheckCircle className="mr-2 text-green-500" />
              Produk berhasil ditambahkan!
            </div>
            <div className="flex justify-center">
              <div
                onClick={() => window.close()} // Klik modal langsung tutup tab
                className="bg-[#EE6D3F] w-fit p-2 rounded-xl hover:bg-[#d25f35]  text-white mt-2 text-sm"
              >
                Kembali ke Toko
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TambahProduk;
