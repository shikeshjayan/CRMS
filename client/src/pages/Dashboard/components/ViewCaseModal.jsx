const ViewCaseModal = ({ isOpen, onClose, caseData }) => {
  if (!isOpen || !caseData) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Case Details</h2>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase">
            {caseData._id.slice(-6)}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</label>
            <p className="text-gray-900 font-medium">{caseData.customerId?.name || "N/A"}</p>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subject/Title</label>
            <p className="text-gray-900">{caseData.title}</p>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
            <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-xl">{caseData.description || "No description provided."}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</label>
              <p className="capitalize">{caseData.status}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority</label>
              <p className="capitalize font-semibold text-orange-600">{caseData.priority}</p>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="w-full mt-8 py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all">
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewCaseModal