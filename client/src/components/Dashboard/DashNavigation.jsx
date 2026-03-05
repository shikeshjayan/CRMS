import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "user", "customer"],
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15v-6h-6v6H3.75A.75.75 0 013 21V9.75z"
        />
      </svg>
    ),
  },
  {
    name: "Customers",
    path: "/customers",
    roles: ["admin", "user"],
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 10-8 0 4 4 0 008 0zm6 0a3 3 0 11-6 0 3 3 0 016 0zM3 17a3 3 0 116 0"
        />
      </svg>
    ),
  },
  {
    name: "Cases",
    path: "/cases",
    roles: ["admin", "user"],
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: "Reports",
    path: "/reports",
    roles: ["admin", "user"],
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.5l5-5 4 4 5-5.5M3 21h18M3 3v18"
        />
      </svg>
    ),
  },
  {
    name: "Settings",
    path: "/settings",
    roles: ["admin", "user"],
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

/**
 * Role-based responsive navigation
 * Desktop sidebar (collapsible) + Mobile bottom tabs
 */
const DashNavigation = () => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false,
  );

  // Auto-expand on mobile for better UX
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(false);
    }
  }, []);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Desktop: allow collapse state
        return;
      }
      setCollapsed(false); // Mobile: always expanded
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col bg-linear-to-b from-gray-900 to-gray-800/50 backdrop-blur-xl text-white min-h-screen transition-all duration-500 shadow-2xl border-r border-gray-700/50 z-40">
        {/* Header with logo + collapse toggle */}
        <div
          className={`flex items-center h-20 px-5 border-b border-gray-800/50 backdrop-blur-sm transition-all ${
            collapsed ? "justify-center" : "justify-between"
          }`}>
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight whitespace-nowrap">
                CRM Panel
              </span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all group"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              {collapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-white/20 hover:bg-white/10 ${
                  isActive
                    ? "bg-linear-to-r from-blue-500/90 to-purple-600/90 text-white shadow-lg hover:shadow-xl border-white/30 scale-[1.02]"
                    : "text-gray-300 hover:text-white hover:shadow-md"
                } ${collapsed ? "justify-center px-3" : ""}`
              }>
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl backdrop-blur-sm transition-all group-hover:scale-105">
                {item.icon}
              </div>
              {!collapsed && (
                <span className="whitespace-nowrap tracking-tight">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-linear-to-t from-gray-900 to-gray-800/80 backdrop-blur-xl border-t border-gray-700/50 shadow-2xl h-20 px-4 flex items-center justify-around safe-area-inset-bottom">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-200 ${
                isActive
                  ? "text-blue-400 scale-110 shadow-lg bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-2"
                  : "text-gray-400 hover:text-gray-200 hover:scale-105"
              }`
            }>
            <div className="w-7 h-7 flex items-center justify-center rounded-lg backdrop-blur-sm">
              {item.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default DashNavigation;
