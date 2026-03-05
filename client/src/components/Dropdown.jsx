import { useNavigate } from "react-router-dom";

/**
 * ProfileDropdown Component
 * Renders a dropdown menu for profile actions and login/logout.
 *
 * @param {boolean} isOpen - Whether the dropdown is visible
 * @param {Function} onClose - Function to close the dropdown
 * @param {Object} user - Current user object (null if not logged in)
 */
const Dropdown = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Handle common navigation actions
  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  // Auth actions - login/logout
  const handleAuth = () => {
    if (user) {
      // TODO: Implement proper logout (clear tokens, call API, etc.)
      console.log("Logging out...");
      // Example: localStorage.removeItem('token'); onClose();
    } else {
      handleNav("/signin");
    }
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-48 rounded-xl shadow-xl py-3 bg-white/95 backdrop-blur-sm border border-gray-100 text-gray-900 z-50 font-medium">
      {user && (
        <>
          {/* Authenticated user menu items */}
          <div
            onClick={() => handleNav("/dashboard")}
            className="px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            My Space
          </div>
          
          <div
            onClick={() => handleNav("/dashboard/home")}
            className="px-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </div>
          
          <div className="border-t border-gray-200 my-2 mx-4"></div>
        </>
      )}

      {/* Login/Logout action */}
      <div
        onClick={handleAuth}
        className={`px-4 py-3 cursor-pointer font-semibold rounded-lg transition-all flex items-center gap-3 ${
          user
            ? "text-red-600 hover:bg-red-50 hover:text-red-700"
            : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        }`}
      >
        {user ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
