import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../../components/LogoutBtn";
import SignOutModal from "../../components/SignOutModal";
import { AuthContext } from "../../context/AuthContext";
import { CustomerContext } from "../../context/CustomerContext";
import { CasesContext } from "../../context/CasesContext";
import { ThemeContext } from "../../context/ThemeContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { customers = [] } = useContext(CustomerContext);
  const { cases = [] } = useContext(CasesContext);
  const { theme } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const isDark = theme === "dark";

  // --- Theme Styles ---
  const bgMain = isDark
    ? "bg-[#1E1E1E] text-[#FAFAFA]"
    : "bg-[#ECF0FF] text-[#312F2C]";
  const bgCard = isDark
    ? "bg-[#2D2D2D] border-[#3D3D3D]"
    : "bg-white border-gray-100";
  const bgNav = isDark
    ? "bg-[#2D2D2D] border-[#3D3D3D]"
    : "bg-white border-gray-100";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const bgItem = isDark ? "hover:bg-[#3D3D3D]" : "hover:bg-gray-100";

  const username = user?.username || "User";
  const initials = username[0].toUpperCase();

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const openCases = cases.filter((item) => item.status === "open");
  const highPriorityCases = cases.filter(
    (item) => item.priority === "high" || item.priority === "urgent",
  );
  const mediumPriorityCases = cases.filter(
    (item) => item.priority === "medium",
  );

  // FIXED: Store the full hover class so Tailwind picks it up
  const stats = [
    {
      label: "Customers",
      value: customers.length,
      hoverColor: "group-hover:text-blue-500",
    },
    {
      label: "Open Cases",
      value: openCases.length,
      hoverColor: "group-hover:text-amber-500",
    },
    {
      label: "High Priority",
      value: highPriorityCases.length,
      hoverColor: "group-hover:text-red-500",
    },
    {
      label: "Medium Priority",
      value: mediumPriorityCases.length,
      hoverColor: "group-hover:text-purple-500",
    },
  ];

  const recentCasesList = [...cases]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const recentCustomersList = [...customers]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const activities = [
    ...recentCustomersList.map((c) => ({
      type: "customer",
      name: c.name,
      time: c.createdAt,
      id: c._id,
    })),
    ...recentCasesList.map((ca) => ({
      type: "case",
      name: ca.title,
      time: ca.createdAt,
      id: ca._id,
    })),
  ]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 6);

  return (
    <div
      className={`min-h-screen p-3 md:p-6 transition-colors duration-300 ${bgMain}`}>
      {isModalOpen && (
        <SignOutModal
          isOpen={isModalOpen}
          onConfirm={handleLogoutConfirm}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Top Header */}
      <nav
        className={`flex justify-end items-center px-4 md:px-6 py-3 rounded-2xl shadow-sm mb-6 border transition-colors ${bgNav}`}>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 rounded-full flex justify-center items-center text-white shadow-sm shrink-0">
            <span className="text-xs md:text-sm font-bold">{initials}</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-xs md:text-sm font-semibold">{username}</p>
            <p
              className={`text-[10px] uppercase tracking-wider font-bold ${textMuted}`}>
              {user?.role}
            </p>
          </div>
          <div
            className={`w-px h-6 mx-1 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
          />
          <LogoutBtn onClick={() => setIsModalOpen(true)} />
        </div>
      </nav>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            // NAVIGATE: Each card goes to its relevant section
            onClick={() =>
              navigate(
                item.label.includes("Customer") ? "/customers" : "/cases",
              )
            }
            className={`${bgCard} p-4 md:p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all group cursor-pointer`}>
            <p className="text-[9px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              {item.label}
            </p>
            <p
              className={`text-xl md:text-3xl font-bold transition-colors ${isDark ? "text-white" : "text-gray-900"} ${item.hoverColor}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Cases */}
        <div
          className={`${bgCard} rounded-2xl shadow-sm border p-5 md:p-6 flex flex-col`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm md:text-base">Recent Cases</h3>
            <button
              onClick={() => navigate("/cases")}
              className="text-[10px] md:text-xs text-blue-500 font-semibold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentCasesList.map((cas) => (
              <div
                key={cas._id}
                // NAVIGATE: Navigate to specific case detail (adjust route if needed)
                onClick={() => navigate(`/cases/${cas._id}`)}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer ${isDark ? "bg-[#3D3D3D]/30" : "bg-gray-50"} ${bgItem}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${cas.priority === "high" || cas.priority === "urgent" ? "bg-red-500" : "bg-amber-500"}`}
                  />
                  <div className="truncate">
                    <p className="text-xs md:text-sm font-semibold truncate">
                      {cas.title}
                    </p>
                    <p
                      className={`text-[9px] md:text-[10px] uppercase font-mono ${textMuted}`}>
                      #{cas._id.slice(-6)}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[8px] md:text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase shrink-0 ml-2 ${isDark ? "bg-[#2D2D2D] text-gray-300" : "bg-white text-gray-500"}`}>
                  {cas.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className={`${bgCard} rounded-2xl shadow-sm border p-5 md:p-6`}>
          <h3 className="font-bold mb-4 text-sm md:text-base">Activity Feed</h3>
          <div className="space-y-4">
            {activities.map((act, i) => (
              <div
                key={i}
                className="flex gap-3 md:gap-4 items-start cursor-pointer group"
                // NAVIGATE: Activity items navigate to their respective pages
                onClick={() =>
                  navigate(
                    act.type === "customer" ? `/customers` : `/cases/${act.id}`,
                  )
                }>
                <div
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${act.type === "customer" ? "bg-blue-400" : "bg-purple-400"}`}
                />
                <div className="overflow-hidden">
                  <p className="text-xs md:text-sm leading-tight">
                    <span
                      className={`font-bold ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                      {act.type === "customer" ? "New Customer:" : "New Case:"}
                    </span>{" "}
                    <span
                      className={`${isDark ? "text-gray-300" : "text-gray-600"} group-hover:text-blue-500 transition-colors`}>
                      {act.name}
                    </span>
                  </p>
                  <p
                    className={`text-[9px] md:text-[10px] mt-0.5 ${textMuted}`}>
                    {new Date(act.time).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
