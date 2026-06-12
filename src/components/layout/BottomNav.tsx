import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Search, PlusCircle, Bell, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { unreadCount, currentUser } = useApp();

  if (!currentUser) return null;

  const items = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/explore', icon: Search, label: t('nav.explore') },
    { path: '/create-project', icon: PlusCircle, label: t('nav.create'), isCreate: true },
    { path: '/notifications', icon: Bell, label: t('nav.notifications'), badge: unreadCount },
    { path: '/profile', icon: User, label: t('nav.profile') }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map(item => {
          const isActive = location.pathname === item.path;
          if (item.isCreate) {
            return (
              <Link key={item.path} to={item.path} className="flex flex-col items-center -mt-8">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg"><item.icon className="w-7 h-7 text-white" /></div>
              </Link>
            );
          }
          return (
            <Link key={item.path} to={item.path} className={`flex flex-col items-center justify-center flex-1 h-full relative ${isActive ? 'text-amber-600' : 'text-slate-500'}`}>
              <div className="relative">
                <item.icon className="w-6 h-6" />
                {item.badge && item.badge > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">{item.badge}</span>}
              </div>
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              {isActive && <div className="absolute bottom-0 w-8 h-0.5 bg-amber-500 rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
