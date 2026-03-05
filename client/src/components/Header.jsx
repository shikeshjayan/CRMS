import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const { theme, themeToggle } = useContext(ThemeContext);

  return (
    <header
      className={`shadow-sm fixed top-0 left-0 w-screen ${
        theme === "dark"
          ? "bg-[#312F2C] text-[#FAFAFA]"
          : "bg-[#ECF0FF] text-[#312F2C]"
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-sm md:text-lg font-semibold">
            Customer Relationship Management
          </h1>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={themeToggle}
          className="text-xl hover:scale-110 transition">
          <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
        </button>
      </div>
    </header>
  );
};

export default Header;
