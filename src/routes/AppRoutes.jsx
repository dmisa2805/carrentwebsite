import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
// import Category from "../pages/Category";
// import Details from "../pages/Details";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import Checkout from "../pages/Payment";
// import Favorites from "../pages/Favorites";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/category" element={<Category />} />
        <Route path="/car/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />        
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;