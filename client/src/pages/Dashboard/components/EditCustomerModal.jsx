import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../../context/ThemeContext";

const EditCustomerModal = ({ customer, onClose, onSuccess }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fill form with customer data
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        status: customer.status?.toLowerCase() || "active",
      });
    }
  }, [customer]);

  if (!customer) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // FIX: Include the _id in the payload just in case the backend requires it in the body
    const payload = {
      _id: customer._id,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      status: formData.status,
    };
    console.log(payload);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_CUSTOMERS_URL}/${customer._id}`,
        payload,
        { withCredentials: true },
      );

      // Check for common successful response patterns
      if (res.data.success || res.status === 200) {
        onSuccess(res.data.data || payload);
        onClose();
      }
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert(
        err.response?.data?.message ||
          "Failed to update. Please check if email is unique.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // --- Dynamic Styles ---
  const modalBg = isDark ? "bg-[#2D2D2D] text-white" : "bg-white text-gray-900";
  const inputBg = isDark
    ? "bg-[#1E1E1E] text-white border-[#3D3D3D]"
    : "bg-gray-50 text-black border-gray-100";
  const labelClass =
    "text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block";

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <form
        onSubmit={handleSubmit}
        className={`relative ${modalBg} w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border ${isDark ? "border-[#3D3D3D]" : "border-transparent"}`}>
        <div className="p-6 md:p-10">
          <header className="mb-8">
            <h2 className="text-2xl font-black tracking-tight">
              Edit Customer
            </h2>
            <p className="text-xs text-gray-500 mt-1 font-mono uppercase">
              ID: {customer._id.slice(-8)}
            </p>
          </header>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className={`w-full px-5 py-4 ${inputBg} border rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all`}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className={`w-full px-5 py-4 ${inputBg} border rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all`}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 ..."
                  className={`w-full px-5 py-4 ${inputBg} border rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all`}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className={labelClass}>Studio / Billing Address</label>
              <textarea
                rows="2"
                placeholder="Street, City, Zip..."
                className={`w-full px-5 py-4 ${inputBg} border rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none`}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            {/* Status */}
            <div>
              <label className={labelClass}>Account Status</label>
              <select
                className={`w-full px-5 py-4 ${inputBg} border rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium appearance-none`}
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-10">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                isDark
                  ? "bg-[#3D3D3D] text-gray-300 hover:bg-[#4D4D4D]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              Discard
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "Update Records"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCustomerModal;
