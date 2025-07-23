
const LoginModal = ({ isOpen, msg, onClose, onSuccess }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black w-full max-w-md rounded-lg shadow-lg pt-6 pb-4 relative">
        <div
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </div>
        {/* Logo */}

        <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-white">
            {msg}
        </h2>

        <div className="place-button w-full flex justify-center gap-2 mt-5">
            <div className="cancel-button bg-blue-500 hover:bg-blue-300 text-white rounded-md px-4 cursor-pointer py-1" onClick={onClose}>
                Batal
            </div>
            <div className="cancel-button bg-red-500 hover:bg-red-300 text-white rounded-md px-4 cursor-pointer py-1" onClick={() => onSuccess()}>
                Yakin
            </div>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;
