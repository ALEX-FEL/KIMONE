import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bell, Globe, ChevronDown, Menu, Headphones } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import NotificationModal from './NotificationModal';

interface HeaderProps { onMenuClick?: () => void; }

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { currentUser, language, setLanguage, unreadCount, isAdmin } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [showLang, setShowLang] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b h-16 flex items-center px-4 md:px-6 justify-between">
      <div className="flex items-center gap-3">
        {isAdminPage && <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-slate-100"><Menu className="w-5 h-5" /></button>}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"><span className="text-white font-bold text-sm">I</span></div>
          <span className="text-xl font-bold text-slate-800 hidden sm:block">INING</span>
        </Link>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={() => navigate('/help')} className="p-2 rounded-lg hover:bg-slate-100 transition-colors" title="Aide">
          <Headphones className="w-5 h-5 text-slate-600" />
        </button>

        <div className="relative">
          <button onClick={() => setShowLang(!showLang)} className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100">
            <Globe className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium hidden sm:inline">{language.toUpperCase()}</span>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>
          {showLang && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border py-1 z-50">
              <button onClick={() => { setLanguage('fr'); setShowLang(false); }} className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${language === 'fr' ? 'text-amber-600 font-medium' : ''}`}>Francais</button>
              <button onClick={() => { setLanguage('en'); setShowLang(false); }} className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${language === 'en' ? 'text-amber-600 font-medium' : ''}`}>English</button>
            </div>
          )}
        </div>

        {currentUser && (
          <div className="relative">
            <button onClick={() => setShowNotifications(true)} className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{unreadCount}</span>}
            </button>
            <NotificationModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
          </div>
        )}

        {currentUser ? <Link to="/profile"><Avatar src={currentUser.avatar} name={currentUser.fullName} size="sm" /></Link> : <Link to="/login"><Button>{t('auth.login')}</Button></Link>}
      </div>
    </header>
  );
};

export default Header;
