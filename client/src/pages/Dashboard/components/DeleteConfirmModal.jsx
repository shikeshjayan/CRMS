const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, customerName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 text-2xl mb-6 mx-auto">
          ⚠️
        </div>

        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
          Delete Customer?
        </h3>
        <p className="text-sm text-gray-500 text-center mb-8">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">{customerName}</span>?
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
