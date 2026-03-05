import { useContext, useState, useEffect } from "react";
import { CasesContext } from "../../context/CasesContext";
import ViewCaseModal from "./components/ViewCaseModal";
import EditCaseModal from "./components/EditCaseModal";
import DeleteCaseModal from "./components/DeleteCaseModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import CreateCaseModal from "./components/CreateCaseModal";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const Cases = () => {
  const { cases = [], loading, fetchCases } = useContext(CasesContext);
  const [selectedCase, setSelectedCase] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // Theme-based Styles
  const isDark = theme === "dark";
  const bgMain = isDark
    ? "bg-[#1E1E1E] text-[#FAFAFA]"
    : "bg-[#ECF0FF] text-[#312F2C]";
  const bgCard = isDark
    ? "bg-[#2D2D2D] border-[#3D3D3D]"
    : "bg-white border-gray-100";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const tableHeader = isDark
    ? "bg-[#3D3D3D] text-gray-300"
    : "bg-gray-50/50 text-gray-600";
  const tableBorder = isDark ? "border-[#3D3D3D]" : "border-gray-100";
  const hoverRow = isDark ? "hover:bg-[#3D3D3D]/50" : "hover:bg-blue-50/30";

  useEffect(() => {
    if (selectedCase) {
      const updated = cases.find((c) => c._id === selectedCase._id);
      if (updated) setSelectedCase(updated);
    }
  }, [cases]);

  const openModal = (cas, type) => {
    setSelectedCase(cas);
    setModalType(type);
  };

  const closeModal = () => setModalType(null);

  const handleCreateSuccess = () => {
    if (fetchCases) fetchCases();
    setIsCreateModalOpen(false);
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
        status === "open"
          ? "bg-amber-100 text-amber-700"
          : status === "resolved"
            ? "bg-green-100 text-green-700"
            : isDark
              ? "bg-gray-700 text-gray-300"
              : "bg-gray-100 text-gray-600"
      }`}>
      {status}
    </span>
  );

  const PriorityLabel = ({ priority }) => (
    <span
      className={`text-xs font-bold capitalize ${
        priority === "urgent" ? "text-red-500" : textMuted
      }`}>
      {priority}
    </span>
  );

  const ActionButtons = ({ cas }) => (
    <div className="flex items-center gap-1">
      <button
        onClick={() => openModal(cas, "view")}
        className={`p-2 rounded-lg text-blue-500 transition-colors ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
        title="View Details">
        <FontAwesomeIcon icon={faEye} />
      </button>
      <button
        onClick={() => openModal(cas, "edit")}
        className={`p-2 rounded-lg text-amber-500 transition-colors ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
        title="Edit Case">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      {user?.role === "admin" && (
        <button
          onClick={() => openModal(cas, "delete")}
          className={`p-2 rounded-lg text-red-500 transition-colors ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
          title="Delete Case">
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
            Cases
          </h1>
          <p className={`text-xs md:text-sm mt-0.5 ${textMuted}`}>
            Manage and track photography studio issues
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95">
          + Add Case
        </button>
      </div>

      {loading ? (
        <div
          className={`${bgCard} rounded-2xl shadow-sm border p-20 text-center animate-pulse ${textMuted}`}>
          Loading studio cases...
        </div>
      ) : cases.length === 0 ? (
        <div
          className={`${bgCard} rounded-2xl shadow-sm border p-20 text-center ${textMuted}`}>
          No cases found in the records.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div
            className={`hidden md:block rounded-2xl shadow-sm border overflow-hidden ${bgCard} ${tableBorder}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead
                  className={`${tableHeader} text-[11px] uppercase tracking-widest font-bold border-b ${tableBorder}`}>
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${isDark ? "divide-[#3D3D3D]" : "divide-gray-50"}`}>
                  {cases.map((cas) => (
                    <tr
                      key={cas._id}
                      className={`${hoverRow} transition-colors`}>
                      <td className="p-4 text-xs font-mono uppercase text-blue-400">
                        {cas._id.slice(-6)}
                      </td>
                      <td className="p-4 font-semibold text-sm">
                        {cas.customerId?.name || "N/A"}
                      </td>
                      <td className="p-4 text-sm">{cas.title}</td>
                      <td className="p-4">
                        <StatusBadge status={cas.status} />
                      </td>
                      <td className="p-4">
                        <PriorityLabel priority={cas.priority} />
                      </td>
                      <td className="p-4 text-right">
                        <ActionButtons cas={cas} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {cases.map((cas) => (
              <div
                key={cas._id}
                className={`${bgCard} rounded-2xl border shadow-sm p-4`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="overflow-hidden pr-2">
                    <p className="text-sm font-bold truncate">
                      {cas.customerId?.name || "N/A"}
                    </p>
                    <p className="text-[10px] font-mono uppercase mt-0.5 text-blue-400">
                      #{cas._id.slice(-6)}
                    </p>
                  </div>
                  <StatusBadge status={cas.status} />
                </div>
                <p
                  className={`text-xs mb-3 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                  {cas.title}
                </p>
                <div
                  className={`flex items-center justify-between border-t pt-3 ${isDark ? "border-[#3D3D3D]" : "border-gray-50"}`}>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide ${textMuted}`}>
                      Priority:
                    </span>
                    <PriorityLabel priority={cas.priority} />
                  </div>
                  <ActionButtons cas={cas} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modals */}
      <CreateCaseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
      <ViewCaseModal
        isOpen={modalType === "view"}
        caseData={selectedCase}
        onClose={closeModal}
      />
      {modalType === "edit" && (
        <EditCaseModal
          isOpen={true}
          caseData={selectedCase}
          onClose={closeModal}
          onSuccess={fetchCases}
        />
      )}
      <DeleteCaseModal
        isOpen={modalType === "delete"}
        caseId={selectedCase?._id}
        caseTitle={selectedCase?.title}
        onClose={closeModal}
        onSuccess={fetchCases}
      />
    </div>
  );
};

export default Cases;
