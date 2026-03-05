import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CustomerContext } from "../../context/CustomerContext";
const EditCustomerModal = ({ customer, onClose }) => {
  const { fetchCustomers } = useContext(CustomerContext);
  const [formData, setFormData] = useState({ ...customer });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (customer) setFormData({ ...customer });
  }, [customer]);

  if (!customer) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      status: formData.status,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_CUSTOMERS_URL}/${customer._id}`,
        payload,
        { withCredentials: true },
      );
      if (fetchCustomers) await fetchCustomers();
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
        <h2 className="text-xl font-bold mb-6 text-gray-900">Edit Profile</h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Full Name
            </label>
            <input
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Full Name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Phone
            </label>
            <input
              type="text"
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Phone number"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Address
            </label>
            <textarea
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              rows="2"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Address"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Status
            </label>
            <select
              className="w-full mt-1 p-3 bg-gray-50 rounded-xl outline-none cursor-pointer"
              value={formData.status || "active"}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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

export default EditCustomerModal;
