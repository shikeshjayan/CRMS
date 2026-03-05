import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { theme, themeToggle } = useContext(ThemeContext);

  return (
    <header className="shadow-lg fixed top-0 left-0 w-screen z-50 backdrop-blur-xl transition-all duration-300 border-b border-white/20 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 group cursor-pointer transition-all hover:scale-[1.02]">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-xl transition-all group-hover:shadow-2xl ${
              theme === "dark"
                ? "bg-linear-to-br from-blue-500/20 to-purple-500/20 text-blue-400"
                : "bg-linear-to-br from-blue-600/20 to-purple-600/20 text-blue-600"
            }`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1
              className={`font-bold tracking-tight transition-colors ${
                theme === "dark"
                  ? "text-white drop-shadow-lg"
                  : "text-gray-900/95 drop-shadow-md"
              }`}>
              CRM Pro
            </h1>
            <span
              className={`text-xs font-medium opacity-75 ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}>
              Customer Relationship Management
            </span>
          </div>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4">
          {/* Profile Dropdown Trigger (placeholder for future) */}
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 shadow-lg ring-2 ring-white/30 hover:ring-white/50 transition-all cursor-pointer flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={themeToggle}
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              className={`transition-transform duration-300 ${
                theme === "dark"
                  ? "text-yellow-400 drop-shadow-lg"
                  : "text-gray-700 drop-shadow-md"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
