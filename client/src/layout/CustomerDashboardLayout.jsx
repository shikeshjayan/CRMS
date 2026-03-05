import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import DashNav from "../pages/CustomerDashboard/DashNav";
import Footer from "../components/Footer";

const CustomerDashboardLayout = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`flex h-screen overflow-hidden ${isDark ? "bg-[#312F2C]" : "bg-[#ECF0FF]"}`}>
      <aside className="h-full shrink-0 border-r border-black/5 dark:border-white/5">
        <DashNav />
      </aside>

      <div className="flex-1 flex flex-col h-full relative">
        <main
          className={`flex-1 overflow-y-auto p-4 md:p-8 transition-colors duration-300 ${
            isDark ? "text-[#FAFAFA]" : "text-[#312F2C]"
          }`}>
          <div className="max-w-7xl mx-auto w-full pb-10">
            <Outlet />
          </div>
        </main>

        <footer className="shrink-0 border-t border-black/5 dark:border-white/5 bg-inherit">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;
