import { useContext } from "react";
import axios from "axios";
import { CasesContext } from "../../../context/CasesContext";

const DeleteCaseModal = ({ isOpen, onClose, caseId }) => {
  const { fetchCases } = useContext(CasesContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_CASES_URL}/${caseId}`, {
        withCredentials: true,
      });
      await fetchCases(); // Refresh global list
      onClose();
    } catch (err) {
      alert("Could not delete case");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl">
        <div className="text-4xl mb-4">🗑️</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Delete</h3>
        <p className="text-gray-500 text-sm mb-8">
          This will permanently remove this case from the studio records.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCaseModal;
