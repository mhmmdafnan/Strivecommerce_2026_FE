import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const FormUMKMPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL; // URL API
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [cookies] = useCookies();
  const [data, setData] = useState({
    userId: "",
    nama_umkm: "",
    no_telp: "",
    kategori: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "image/png") {
      setError("File harus berformat PNG");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  };
  const sendData = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", cookies.user_id);
    formData.append("nama_toko", data.nama_umkm);
    formData.append("telp", data.no_telp);
    formData.append("klasifikasi_toko", parseInt(data.kategori));
    formData.append("ktp", file); // file dari handleFileChange
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ":", pair[1]);
    // }

    try {
      const response = await axios.post(
        apiUrl + "/api/v1/pengajuan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        toast.success("Pengajuan berhasil!");

        setData({
          userId: "",
          nama_umkm: "",
          no_telp: "",
          kategori: "",
        });
        setFile(null);
        document.getElementById("file").value = null;
      } else {
        toast.error("Gagal: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saat Mengirimkan Data");
    }
  };

  return (
    <>
      {/* <Navbar/> */}

      <div className="flex justify-center bg-white lg:h-[calc(100vh-72px)] ">
        <div className="pembungkus-utama mt-4 lg:mt-10 w-full md:max-w-[800px] lg:max-w-[1000px]">
          <div className="mx-4 md:mx-8 lg:mx-0 text-center mb-28">
            <h1 className="font-semibold text-3xl">
              Anda Pemilik Usaha UMKM? Buka Toko anda sekarang!
            </h1>
            <p className="text-[10px]">
              Dengan membuka toko anda di STRIVE anda bisa memasarkan produk
              UMKM anda secara Online
            </p>
          </div>

          <div className="form-dan-alur lg:flex justify-between mt-6 gap-4 mx-4 md:mx-8 lg:mx-0 lg:h-[calc(100vh-180px)]">
            <div className="div-kiri hidden text-gray-700 lg:block lg:relative w-full lg:w-fit">
              <form onSubmit={sendData} className="text-sm">
                <div className="font-semibold mb-4">Informasi UMKM</div>
                <div className="">
                  <label htmlFor="nama_umkm" className="">
                    Nama UMKM
                  </label>
                  <div className="mb-2">
                    <input
                      className="border-2 min-w-80 px-2 py-1 bg-gray-200 rounded-xl"
                      type="text"
                      id="nama_umkm"
                      name="nama_umkm"
                      value={data.nama_umkm}
                      onChange={handleChange}
                    />
                  </div>

                  <label htmlFor="no_telp">No. Telepon</label>
                  <div className="mb-2">
                    <input
                      className="border-2 px-2 py-1 min-w-80 bg-gray-200 rounded-xl"
                      type="text"
                      id="no_telp"
                      name="no_telp"
                      value={data.no_telp}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor="kategori">Kategori</label>
                  <div>
                    <select
                      className="appearance-none hover:placeholder-shown:bg-emerald-500 relative w-48 bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900  text-sm font-bold rounded-lg block p-2.5"
                      value={data.kategori}
                      onChange={handleChange}
                      name="kategori"
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="1">Makanan</option>
                      <option value="2">Minuman</option>
                      <option value="3">Fashion</option>
                    </select>
                  </div>
                </div>

                <div className="font-semibold mt-4 mb-4">Dokumen Terkait</div>
                <div className="">
                  <label htmlFor="file">KTP Pemilik UMKM</label>
                  <div>
                    <input
                      className="border-2 px-2 py-1 bg-gray-200 rounded-xl"
                      type="file"
                      id="file"
                      accept=".png"
                      onChange={handleFileChange}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>
                <button className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg mt-8">
                  Kirim
                </button>
              </form>
            </div>

            <div className="div-kanan relative mt-10 lg:mt-4 justify-center h-[calc(100vh-230px)] md:h-[calc(100vh-200px)] lg:h-fit">
              <div className="bg-orange rounded-full w-[400px] h-[400px] bg-blend-color-burn blur-2xl bg-orange-500 opacity-30 -top-10 lg:top-0 right-1/2 translate-x-1/2 absolute items-center justify-center"></div>
              <div className="w-full hidden lg:block text-center font-semibold">
                Proses Pembukaan Toko UMKM di STRIVE Sangat mudah!
              </div>
              <div className="alur mt-24 lg:mt-10 flex flex-col items-center text-center">
                <div>Mengisi Form Pengajuan Toko</div>
                <div className="lingkaran-orange rounded-full w-3 h-3 bg-orange-500"></div>
                <div className="garis-vertikal bg-black w-px h-20 block"></div>
                <div className="lingkaran-orange rounded-full w-3 h-3 bg-orange-500"></div>
                <div>Menunggu Persetujuan Admin</div>
                <div className="lingkaran-orange rounded-full w-3 h-3 bg-orange-500"></div>
                <div className="garis-vertikal bg-black w-px h-20 block"></div>
                <div className="lingkaran-orange rounded-full w-3 h-3 bg-orange-500"></div>
                <div>
                  Anda bisa mulai berjualan di{" "}
                  <p className="font-bold">STRIVE!</p>
                </div>
              </div>
              <div className="w-full mt-32 lg:hidden text-center font-semibold ">
                Proses Pembukaan Toko UMKM di STRIVE Sangat mudah!{" "}
                <span className="underline cursor-pointer">
                  Buka Toko Sekarang!
                </span>
              </div>
            </div>

            <div className="div-bawah lg:hidden relative h-screen lg:h-fit w-full lg:w-fit">
              <div className="font-semibold mb-5 text-center text-xl">
                Form Pembukaan Toko UMKM
              </div>

              <form action="text-sm">
                <div className="font-semibold mt-8">Informasi UMKM</div>
                <div className="ml-4">
                  <div className="mt-1">
                    <label htmlFor="nama_umkm" className="block">
                      Nama UMKM
                    </label>
                    <input
                      className="border-2 min-w-80 px-2 py-1 bg-gray-200 rounded-xl"
                      type="text"
                      id="nama_umkm"
                      name="nama_umkm"
                      value={data.nama_umkm}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-1">
                    <label htmlFor="no_telp" className="block">
                      No. Telepon
                    </label>
                    <input
                      className="border-2 px-2 py-1 min-w-80 bg-gray-200 rounded-xl"
                      type="text"
                      id="no_telp"
                      name="no_telp"
                      value={data.no_telp}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-1">
                    <label htmlFor="kategori">Kategori</label>

                    <select
                      className="appearance-none hover:placeholder-shown:bg-emerald-500 relative  bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900  text-sm font-bold rounded-lg block p-2.5"
                      value={data.kategori}
                      onChange={handleChange}
                      name="kategori"
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="1">Makanan</option>
                      <option value="2">Minuman</option>
                      <option value="3">Fashion</option>
                    </select>
                  </div>
                </div>

                <div className="font-semibold mt-8">Dokumen Terkait</div>
                <div className="ml-4">
                  <div className="mt-1">
                    <label htmlFor="file" className="block">
                      KTP Pemilik UMKM
                    </label>
                    <input
                      className="border-2 px-2 py-1 bg-gray-200 rounded-xl"
                      type="file"
                      id="file"
                      accept=".png"
                      onChange={handleFileChange}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 w-full text-white px-4 py-2 rounded-lg mt-10"
                >
                  Kirim
                </button>
              </form>
            </div>
          </div>

          <div className="faq">
            <h1 className="text-center font-semibold mb-4">FAQ</h1>

            <div className="block-faq grid grid-cols-1 md:grid-cols-2 gap-x-2 mx-2">
              <div className="bg-gray-100 rounded-md shadow-md mb-2">
                <div className="p-4">
                  <h2 className="font-semibold">Apa itu UMKM?</h2>
                  <p className="text-sm">
                    UMKM adalah Usaha Mikro, Kecil, dan Menengah yang memiliki
                    peran penting dalam perekonomian Indonesia.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-md shadow-md mb-2">
                <div className="p-4">
                  <h2 className="font-semibold">Apa itu UMKM?</h2>
                  <p className="text-sm">
                    UMKM adalah Usaha Mikro, Kecil, dan Menengah yang memiliki
                    peran penting dalam perekonomian Indonesia.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-md shadow-md mb-2">
                <div className="p-4">
                  <h2 className="font-semibold">Apa itu UMKM?</h2>
                  <p className="text-sm">
                    UMKM adalah Usaha Mikro, Kecil, dan Menengah yang memiliki
                    peran penting dalam perekonomian Indonesia.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-md shadow-md mb-2">
                <div className="p-4">
                  <h2 className="font-semibold">Apa itu UMKM?</h2>
                  <p className="text-sm">
                    UMKM adalah Usaha Mikro, Kecil, dan Menengah yang memiliki
                    peran penting dalam perekonomian Indonesia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormUMKMPage;
