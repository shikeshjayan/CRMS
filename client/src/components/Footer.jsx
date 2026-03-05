import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  return (
    <footer className={`border-t px-6 py-8 mt-auto transition-colors ${
      dark 
        ? "bg-gray-900/95 backdrop-blur-sm border-gray-800/50" 
        : "bg-white/80 backdrop-blur-sm border-gray-100/50"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Brand and tagline */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-gray-100/50 dark:border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${
              dark 
                ? "bg-linear-to-br from-blue-500/20 to-purple-500/20 text-blue-400" 
                : "bg-linear-to-br from-blue-600/10 to-purple-600/10 text-blue-600"
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className={`text-lg font-bold tracking-tight ${
                dark ? "text-white" : "text-gray-900"
              }`}>
                CRM
              </span>
              <span className={`text-xs font-medium ml-2 opacity-75 ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}>
                Customer Relationship Management
              </span>
            </div>
          </div>

          {/* Copyright */}
          <p className={`text-xs font-medium opacity-75 ${
            dark ? "text-gray-500" : "text-gray-500"
          }`}>
            © {new Date().getFullYear()} CRM. All rights reserved.
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
          <span className={`text-xs font-medium opacity-60 ${
            dark ? "text-gray-500" : "text-gray-400"
          }`}>
            |
          </span>
          
          {[
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Use", href: "#" },
            { label: "Support", href: "#" }
          ].map((item, index) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <a
                href={item.href}
                className={`text-xs font-medium hover:text-blue-500 transition-colors ${
                  dark ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </a>
              {index < 2 && (
                <span className={`text-xs opacity-50 ${
                  dark ? "text-gray-600" : "text-gray-400"
                }`}>
                  |
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
