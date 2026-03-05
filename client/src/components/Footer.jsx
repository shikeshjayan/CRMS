import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  return (
    <footer
      className={`border-t px-6 py-4 mt-auto ${
        dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
      }`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-bold ${
              dark ? "text-white" : "text-gray-900"
            }`}>
            CRM
          </span>
          <span
            className={`text-[11px] ${
              dark ? "text-gray-500" : "text-gray-400"
            }`}>
            — Customer Relationship Management
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <span
            className={`text-[11px] ${
              dark ? "text-gray-600" : "text-gray-300"
            }`}>
            |
          </span>
          <span
            className={`text-[11px] ${
              dark ? "text-gray-500" : "text-gray-400"
            }`}>
            Privacy Policy
          </span>
          <span
            className={`text-[11px] ${
              dark ? "text-gray-600" : "text-gray-300"
            }`}>
            |
          </span>
          <span
            className={`text-[11px] ${
              dark ? "text-gray-500" : "text-gray-400"
            }`}>
            Terms of Use
          </span>
          <span
            className={`text-[11px] ${
              dark ? "text-gray-600" : "text-gray-300"
            }`}>
            |
          </span>
          <span
            className={`text-[11px] ${
              dark ? "text-gray-500" : "text-gray-400"
            }`}>
            Support
          </span>
        </div>

        {/* Copyright */}
        <p
          className={`text-[11px] ${dark ? "text-gray-600" : "text-gray-400"}`}>
          © {new Date().getFullYear()} CRM. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
