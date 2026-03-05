import { Outlet } from "react-router-dom";
import DashNavigation from "../components/Dashboard/DashNavigation";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`flex h-screen overflow-hidden ${isDark ? "bg-[#312F2C]" : "bg-[#ECF0FF]"}`}>
      <aside className="h-full shrink-0 border-r border-black/5 dark:border-white/5">
        <DashNavigation />
      </aside>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <main
          className={`flex-1 p-4 md:p-8 transition-colors duration-300 ${
            isDark ? "text-[#FAFAFA]" : "text-[#312F2C]"
          }`}>
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
