import { useState } from "react";   
import { CiLocationOn  } from "react-icons/ci";

const PilihAlamatModal = ({ isOpen, onClose, onSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const addresses = [
    { id: 1, name: "Alamat 1", detail: "Detail Alamat 1" },
    { id: 2, name: "Alamat 2", detail: "Detail Alamat 2" },
    { id: 3, name: "Alamat 3", detail: "Detail Alamat 3" },
  ];

  const handleSelect = (address) => {
    setSelectedAddress(address);
    onSelect(address);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        
        <div className="bg-white p-6 rounded-lg shadow-lg relative">

            <div className="absolute  bg-gray-100 top-2 right-2 px-2 py-1 rounded-md hover:bg-red-400 hover:text-white transition-all duration-300 cursor-pointer" onClick={onClose}>
                X
            </div>

            <h2 className="text-lg font-semibold mb-4">Pilih Alamat</h2>
            
            <div className="alamat mb-4 bg-white mx-2 p-2 rounded-lg  shadow-md md:flex md:justify-between justify-center items-center">
                <div className="">
                    <p className="text-xs text-gray-600">Alamat Pengiriman</p>
                    <div className="flex items-center flex-row gap-2 mt-1">
                        <CiLocationOn />
                        <p>Pondok Arrayyan - Ryan Ardiansyah</p>
                    </div>
                    <div className="font-light text-xs text-gray-500 truncate">
                        Jalan Raya Pakkola, no 5A, Pakkola, Banggae, Majene, Sulawesi Barat
                    </div>
                    <div className="font-light text-xs text-gray-500">
                        91411

                    </div>
                    <div className="font-light text-xs text-gray-500">
                        082246657077
                    </div>
                </div>
                <div className="flex justify-center items-center mt-2 md:mt-0">
                    <div className="bg-orange-500 text-center min-w-36 max-w-96 text-white text-xs px-4 py-2 rounded-lg cursor-pointer" onClick={() => handleSelect(selectedAddress)}>
                        Gunakan
                    </div>
                </div>

            </div>
            <div className="alamat mb-4 bg-white mx-2 p-2 rounded-lg  shadow-md md:flex md:justify-between justify-center items-center">
                <div className="">
                    <p className="text-xs text-gray-600">Alamat Pengiriman</p>
                    <div className="flex items-center flex-row gap-2 mt-1">
                        <CiLocationOn />
                        <p>Pondok Arrayyan - Ryan Ardiansyah</p>
                    </div>
                    <div className="font-light text-xs text-gray-500 truncate">
                        Jalan Raya Pakkola, no 5A, Pakkola, Banggae, Majene, Sulawesi Barat
                    </div>
                    <div className="font-light text-xs text-gray-500">
                        91411

                    </div>
                    <div className="font-light text-xs text-gray-500">
                        082246657077
                    </div>
                </div>
                <div className="flex justify-center items-center mt-2 md:mt-0">
                    <div className="bg-orange-500 text-center min-w-36 max-w-96 text-white text-xs px-4 py-2 rounded-lg cursor-pointer" onClick={() => handleSelect(selectedAddress)}>
                        Gunakan
                    </div>
                </div>

            </div>
            <div className="alamat mb-4 bg-white mx-2 p-2 rounded-lg  shadow-md md:flex md:justify-between justify-center items-center">
                <div className="">
                    <p className="text-xs text-gray-600">Alamat Pengiriman</p>
                    <div className="flex items-center flex-row gap-2 mt-1">
                        <CiLocationOn />
                        <p>Pondok Arrayyan - Ryan Ardiansyah</p>
                    </div>
                    <div className="font-light text-xs text-gray-500 truncate">
                        Jalan Raya Pakkola, no 5A, Pakkola, Banggae, Majene, Sulawesi Barat
                    </div>
                    <div className="font-light text-xs text-gray-500">
                        91411

                    </div>
                    <div className="font-light text-xs text-gray-500">
                        082246657077
                    </div>
                </div>
                <div className="flex justify-center items-center mt-2 md:mt-0">
                    <div className="bg-orange-500 text-center min-w-36 max-w-96 text-white text-xs px-4 py-2 rounded-lg cursor-pointer" onClick={() => handleSelect(selectedAddress)}>
                        Gunakan
                    </div>
                </div>

            </div>
        
        </div>

        
    </div>
  );
}
export default PilihAlamatModal;