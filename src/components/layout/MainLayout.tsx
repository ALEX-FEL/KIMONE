import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import AdminSidebar from './AdminSidebar';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-50">
      {isAdminPage ? (
        <div className="flex">
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div className={`flex-1 transition-all ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <main className="pt-16 min-h-screen"><Outlet /></main>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <main className="pt-16 pb-20 md:pb-8 min-h-screen"><Outlet /></main>
          <BottomNav />
        </>
      )}
    </div>
  );
};

export default MainLayout;
