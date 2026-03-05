import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const RootLayout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className={`flex-1 flex justify-center items-center ${
          theme === "dark"
            ? "bg-[#312F2C] text-[#FAFAFA]"
            : "bg-[#ECF0FF] text-[#312F2C]"
        }`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
