import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import CustomerProvider from "./context/CustomerContext.jsx";
import CasesProvider from "./context/CasesContext.jsx";
import UserProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CustomerProvider>
          <CasesProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </CasesProvider>
        </CustomerProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
