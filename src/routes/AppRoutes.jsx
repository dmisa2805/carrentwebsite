import {  Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Category from "../pages/Category";
import Details from "../pages/Details";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "/src/MainLayout";
import Payment from "../pages/Payment";
import Favorites from "../pages/Favorites";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <MainLayout>
     
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/car/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<ProtectedRoute><Payment /></ProtectedRoute>}/>
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>}/>
        </Routes>
  
    </MainLayout>
  );
};

export default AppRoutes;