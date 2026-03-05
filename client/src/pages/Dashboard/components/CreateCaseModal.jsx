import { useState, useContext } from "react";
import axios from "axios";
import { CustomerContext } from "../../../context/CustomerContext";
import { ThemeContext } from "../../../context/ThemeContext";

const CreateCaseModal = ({ isOpen, onClose, onSuccess }) => {
  const { customers } = useContext(CustomerContext);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const modalBg = isDark
    ? "bg-[#312F2C] text-[#FAFAFA]"
    : "bg-white text-gray-900";
  const inputBg = isDark
    ? "bg-[#3D3B38] text-[#FAFAFA] placeholder-gray-500"
    : "bg-gray-50 text-gray-800 placeholder-gray-400";
  const cancelBtn = isDark
    ? "bg-[#3D3B38] text-gray-300 hover:bg-[#4a4845]"
    : "bg-gray-100 text-gray-600 hover:bg-gray-200";

  const [formData, setFormData] = useState({
    customerId: "",
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });

  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(import.meta.env.VITE_CASES_URL, formData, {
        withCredentials: true,
      });

      if (res.data.success || res.status === 201) {
        if (onSuccess) onSuccess();
        setFormData({
          customerId: "",
          title: "",
          description: "",
          status: "open",
          priority: "medium",
        });
        onClose();
      }
    } catch (err) {
      console.error("Case Creation Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Title, Description, and Customer are required",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit}
        className={`relative ${modalBg} w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200`}>
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">New Studio Case</h2>

          <div className="space-y-4">
            {/* Customer Dropdown */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Select Customer
              </label>
              <select
                required
                className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none`}
                value={formData.customerId}
                onChange={(e) =>
                  setFormData({ ...formData, customerId: e.target.value })
                }>
                <option value="">Choose a customer...</option>
                {customers?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Case Title */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Case Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Memory card failure"
                className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none`}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Description
              </label>
              <textarea
                required
                rows="3"
                placeholder="Describe the issue in detail..."
                className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none resize-none`}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Priority
                </label>
                <select
                  className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none`}
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Status
                </label>
                <select
                  className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none`}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }>
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-4 ${cancelBtn} font-bold rounded-2xl transition-colors`}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 disabled:opacity-50 transition-colors">
              {submitting ? "Creating..." : "Create Case"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCaseModal;
