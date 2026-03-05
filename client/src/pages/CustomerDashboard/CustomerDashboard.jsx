import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../../components/LogoutBtn";
import SignOutModal from "../../components/SignOutModal";
import { AuthContext } from "../../context/AuthContext";
import { CustomerContext } from "../../context/CustomerContext";
import { CasesContext } from "../../context/CasesContext";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import EditCustomerModal from "../Dashboard/components/EditCustomerModal";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const { customers } = useContext(CustomerContext);
  const { cases } = useContext(CasesContext);
  const { theme, themeToggle } = useContext(ThemeContext);

  const dark = theme === "dark";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const profileData = useMemo(() => {
    if (Array.isArray(userData)) {
      return (
        userData.find((u) => u._id === user?._id || u.email === user?.email) ||
        user
      );
    }
    return userData || user;
  }, [userData, user]);

  const loggedCustomer = useMemo(() => {
    if (!customers?.length || !profileData) return null;
    return customers.find(
      (c) =>
        String(c.userId) === String(profileData._id) ||
        c.email === profileData.email,
    );
  }, [customers, profileData]);

  const myCases = useMemo(() => {
    if (!loggedCustomer || !cases?.length) return [];
    return cases.filter(
      (item) => String(item.customerId) === String(loggedCustomer._id),
    );
  }, [cases, loggedCustomer]);

  const username = profileData?.username || profileData?.name || "User";
  const initials = username[0]?.toUpperCase() || "U";

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-3 md:p-6 ${dark ? "bg-gray-950" : "bg-gray-50"}`}>
      {isModalOpen && (
        <SignOutModal
          isOpen={isModalOpen}
          onConfirm={handleLogoutConfirm}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditCustomerModal
          customer={loggedCustomer || profileData}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      <nav
        className={`flex justify-end items-center px-4 md:px-6 py-3 rounded-2xl shadow-sm mb-6 border ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
        <div className="flex items-center gap-2 md:gap-3">
          <div>
            <button
              onClick={themeToggle}
              className="text-xl hover:scale-110 transition">
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
            </button>
          </div>
          <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 rounded-full flex justify-center items-center text-white shadow-sm shrink-0">
            <span className="text-xs md:text-sm font-bold">{initials}</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <p
              className={`text-xs md:text-sm font-semibold leading-none ${dark ? "text-white" : "text-gray-900"}`}>
              {username}
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
              {profileData?.role || user?.role}
            </p>
          </div>
          <div
            className={`w-px h-6 mx-1 ${dark ? "bg-gray-700" : "bg-gray-100"}`}
          />
          <LogoutBtn onClick={() => setIsModalOpen(true)} />
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div
            className={`rounded-3xl p-6 shadow-sm border sticky top-6 ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="flex justify-between items-start mb-6">
              <h3
                className={`font-bold text-lg ${dark ? "text-white" : "text-gray-800"}`}>
                My Profile
              </h3>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-xs font-bold text-blue-500 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors">
                Edit Details
              </button>
            </div>

            {profileData ? (
              <div className="space-y-4">
                <div
                  className={`pb-4 border-b ${dark ? "border-gray-800" : "border-gray-50"}`}>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
                    Account Type
                  </p>
                  <p
                    className={`text-sm font-semibold capitalize ${dark ? "text-gray-100" : "text-gray-900"}`}>
                    {profileData.role}
                  </p>
                </div>
                <div
                  className={`pb-4 border-b ${dark ? "border-gray-800" : "border-gray-50"}`}>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
                    Full Name
                  </p>
                  <p
                    className={`text-sm font-semibold ${dark ? "text-gray-100" : "text-gray-900"}`}>
                    {profileData.name || profileData.username}
                  </p>
                </div>
                <div
                  className={`pb-4 border-b ${dark ? "border-gray-800" : "border-gray-50"}`}>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
                    Email Address
                  </p>
                  <p
                    className={`text-sm font-semibold ${dark ? "text-gray-100" : "text-gray-900"}`}>
                    {profileData.email}
                  </p>
                </div>
                {profileData.phone && (
                  <div
                    className={`pb-4 border-b ${dark ? "border-gray-800" : "border-gray-50"}`}>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
                      Phone
                    </p>
                    <p
                      className={`text-sm font-semibold ${dark ? "text-gray-100" : "text-gray-900"}`}>
                      {profileData.phone}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
                    Member Since
                  </p>
                  <p
                    className={`text-sm font-semibold ${dark ? "text-gray-100" : "text-gray-900"}`}>
                    {profileData.createdAt
                      ? new Date(profileData.createdAt).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "long", year: "numeric" },
                        )
                      : "Recently"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Loading...</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div
            className={`rounded-3xl p-6 shadow-sm border ${dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`font-bold text-lg ${dark ? "text-white" : "text-gray-800"}`}>
                My Active Cases
              </h3>
              <span className="bg-blue-500/10 text-blue-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                {myCases.length} Total
              </span>
            </div>

            <div className="space-y-4">
              {myCases.length > 0 ? (
                myCases.map((cas) => (
                  <div
                    key={cas._id}
                    className={`group border border-transparent p-4 rounded-2xl transition-all cursor-pointer ${
                      dark
                        ? "bg-gray-800 hover:bg-gray-700 hover:border-gray-600"
                        : "bg-gray-50 hover:bg-white hover:shadow-md hover:border-gray-100"
                    }`}
                    onClick={() => navigate("/cases")}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              cas.priority === "high"
                                ? "bg-red-500"
                                : "bg-amber-500"
                            }`}
                          />
                          <h4
                            className={`text-sm font-bold ${dark ? "text-white" : "text-gray-900"}`}>
                            {cas.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-400 line-clamp-1 mb-2">
                          {cas.description}
                        </p>
                        <p className="text-[9px] text-gray-500 uppercase font-mono tracking-tighter">
                          ID: #{cas._id.slice(-8)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`text-[9px] font-black px-2.5 py-1 rounded-lg shadow-sm border text-gray-500 uppercase ${dark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-100"}`}>
                          {cas.status}
                        </span>
                        <p className="text-[10px] text-gray-400">
                          {new Date(cas.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${dark ? "bg-gray-800" : "bg-gray-50"}`}>
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 italic">
                    No cases registered yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
