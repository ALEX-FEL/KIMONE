import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard, Users, FolderKanban, ShieldCheck, CreditCard,
  Headphones, FileText, Settings, X, ChevronLeft, Home, HeartHandshake, Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminSidebarProps { isOpen: boolean; onClose: () => void; isCollapsed: boolean; onToggleCollapse: () => void; }

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { unreadSupport } = useApp();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { path: '/admin/users', icon: Users, label: t('admin.users') },
    { path: '/admin/donors', icon: HeartHandshake, label: 'Donateurs' },
    { path: '/admin/projects', icon: FolderKanban, label: t('admin.projects') },
    { path: '/admin/categories', icon: Tag, label: 'Categories' },
    { path: '/admin/kyc', icon: ShieldCheck, label: t('admin.kyc') },
    { path: '/admin/payments', icon: CreditCard, label: t('admin.payments') },
    { path: '/admin/support', icon: Headphones, label: 'Assistance', badge: unreadSupport },
    { path: '/admin/logs', icon: FileText, label: t('admin.logs') },
    { path: '/admin/settings', icon: Settings, label: t('nav.settings') }
  ];

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-950 z-50 transition-all ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">I</span>
              </div>
              <span className="text-xl font-bold text-white">INING</span>
            </Link>
          )}
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 md:hidden">
            <X className="w-5 h-5" />
          </button>
          <button onClick={onToggleCollapse} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hidden md:block">
            <ChevronLeft className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Home Button */}
        <div className="p-3 border-b border-slate-800">
          <Link to="/" onClick={onClose} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <Home className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Retour au site</span>}
          </Link>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {navItems.map(item => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} to={item.path} onClick={onClose} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative ${isActive ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-400 border-l-2 border-amber-500' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
                {!isCollapsed && item.badge && item.badge > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
                {isCollapsed && item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Version */}
        {!isCollapsed && (
          <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-600">
            <p>INING Admin v1.0.0</p>
          </div>
        )}
      </aside>
    </>
  );
};

export default AdminSidebar;
