import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    customerPath: "/customer/dashboard",
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
    customerPath: "/createCustomer",
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
          d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4.13a4 4 0 10-8 0 4 4 0 008 0zm6 0a3 3 0 11-6 0 3 3 0 016 0zM3 17a3 3 0 116 0"
        />
      </svg>
    ),
  },
  {
    name: "Cases",
    path: "/cases",
    customerPath: "/createCases",
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
          d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: "Settings",
    path: "/settings",
    customerPath: "/settings",
    roles: ["admin", "user"], // ✅ removed "customer" — customers don't have settings
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

const DashNav = () => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const isCustomer = user?.role === "customer";

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role),
  );

  // ✅ Resolve correct path based on role
  const getPath = (item) => (isCustomer ? item.customerPath : item.path);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className={`hidden md:flex flex-col bg-gray-900 text-white min-h-screen transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}>
        <div
          className={`flex items-center h-16 px-4 border-b border-gray-800 ${collapsed ? "justify-center" : "justify-between"}`}>
          {!collapsed && (
            <span className="text-base font-bold tracking-tight whitespace-nowrap">
              Studio CRM
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24">
              {collapsed ? (
                <path d="M9 5l7 7-7 7" />
              ) : (
                <path d="M15 19l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1 overflow-hidden">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={getPath(item)}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`
              }>
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ── Mobile bottom tab bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 flex items-center justify-around px-2 h-16 safe-area-pb">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={getPath(item)}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                isActive ? "text-blue-400" : "text-gray-500 hover:text-gray-300"
              }`
            }>
            {item.icon}
            <span className="text-[9px] font-semibold uppercase tracking-wide">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default DashNav;
