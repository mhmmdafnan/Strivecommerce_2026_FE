import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../Component/Loading";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../Component/ConfirmModal";

const AlamatPage = () => {
  const [dataAlamat, setDataAlamat] = useState();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cookie, setCokie, removeCookie] = useCookies();
  const [idAlamat, setIdAlamat] = useState();
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const onTambahAlamatClick = () => {
    navigate("/TambahAlamat");
  };

  const onClose = () => {
    setShowConfirm(false);
  };

  const onDeleteAlamatClick = (id) => {
    setIdAlamat(id);
    setShowConfirm(true);
  };

  const onSuccessDelete = (id) => {
    const deleteAlamat = async () => {
      // setLoading(true);
      try {
        const response = await axios.delete(
          `${apiUrl}/api/v1/alamat/` + id,
          {}
        );
        if (response.data.success) {
          window.location.reload();
        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        // console.log(error);
      } finally {
        // setLoading(false);
      }
    };
    deleteAlamat();
  };

  useEffect(() => {
    const fetchProduk = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/alamat/` + cookie["user_id"],
          {}
        );

        if (response.data.success) {
          setDataAlamat(response.data.data);
        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduk();
  }, []);

  return (
    <>
      <ConfirmModal
        isOpen={showConfirm}
        msg={"Apakah anda yakin ingin menghapus alamat?"}
        onClose={onClose}
        onSuccess={() => onSuccessDelete(idAlamat)}
      />
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 mb-20 md:mt-0">
        <h1 className="text-sm text-gray-600 cursor-pointer">Alamat Saya</h1>
        <div className="bg-white px-4 py-6 mt-4 max-w-3xl mx-auto">
          {loading ? (
            <div className="col-span-6 flex justify-center items-center h-40">
              <Loading w={10} h={10} />
            </div>
          ) : (
            <>
              {Array.isArray(dataAlamat) && dataAlamat.length > 0 ? (
                <>
                  <div
                    className="w-full flex justify-end cursor-pointer items-center text-center text-orange-500 hover:text-orange-400"
                    onClick={onTambahAlamatClick}
                  >
                    <div className="px-2 py-1 rounded-md flex justify-center items-center">
                      <IoAdd /> Tambah Alamat
                    </div>
                  </div>
                  {dataAlamat.map((alamat, idx) => {
                    return (
                      <div
                        key={idx}
                        className="alamat bg-white mx-2 p-2 mb-4 rounded-lg border-2 border-gray-200 flex justify-between items-center"
                      >
                        <div className="">
                          {/* <p className="text-xs text-gray-600">Alamat Pengiriman</p> */}
                          <div className="flex items-center flex-row gap-2 mt-1">
                            <CiLocationOn />
                            <p>
                              {alamat.bangunan} - {alamat.nama}
                            </p>
                          </div>
                          <div className="font-light text-xs text-gray-500 truncate">
                            {alamat.provinsi.nama}, {alamat.kabupaten.nama},{" "}
                            {alamat.kecamatan.nama}, {alamat.desa.nama}
                          </div>
                          <div className="font-light text-xs text-gray-500 truncate">
                            {alamat.detail}
                          </div>
                          <div className="font-light text-xs text-gray-500">
                            {alamat.kodePos}
                          </div>
                          <div className="font-light text-xs text-gray-500">
                            {alamat.notelp}
                          </div>
                          {alamat.is_default === 1 && (
                            <div className="text-xs mt-2">Alamat Utama</div>
                          )}
                        </div>
                        <div
                          className="text-red-500 text-xl"
                          onClick={() => {
                            onDeleteAlamatClick(alamat.id);
                          }}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div
                    className="w-full flex justify-end cursor-pointer items-center text-center text-orange-500 hover:text-orange-400"
                    onClick={onTambahAlamatClick}
                  >
                    <div className="px-2 py-1 rounded-md flex justify-center items-center">
                      <IoAdd /> Tambah Alamat
                    </div>
                  </div>
                  <div className="col-span-6 flex justify-center items-center h-40">
                    {/* <Loading w={10} h={10} /> */}
                    <h1 className="text-gray-400 text-xl">Belum ada alamat</h1>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AlamatPage;
