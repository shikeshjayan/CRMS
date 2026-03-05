import { useContext, useState } from "react";
import axios from "axios";
import CustomerCard from "./components/CustomerCard";
import EditCustomerModal from "./components/EditCustomerModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import { CustomerContext } from "../../context/CustomerContext";
import CreateCustomerModal from "./components/CreateCustomerModal";
import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Customers = () => {
  const {
    customers = [],
    setCustomers,
    loading,
    fetchCustomers,
  } = useContext(CustomerContext);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deletingCustomer, setDeletingCustomer] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const isDark = theme === "dark";

  // --- Theme Helpers ---
  const bgMain = isDark
    ? "bg-[#1E1E1E] text-[#FAFAFA]"
    : "bg-[#ECF0FF] text-[#312F2C]";
  const bgCard = isDark
    ? "bg-[#2D2D2D] border-[#3D3D3D]"
    : "bg-white border-gray-100";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const tableHeader = isDark
    ? "bg-[#3D3D3D] text-gray-300"
    : "bg-gray-50 text-gray-400";

  const handleDeleteRequest = (cust) => setDeletingCustomer(cust);

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_CUSTOMERS_URL}/${deletingCustomer._id}`,
        { withCredentials: true },
      );
      setCustomers((prev) =>
        prev.filter((c) => c._id !== deletingCustomer._id),
      );
      setDeletingCustomer(null);
    } catch (err) {
      console.error("Failed to delete customer", err);
    }
  };

  const handleUpdateSuccess = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((c) => (c._id === updatedCustomer._id ? updatedCustomer : c)),
    );
    setEditingCustomer(null);
  };

  const handleCreateSuccess = () => {
    if (fetchCustomers) fetchCustomers();
    setIsCreateModalOpen(false);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const StatusBadge = ({ status }) => (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
        status?.toLowerCase() === "active"
          ? "bg-green-500/20 text-green-500"
          : "bg-red-500/20 text-red-500"
      }`}>
      {status || "Unknown"}
    </span>
  );

  const ActionButtons = ({ cust }) => (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setSelectedCustomer(cust)}
        className={`p-1.5 rounded-lg text-blue-500 transition-colors ${isDark ? "hover:bg-blue-500/10" : "hover:bg-blue-50"}`}
        title="View">
        <FontAwesomeIcon icon={faEye} />
      </button>
      <button
        onClick={() => setEditingCustomer(cust)}
        className={`p-1.5 rounded-lg text-amber-500 transition-colors ${isDark ? "hover:bg-amber-500/10" : "hover:bg-amber-50"}`}
        title="Edit">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      {user?.role === "admin" && (
        <button
          onClick={() => handleDeleteRequest(cust)}
          className={`p-1.5 rounded-lg text-red-500 transition-colors ${isDark ? "hover:bg-red-500/10" : "hover:bg-red-50"}`}
          title="Delete">
          <FontAwesomeIcon icon={faDeleteLeft} />
        </button>
      )}
    </div>
  );

  return (
    <div
      className={`p-4 md:p-6 min-h-screen pb-20 md:pb-6 transition-colors duration-300 ${bgMain}`}>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            Customers
          </h1>
          <p className={`text-xs md:text-sm mt-0.5 ${textMuted}`}>
            Manage all customer records
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95">
          + Add Customer
        </button>
      </div>

      {loading ? (
        <div
          className={`${bgCard} rounded-2xl shadow-sm border p-20 text-center animate-pulse ${textMuted}`}>
          Loading customers...
        </div>
      ) : customers.length === 0 ? (
        <div
          className={`${bgCard} rounded-2xl shadow-sm border p-20 text-center ${textMuted}`}>
          No customers found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div
            className={`${bgCard} hidden md:block rounded-2xl shadow-sm border overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead
                  className={`${tableHeader} border-b text-[11px] uppercase tracking-widest font-bold ${isDark ? "border-[#3D3D3D]" : "border-gray-100"}`}>
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${isDark ? "divide-[#3D3D3D]" : "divide-gray-50"}`}>
                  {customers.map((cust) => (
                    <tr
                      key={cust._id}
                      className={`${isDark ? "hover:bg-[#3D3D3D]/50" : "hover:bg-gray-50/50"} transition-colors`}>
                      <td className="p-4 text-sm font-semibold">
                        {cust.name || "N/A"}
                      </td>
                      <td className={`p-4 text-sm ${textMuted}`}>
                        {cust.email || "N/A"}
                      </td>
                      <td className={`p-4 text-sm ${textMuted}`}>
                        {cust.phone ?? "-"}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={cust.status} />
                      </td>
                      <td className={`p-4 text-sm ${textMuted}`}>
                        {cust.createdAt ? formatDate(cust.createdAt) : "N/A"}
                      </td>
                      <td className="p-4 text-right">
                        <ActionButtons cust={cust} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {customers.map((cust) => (
              <div
                key={cust._id}
                className={`${bgCard} rounded-2xl border shadow-sm p-4`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-bold">{cust.name || "N/A"}</p>
                    <p className={`text-xs mt-0.5 font-mono ${textMuted}`}>
                      {cust.createdAt ? formatDate(cust.createdAt) : "N/A"}
                    </p>
                  </div>
                  <StatusBadge status={cust.status} />
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`font-semibold uppercase tracking-wide w-10 ${textMuted}`}>
                      Email
                    </span>
                    <span className="truncate">{cust.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`font-semibold uppercase tracking-wide w-10 ${textMuted}`}>
                      Phone
                    </span>
                    <span>{cust.phone ?? "-"}</span>
                  </div>
                </div>
                <div
                  className={`border-t pt-3 flex justify-end ${isDark ? "border-[#3D3D3D]" : "border-gray-100"}`}>
                  <ActionButtons cust={cust} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modals */}
      <CreateCustomerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
      {selectedCustomer && (
        <CustomerCard
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
      {editingCustomer && (
        <EditCustomerModal
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
          onSuccess={handleUpdateSuccess}
        />
      )}
      <DeleteConfirmModal
        isOpen={!!deletingCustomer}
        customerName={deletingCustomer?.name}
        onClose={() => setDeletingCustomer(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Customers;
