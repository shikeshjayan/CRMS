import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const CustomerCard = ({ customer, onClose }) => {
  const { theme } = useContext(ThemeContext);

  if (!customer) return null;

  const isDark    = theme === "dark";
  const modalBg   = isDark ? "bg-[#312F2C] text-[#FAFAFA]" : "bg-white text-gray-900";
  const textMain  = isDark ? "text-[#FAFAFA]"               : "text-gray-700";
  const textMuted = isDark ? "text-gray-400"                 : "text-gray-400";
  const idText    = isDark ? "text-gray-400"                 : "text-gray-400";
  const closeBtn  = isDark ? "bg-[#3D3B38] text-gray-300 hover:text-white" : "bg-gray-50 text-gray-400 hover:text-gray-900";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Card */}
      <div className={`relative ${modalBg} w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100`}>
        {/* Status Accent Bar */}
        <div className={`h-2 ${customer.status?.toLowerCase() === "active" ? "bg-green-500" : "bg-red-500"}`} />

        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold">{customer.name}</h2>
              <p className={`text-xs font-mono mt-1 uppercase ${idText}`}>
                ID: {customer._id}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${closeBtn} transition-colors`}>
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                ✉️
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-1 ${textMuted}`}>
                  Email
                </p>
                <p className={`font-medium ${textMain}`}>{customer.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                📞
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-1 ${textMuted}`}>
                  Phone
                </p>
                <p className={`font-medium ${textMain}`}>{customer.phone}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mt-1">
                📍
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-1 ${textMuted}`}>
                  Address
                </p>
                <p className={`font-medium leading-relaxed ${textMain}`}>
                  {customer.address || "No address provided"}
                </p>
              </div>
            </div>

            {/* Customer Since */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                📅
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-1 ${textMuted}`}>
                  Customer Since
                </p>
                <p className={`font-medium ${textMain}`}>
                  {new Date(customer.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all active:scale-[0.98]">
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;