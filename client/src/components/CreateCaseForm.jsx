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

  const dark = theme === "dark";

  // Handle modal close - either via prop callback or navigation
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/customer/dashboard");
    }
  };

  // Form state with default values
  const [form, setForm] = useState({
    title: "",
    description: "",
    customerId: user?._id,
    status: "open",
    priority: "medium",
  });

  // Sync customerId with actual customer record when data loads
  useEffect(() => {
    if (customers?.length && user) {
      const match = customers.find((c) => c.email === user.email);
      if (match) setForm((prev) => ({ ...prev, customerId: match._id }));
    }
  }, [customers, user]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Create case API call with success/error handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(import.meta.env.VITE_CASES_URL, form, {
        withCredentials: true,
      });
      if (res.status === 201 || res.data.success) {
        // Refresh cases list and reset form
        if (fetchCases) fetchCases();
        setForm({
          customerId: user?._id,
          title: "",
          description: "",
          status: "open",
          priority: "medium",
        });
        setShowSuccess(true);
      }
    } catch (err) {
      console.error("Case Creation Error:", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Title, Description, and Customer are required",
      );
    } finally {
      setLoading(false);
    }
  };

  // Dynamic input styling based on theme
  const inputClass = `w-full border rounded-xl px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
    dark
      ? "bg-gray-800 border-gray-700 text-gray-100"
      : "bg-gray-50 border-gray-200 text-gray-800"
  }`;

  return (
    <>
      {/* Main modal overlay */}
      <div className="fixed inset-0 bg-gray-400/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div
          className={`rounded-3xl shadow-2xl w-full max-w-lg p-8 relative ${dark ? "bg-gray-900" : "bg-white"}`}>
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all ${
              dark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-200"
                : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800"
            }`}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h1
            className={`text-2xl font-bold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
            New Case
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Display current user ID */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Your ID
              </label>
              <span className="text-xs font-mono text-gray-500">
                #{user?._id?.slice(-8)}
              </span>
            </div>

            {/* Form inputs */}
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
                placeholder="e.g. Memory card failure"
                className={inputClass}
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
                placeholder="Describe the issue in detail..."
                className={inputClass + " resize-none"}
              />
            </div>

            {/* Priority and Status selectors */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className={inputClass}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={inputClass}>
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-3 py-4 rounded-2xl text-sm font-bold transition-all shadow-sm active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
                dark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
              {loading ? "Creating..." : "Create Case"}
            </button>
          </form>
        </div>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-60 p-4">
          <div
            className={`rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center ${dark ? "bg-gray-900" : "bg-white"}`}>
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2
              className={`text-xl font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
              Case Created!
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              The case has been successfully added to the records.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                if (onClose) onClose();
              }}
              className={`w-full py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
                dark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}>
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCaseForm;
