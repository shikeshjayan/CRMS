import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const SignOutModal = ({ onConfirm, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const dark = theme === "dark";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-200">
      <div
        className={`rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/10 backdrop-blur-xl ${
          dark ? "bg-gray-900/95" : "bg-white/90"
        }`}>
        {/* Warning icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-2xl flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h3
          className={`text-2xl font-bold text-center mb-2 ${
            dark ? "text-white drop-shadow-lg" : "text-gray-900 drop-shadow-md"
          }`}>
          Sign Out?
        </h3>

        <p
          className={`text-sm text-center leading-relaxed mb-8 ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}>
          Are you sure you want to log out? You'll need to sign in again to
          access your data.
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-3.5 text-sm font-semibold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all backdrop-blur-sm border border-gray-200/50 ${
              dark
                ? "text-gray-200 bg-gray-800/50 hover:bg-gray-700/70"
                : "text-gray-700 bg-white hover:bg-gray-50"
            }`}>
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-xl hover:shadow-2xl hover:from-red-600 hover:to-red-700 active:scale-95 transition-all backdrop-blur-sm border border-red-500/30">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
