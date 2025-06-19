import React from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  FaSquareFacebook,
  FaSquareWhatsapp,
  FaSquareXTwitter,
  FaCopy,
} from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

const ModalShare = ({ isOpen, onClose, url, text }) => {
  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const onSalinClick = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success(" Link Berhasil disalin!");
      })
      .catch((err) => {
        toast.error("Gagal menyalin link: " + err);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-end">
          <IoIosClose
            className="text-gray-500 text-4xl hover:text-red-500 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex px-6 mb-6">
          <h2 className="text-lg font-semibold">Bagikan </h2>
        </div>
        <div className="flex flex-col px-6 pb-6">
          <div className="flex space-x-3 items-center justify-center">
            <a
              href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex flex-col text-gray-800 px-4 py-2 rounded hover:text-[#EE6D3F] items-center justify-center "
            >
              <FaSquareWhatsapp className="inline text-5xl" />
              <span className="text-xs">WhatsApp</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex flex-col text-gray-800 px-4 py-2 rounded hover:text-[#EE6D3F] items-center justify-center "
            >
              <FaSquareFacebook className="inline text-5xl" />
              <span className="text-xs">Facebook</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" flex flex-col text-gray-800 px-4 py-2 rounded hover:text-[#EE6D3F] items-center justify-center "
            >
              <FaSquareXTwitter className="inline text-5xl" />
              <span className="text-xs">X</span>
            </a>
          </div>
          <div className="mt-4">
            <div className="text-md text-gray-500">Link Halaman</div>
            <div className="flex justify-between items-center gap-x-5 w-full bg-[#F7F7F7] border-[1px] border-[#A0A0A0] px-2 py-1 rounded mt-1">
              <p className="text-xs font-extralight text-gray-600 w-full">
                {url}
              </p>
              <div className="flex items-center px-2 py-1">
                <div
                  onClick={onSalinClick}
                  className="flex flex-col justify-center items-center font-extralight text-gray-500 hover:text-[#EE6D3F] cursor-pointer  "
                >
                  <FaCopy className="inline text-lg" />
                  <span className="hidden md:inline text-[10px]"> Salin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        toastClassName={() =>
          "bg-[#EE6D3F] text-white px-4 py-3 rounded-lg shadow-md"
        }
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover={false}
        theme="colored"
      />
    </div>
  );
};

export default ModalShare;
