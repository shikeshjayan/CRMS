import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CasesContext } from "../../../context/CasesContext";

const EditCaseModal = ({ isOpen, onClose, caseData }) => {
  const { fetchCases } = useContext(CasesContext);
  const [formData, setFormData] = useState({ ...caseData });
  const [isSaving, setIsSaving] = useState(false);

  // Sync form state when caseData changes or modal opens
  useEffect(() => {
    if (caseData) {
      setFormData({ ...caseData });
    }
  }, [caseData, isOpen]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Ensure payload matches backend requirements
    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority, // Now included
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_CASES_URL}/${caseData._id}`,
        payload,
        {
          withCredentials: true,
        },
      );
      await fetchCases();
      onClose();
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleSave}
        className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold mb-6 text-gray-900">
          Edit Case Settings
        </h2>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Subject
            </label>
            <input
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Case Title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Description
            </label>
            <textarea
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              rows="3"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Case details..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Status
              </label>
              <select
                className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none cursor-pointer"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Priority - ADDED THIS */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Priority
              </label>
              <select
                className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none cursor-pointer"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 py-3 font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-colors">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCaseModal;
