import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-800 dark:text-white">
      <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;