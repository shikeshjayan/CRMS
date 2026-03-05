import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * ProtectedRoutes Component
 * Guards routes requiring authentication and specific roles
 *
 * @param {string[]} [allowedRoles] - Array of permitted roles (optional)
 */
const ProtectedRoutes = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Redirect unauthenticated users to login with return location
  if (!user) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Role-based access control
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Customer-specific redirect vs admin redirect
    const redirectPath = user.role === "customer" 
      ? "/customer/dashboard" 
      : "/dashboard";
    
    return <Navigate to={redirectPath} replace />;
  }

  // User is authenticated and authorized - render child routes
  return <Outlet />;
};

export default ProtectedRoutes;
