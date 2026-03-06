import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import RoomsPage from "./pages/public/RoomsPage";
import RoomDetailPage from "./pages/public/RoomDetailPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import MyReservationsPage from "./pages/user/MyReservationsPage";
import NewReservationPage from "./pages/user/NewReservationPage";
import ReservationDetailPage from "./pages/user/ReservationDetailPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ManageRoomsPage from "./pages/admin/ManageRoomsPage";
import ManageReservationsPage from "./pages/admin/ManageReservationsPage";
import AddRoomPage from "./pages/admin/AddRoomPage";
import EditRoomPage from "./pages/admin/EditRoomPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Portal Routes */}
        <Route path="/my-reservations" element={<MyReservationsPage />} />
        <Route path="/reservations/new" element={<NewReservationPage />} />
        <Route
          path="/my-reservations/:id"
          element={<ReservationDetailPage />}
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/rooms" element={<ManageRoomsPage />} />
        <Route path="/admin/rooms/new" element={<AddRoomPage />} />
        <Route path="/admin/rooms/:id/edit" element={<EditRoomPage />} />
        <Route
          path="/admin/reservations"
          element={<ManageReservationsPage />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
