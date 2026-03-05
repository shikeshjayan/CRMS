import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const LogoutBtn = ({ onClick }) => {
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40 group relative overflow-hidden ${
        dark
          ? "bg-gray-900/50 hover:bg-gray-800/70 text-gray-200"
          : "bg-white/70 hover:bg-gray-50 text-gray-800"
      }`}
      title="Logout"
      aria-label="Logout"
    >
      {/* SVG Icon - theme adaptive, no external images needed */}
      <svg
        className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>

      {/* Hover ripple effect */}
      <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-300 opacity-0 group-hover:opacity-100" />
    </button>
  );
};

export default LogoutBtn;
