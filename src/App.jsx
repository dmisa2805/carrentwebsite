import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoriteProvider } from "./context/FavoritesContext";
import AppRoutes from "./routes/AppRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import Payment from "./pages/Payment";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FavoriteProvider>
          <Router>
            <Routes>
              {/* Các routes bình thường */}
              <Route path="/*" element={<AppRoutes />} />

              {/* Các routes yêu cầu đăng nhập */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </FavoriteProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;