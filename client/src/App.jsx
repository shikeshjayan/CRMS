import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useContext, useMemo } from "react"; // Added useMemo for router stability
import { AuthContext } from "./context/AuthContext";

import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import { RootLayout } from "./layout/RootLayout";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import CustomerDashboard from "./pages/CustomerDashboard/CustomerDashboard";
import Customers from "./pages/Dashboard/Customers";
import Cases from "./pages/Dashboard/Cases";
import Reports from "./pages/Dashboard/Reports";
import Settings from "./pages/Dashboard/Settings";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CustomerDashboardLayout from "./layout/CustomerDashboardLayout";
import CreateCustomerForm from "./components/CreateCustomerForm";
import CreateCaseForm from "./components/CreateCaseForm";

const App = () => {
  const { user } = useContext(AuthContext);
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <RootLayout />,
          errorElement: <NotFound />,
          children: [
            {
              index: true,
              element: <Navigate to="/login" replace />,
            },
            {
              path: "login",
              element: <LoginPage />,
            },
            {
              path: "signup",
              element: <Signup />,
            },
          ],
        },
        {
          // IMPORTANT: Added "customer" to allowed roles here
          element: <ProtectedRoutes allowedRoles={["admin", "user"]} />,
          children: [
            {
              element: <DashboardLayout />,
              children: [
                {
                  path: "/dashboard",
                  element: <Dashboard />,
                },
                { path: "/customers", element: <Customers /> },
                { path: "/cases", element: <Cases /> },
                { path: "/reports", element: <Reports /> },
                { path: "/settings", element: <Settings /> },
              ],
            },
          ],
        },
        {
          element: <ProtectedRoutes allowedRoles={["customer"]} />,
          children: [
            {
              element: <CustomerDashboardLayout />,
              children: [
                {
                  path: "/customer/dashboard",
                  element: <CustomerDashboard />,
                },
                {
                  path: "/createCustomer",
                  element: <CreateCustomerForm />,
                },
                {
                  path: "/createCases",
                  element: <CreateCaseForm />,
                },
              ],
            },
          ],
        },
      ]),
    [user?.role],
  ); // Only re-run if role changes

  return <RouterProvider router={router} />;
};

export default App;
