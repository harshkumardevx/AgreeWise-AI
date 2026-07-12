import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import UploadContract from "@/pages/UploadContract";

import NotFound from "@/pages/NotFound";

import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Documents from "@/pages/Documents";
import Reports from "@/pages/Reports";
import ReportDetailsPage from "@/pages/ReportDetailPage";
import History from "@/pages/History";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/upload-contract"
          element={<UploadContract />}
        />

        <Route
          path="/documents"
          element={<Documents />}
        />

        <Route
  path="/reports"
  element={<Reports />}
/>

        <Route
  path="/reports/:reportId"
  element={<ReportDetailsPage />}
/>

<Route
  path="/history"
  element={<History />}
/>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;