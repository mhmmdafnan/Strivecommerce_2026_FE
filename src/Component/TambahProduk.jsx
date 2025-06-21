import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FaCheckCircle, FaPlus } from "react-icons/fa";

const TambahProduk = () => {
  const navigate = useNavigate();
  //   const backendUrl = import.meta.env.VITE_API_URL;
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const [cookies] = useCookies();
  const { idProduk } = useParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const firstInputRef = useRef(null);
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    variasi: [{ nama: "", stok: "", harga: "" }],
    deskripsi: "",
    media: [], // Ubah menjadi array untuk menampung banyak file
  });

  const check_empty = () => {
    if (formData.nama === "") {
      return false;
    }
    if (formData.kategori === "") {
      return false;
    }
    // Validasi minimal 1 variasi
    if (formData.variasi.length === 0) return false;

    // Cek setiap variasi: nama dan stok harus diisi
    for (let v of formData.variasi) {
      if (v.nama.trim() === "" || v.stok === "" || v.harga === "") {
        return false;
      }
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
    // const msg_div = document.getElementById("message-div");
    // const msg_div_ksg = document.getElementById("message-div-ksg");
    // if (!msg_div.classList.contains("hidden")) {
    //   msg_div.classList.add("hidden");
    // }
    // if (!msg_div_ksg.classList.contains("hidden")) {
    //   msg_div_ksg.classList.add("hidden");
    // }
  };

  const handleTambahVariasi = () => {
    setFormData((prev) => ({
      ...prev,
      variasi: [...prev.variasi, { nama: "", stok: "", harga: "" }],
    }));
  };

  const handleHapusVariasi = (index) => {
    const updated = formData.variasi.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      variasi: updated,
    }));
  };

  const handleVariasiChange = (index, field, value) => {
    const updated = [...formData.variasi];
    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      variasi: updated,
    }));
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

  const handleFileChange = (e) => {
    // const selectedFiles = Array.from(e.target.files);
    // const allowedExtensions = [".jpg", ".jpeg", ".png"];
    // const maxFileSize = 10 * 1024 * 1024; // 10 MB dalam byte
    // console.log(selectedFiles);
    // const validFiles = selectedFiles.filter((file) => {
    //   const ext = file.name.toLowerCase().split(".").pop();
    //   const isValidExtension = allowedExtensions.includes(`.${ext}`);
    //   const isValidSize = file.size <= maxFileSize; // Memeriksa ukuran file
    //   return isValidExtension && isValidSize;
    // });
    // // Cek jika ada file yang tidak valid
    // if (validFiles.length !== selectedFiles.length) {
    //   alert(
    //     "Hanya file gambar (jpg, jpeg, png) dengan ukuran maksimal 10 MB yang diperbolehkan!"
    //   );
    // }
    // setFormData({
    //   ...formData,
    //   media: validFiles, // Mengubah file menjadi array dan hanya file valid yang diterima
    // });
    // console.log("Files yang dipilih:", validFiles);
  };

  const updateData = async (idProduk, propertyData) => {
    // const formDataWithFiles = new FormData();
    // formDataWithFiles.append("nama", propertyData.nama);
    // formDataWithFiles.append("loc", propertyData.lokasi);
    // formDataWithFiles.append("tag_loc", propertyData.tag_lokasi);
    // formDataWithFiles.append("luas", propertyData.luas_rumah);
    // formDataWithFiles.append("jml_kmr_tdr", propertyData.jml_kmr_tdr);
    // formDataWithFiles.append("jml_kmr_mnd", propertyData.jml_kmr_mnd);
    // formDataWithFiles.append("detail", propertyData.detail);
    // formDataWithFiles.append("harga", propertyData.harga);
    // if (propertyData.media && propertyData.media.length > 0) {
    //   propertyData.media.forEach((file) => {
    //     formDataWithFiles.append("files", file);
    //   });
    // }
    // try {
    //   const res = await axios.patch(
    //     `${backendUrl}/api/v1/properti/${idProduk}`,
    //     formDataWithFiles,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         token: `${cookies["token"]}`,
    //       },
    //     }
    //   );
    //   return res.data.data;
    // } catch (err) {
    //   console.error("Error saat update:", err.response || err.message);
    //   throw err;
    // }
  };

  const sendData = async (propertyData) => {
    // const formDataWithFiles = new FormData();
    // formDataWithFiles.append("nama", propertyData.nama);
    // formDataWithFiles.append("loc", propertyData.lokasi);
    // formDataWithFiles.append("tag_loc", propertyData.tag_lokasi);
    // formDataWithFiles.append("luas", propertyData.luas_rumah);
    // formDataWithFiles.append("jml_kmr_tdr", propertyData.jml_kmr_tdr);
    // formDataWithFiles.append("jml_kmr_mnd", propertyData.jml_kmr_mnd);
    // formDataWithFiles.append("detail", propertyData.detail);
    // formDataWithFiles.append("harga", propertyData.harga);
    // // Menambahkan semua file ke FormData
    // propertyData.media
    //   .slice()
    //   .reverse()
    //   .forEach((file) => {
    //     formDataWithFiles.append("files", file);
    //     // formDataWithFiles.append("fileOrder[]", index);
    //   });
    // // console.log(propertyData)
    // try {
    //   const res = await axios.post(
    //     backendUrl + "/api/v1/properti",
    //     formDataWithFiles,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         token: `${cookies["token"]}`,
    //       },
    //     }
    //   );
    //   console.log(res.data);
    //   return res.data.data;
    // } catch (err) {
    //   console.error("Error detail:", err.response || err.message);
    //   throw err;
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSuccessModal(true);

    // setLoading(true);
    // if (check_empty()) {
    //   try {
    //     if (idProp) {
    //       // MODE EDIT
    //       await updateData(idProp, formData);
    //       navigate("/super/properti?success-edit=true");
    //     } else {
    //       // MODE TAMBAH
    //       await sendData(formData);
    //       navigate("/super/properti?success-add=true");
    //     }
    //   } catch (error) {
    //     // console.error("Error saat mengirim data:", error);
    //     navigate("/super/properti?error=true");
    //   }
    // }
    // setLoading(false);
  };

  useEffect(() => {
    firstInputRef.current?.focus();
    // const fetchData = async () => {
    //   if (idProp) {
    //     try {
    //       const res = await axios.get(
    //         `${backendUrl}/api/v1/properti/${idProp}`,
    //         {
    //           headers: {
    //             token: `${cookies["token"]}`,
    //           },
    //         }
    //       );
    //       const data = res.data.data;
    //       // Set nilai default form
    //       setFormData({
    //         nama: data.nama,
    //         lokasi: data.loc,
    //         tag_lokasi: data.tag_loc,
    //         luas_rumah: data.luas,
    //         jml_kmr_tdr: data.jml_kmr_tdr,
    //         jml_kmr_mnd: data.jml_kmr_mnd,
    //         detail: data.detail,
    //         harga: data.harga,
    //         media: [], // File tidak bisa dimuat ulang, jadi tetap kosong
    //       });
    //       // Simpan path gambar dari backend (jika banyak, pakai array)
    //       if (data.file_path) {
    //         const parsed = JSON.parse(data.file_path); // asumsi bentuknya array string
    //         setImagePreview(parsed);
    //       }
    //     } catch (error) {
    //       console.error("Gagal memuat data properti:", error);
    //     }
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-5 md:px-20 py-5 mb-20 md:mt-0">
        {/* Navigation */}
        <div className="flex gap-x-1 p-1 my-2">
          <div
            onClick={() => navigate("/tokoSaya")}
            className="text-sm text-gray-400 hover:text-gray-800 cursor-pointer"
          >
            Toko Saya /
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
                <input
                  type="text"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="mt-1 md:mt-0 p-2 border border-gray-300 rounded-lg w-full md:w-2/3 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none"
                  //   required
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
                <label className="md:w-1/3 text-gray-700">Foto Produk</label>
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
              {idProduk && imagePreview.length > 0 && (
                <div className="mt-2 flex flex-row gap-2 md:ml-1 w-full md:w-2/3 ">
                  {imagePreview.map((imgPath, index) => (
                    <img
                      key={index}
                      src={backendUrl + imgPath} // sesuaikan dengan path serve kamu
                      alt={`Foto ${index + 1}`}
                      className="w-24 h-24 object-cover rounded border "
                    />
                  ))}
                </div>
              )}
              {/* stok */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <label className="md:w-1/3 mb-2 text-gray-700">
                    Variasi Produk
                  </label>
                  <div
                    onClick={handleTambahVariasi}
                    className="flex justify-center items-center bg-[#EE6D3F] text-white px-4 py-2 rounded-lg hover:bg-[#ce4747] transition cursor-pointer"
                  >
                    <FaPlus />
                  </div>
                </div>
                {formData.variasi.map((item, index) => (
                  <>
                    <div
                      key={index}
                      className="flex gap-2 mb-2  justify-end items-center"
                    >
                      {formData.variasi.length > 1 && index > 0 && (
                        <div
                          onClick={() => handleHapusVariasi(index)}
                          className="flex justify-center items-center bg-red-500 text-white px-1 w-fit rounded-lg hover:bg-red-600 cursor-pointer"
                        >
                          ✕
                        </div>
                      )}
                      <input
                        type="text"
                        placeholder="Nama Variasi (contoh: Warna Merah)"
                        value={item.nama}
                        onChange={(e) =>
                          handleVariasiChange(index, "nama", e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded-lg w-1/3 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Stok"
                        value={item.stok}
                        onChange={(e) =>
                          handleVariasiChange(index, "stok", e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded-lg w-20 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Harga"
                        value={formatRupiah(item.harga)}
                        onChange={(e) =>
                          handleVariasiChange(
                            index,
                            "harga",
                            toNumberOnly(e.target.value)
                          )
                        }
                        className="p-2 border border-gray-300 rounded-lg w-1/3 focus:ring-1 focus:ring-[#ff8052] focus:border-[#ff8052] focus:outline-none"
                      />
                    </div>
                  </>
                ))}
              </div>

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
