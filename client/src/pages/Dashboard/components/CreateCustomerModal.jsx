import { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../../context/ThemeContext";

const CreateCustomerModal = ({ isOpen, onClose, onSuccess }) => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const modalBg  = isDark ? "bg-[#312F2C] text-[#FAFAFA]" : "bg-white text-gray-900";
  const inputBg  = isDark ? "bg-[#3D3B38] text-[#FAFAFA] placeholder-gray-500" : "bg-gray-50 text-gray-800 placeholder-gray-400";
  const cancelBtn = isDark ? "bg-[#3D3B38] text-gray-300 hover:bg-[#4a4845]" : "bg-gray-100 text-gray-600 hover:bg-gray-200";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      status: formData.status.toLowerCase(),
    };

    try {
      const res = await axios.post(
        import.meta.env.VITE_CUSTOMERS_URL,
        payload,
        { withCredentials: true }
      );

      if (res.data.success || res.status === 201) {
        if (onSuccess) onSuccess();
        setFormData({ name: "", email: "", phone: "", address: "", status: "active" });
        onClose();
      }
    } catch (err) {
      console.error("Creation Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create customer");
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Customer</h2>
            <button
              type="button"
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${isDark ? "bg-[#3D3B38] text-gray-300 hover:bg-[#4a4845]" : "bg-gray-100 text-gray-400 hover:bg-gray-200"} transition-colors`}>
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                required
                className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {/* Phone */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Phone
                </label>
                <input
                  type="text"
                  className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none`}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Address
              </label>
              <textarea
                rows="2"
                className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none resize-none`}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Status
              </label>
              <select
                className={`w-full mt-1 px-4 py-3 ${inputBg} border-none rounded-xl focus:ring-2 focus:ring-blue-100 outline-none font-medium`}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
              {submitting ? "Processing..." : "Create Customer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomerModal;