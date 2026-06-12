import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CreateProjectPage from './pages/CreateProjectPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import UserDashboardPage from './pages/UserDashboardPage';
import CreatorDashboardPage from './pages/CreatorDashboardPage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import OtpPage from './pages/auth/OtpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminDonorsPage from './pages/admin/AdminDonorsPage';
import AdminKycPage from './pages/admin/AdminKycPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import AdminSupportPage from './pages/admin/AdminSupportPage';
import AdminLogsPage from './pages/admin/AdminLogsPage';
import AuthGuard from './components/auth/AuthGuard';

import './i18n';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/create-project" element={<AuthGuard><CreateProjectPage /></AuthGuard>} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/dashboard/creator" element={<CreatorDashboardPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/projects" element={<AdminProjectsPage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/donors" element={<AdminDonorsPage />} />
            <Route path="/admin/kyc" element={<AdminKycPage />} />
            <Route path="/admin/payments" element={<AdminPaymentsPage />} />
            <Route path="/admin/support" element={<AdminSupportPage />} />
            <Route path="/admin/logs" element={<AdminLogsPage />} />
          </Route>

          {/* Auth Routes (no layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
