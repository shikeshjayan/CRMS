import { useState, useContext, useEffect } from "react";
import { CasesContext } from "../context/CasesContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CustomerContext } from "../context/CustomerContext";
import { ThemeContext } from "../context/ThemeContext";

const CreateCaseForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { fetchCases } = useContext(CasesContext);
  const { customers } = useContext(CustomerContext);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  const [form, setForm] = useState({
    title: "",
    description: "",
    customerId: "",
    status: "open",
    priority: "medium",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customers?.length && user) {
      const match = customers.find(
        (c) => c.email === user.email || c.userId === user._id,
      );
      if (match) setForm((prev) => ({ ...prev, customerId: match._id }));
    }
  }, [customers, user]);

  const handleClose = () =>
    onClose ? onClose() : navigate("/customer/dashboard");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_CASES_URL, form, {
        withCredentials: true,
      });
      if (res.status === 201 || res.data.success) {
        if (fetchCases) fetchCases();
        setShowSuccess(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error creating case");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 caret-blue-500";
  const themeClasses = isDark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400";

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div
          className={`rounded-3xl shadow-2xl w-full max-w-lg p-8 relative animate-in fade-in zoom-in duration-200 ${isDark ? "bg-[#1a1c1e] border border-gray-800" : "bg-white"}`}>
          <button
            type="button"
            onClick={handleClose}
            className={`absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isDark
                ? "bg-gray-800 text-gray-400 hover:text-white"
                : "bg-gray-100 text-gray-500 hover:text-black"
            }`}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h1
            className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            New Case
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Case Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                autoComplete="off"
                className={`${inputBase} ${themeClasses}`}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="4"
                className={`${inputBase} ${themeClasses} resize-none`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className={`${inputBase} ${themeClasses} cursor-pointer`}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={`${inputBase} ${themeClasses} cursor-pointer`}>
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 py-4 rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 ${
                isDark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
              {loading ? "Processing..." : "Submit Case"}
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60 p-4">
          <div
            className={`rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center border ${isDark ? "bg-[#1a1c1e] border-gray-800" : "bg-white border-transparent"}`}>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2
              className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              Success!
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Your request has been logged successfully.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                handleClose();
              }}
              className={`w-full py-3 rounded-2xl text-sm font-bold transition-all ${
                isDark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCaseForm;
