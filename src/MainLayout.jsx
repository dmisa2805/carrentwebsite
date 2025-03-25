import React from "react";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import Footer from "./components/Footer";

const MainLayout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div data-theme={theme} className="min-h-screen w-full bg-[#F6F7F9] dark:bg-gray-900">
      <Header />
        <main className="w-full py-4 px-16">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;