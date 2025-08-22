import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";

const PilihAlamatModal = ({ isOpen, onClose, onSelect, data }) => {
  const handleSelect = (id) => {
    // setSelectedAddress(address);
    onSelect(id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <div
          className="absolute  bg-gray-100 top-2 right-2 px-2 py-1 rounded-md hover:bg-red-400 hover:text-white transition-all duration-300 cursor-pointer"
          onClick={onClose}
        >
          X
        </div>

        <h2 className="text-lg font-semibold mb-4">Pilih Alamat</h2>

        {data.map((item, idx) => {
          return (
            <div
              key={idx}
              className="alamat mb-4 bg-white mx-2 p-2 rounded-lg  shadow-md md:flex md:justify-between justify-center items-center"
            >
              <div className="">
                <p className="text-xs text-gray-600">Alamat Pengiriman</p>
                <div className="flex items-center flex-row gap-2 mt-1">
                  <CiLocationOn />
                  <p>
                    {item.bangunan} - {item.nama}
                  </p>
                </div>
                <div className="font-light text-xs text-gray-500 truncate">
                  {item.provinsi.nama}, {item.kabupaten.nama},{" "}
                  {item.kecamatan.nama}
                </div>
                <div className="font-light text-xs text-gray-500 truncate">
                  {item.detail}
                </div>
                <div className="font-light text-xs text-gray-500">
                  {item.kodePos}
                </div>
                <div className="font-light text-xs text-gray-500">
                  {item.notelp}
                </div>
              </div>
              <div className="flex justify-center items-center mt-2 md:mt-0">
                <div
                  className="bg-orange-500 text-center min-w-36 max-w-96 text-white text-xs px-4 py-2 rounded-lg cursor-pointer"
                  onClick={() => handleSelect(item.id)}
                >
                  Gunakan
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PilihAlamatModal;
