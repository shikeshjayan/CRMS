import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const CreateCustomerForm = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  // Form state and UI states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  });
  const [submitting, setSubmitting] = useState(false);
  const [createdCustomer, setCreatedCustomer] = useState(null);

  // Handle form submission with flexible API response parsing
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
        { withCredentials: true },
      );

      if (res.data.success || res.status === 201) {
        // Handle various API response structures
        const customer =
          res.data.customer ||
          res.data.data?.customer ||
          res.data.data ||
          res.data;

        setCreatedCustomer(customer);
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          status: "active",
        });
      }
    } catch (err) {
      console.error("Creation Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create customer");
    } finally {
      setSubmitting(false);
    }
  };

  // Consolidated input change handler for cleaner code
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Dynamic input styling based on theme
  const inputClass = `w-full mt-1 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
    dark
      ? "bg-gray-800 text-gray-100 placeholder-gray-500"
      : "bg-gray-50 text-gray-900 placeholder-gray-400"
  }`;

  // Extract customer ID from various possible response formats
  const getCustomerId = (customer) =>
    customer._id || customer.id || customer.customerId || customer.customer_id;

  return (
    <>
      {/* Main modal overlay */}
      <div
        className={`fixed inset-0 flex items-center justify-center p-4 z-50 ${dark ? "bg-gray-950/80" : "bg-gray-100/80"}`}>
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-lg rounded-3xl shadow-xl overflow-hidden p-8 relative ${dark ? "bg-gray-900" : "bg-white"}`}>
          {/* Close button */}
          <button
            type="button"
            onClick={() => navigate("/customer/dashboard")}
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

          <h2
            className={`text-2xl font-bold mb-6 ${dark ? "text-white" : "text-gray-900"}`}>
            New Customer
          </h2>

          <div className="space-y-4">
            {/* Name field */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className={inputClass}
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            {/* Email and Phone grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className={inputClass}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className={inputClass}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Address field */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Address
              </label>
              <textarea
                name="address"
                rows="2"
                className={`${inputClass} resize-none`}
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, State 12345"
              />
            </div>

            {/* Status selector */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Status
              </label>
              <select
                name="status"
                className={`${inputClass} font-medium`}
                value={formData.status}
                onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full mt-8 py-4 font-bold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl ${
              dark
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}>
            {submitting ? "Processing..." : "Create Customer"}
          </button>
        </form>
      </div>

      {/* Success modal */}
      {createdCustomer && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={() => setCreatedCustomer(null)}
          />

          <div
            className={`relative rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center animate-in fade-in zoom-in duration-200 ${dark ? "bg-gray-900" : "bg-white"}`}>
            {/* Success icon */}
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

            <h3
              className={`text-xl font-bold mb-1 ${dark ? "text-white" : "text-gray-900"}`}>
              Customer Created!
            </h3>
            <p className="text-gray-400 text-sm mb-5">
              The customer has been added successfully.
            </p>

            {/* Customer details card */}
            <div
              className={`rounded-2xl px-5 py-4 mb-6 text-left space-y-2 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Customer ID
                </span>
                <span
                  className={`text-sm font-bold font-mono ${dark ? "text-gray-100" : "text-gray-900"}`}>
                  {getCustomerId(createdCustomer) || "Not returned by API"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Name
                </span>
                <span
                  className={`text-sm font-semibold ${dark ? "text-gray-200" : "text-gray-700"}`}>
                  {createdCustomer.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Email
                </span>
                <span
                  className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                  {createdCustomer.email}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCreatedCustomer(null)}
              className={`w-full py-3 font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl ${
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

export default CreateCustomerForm;
