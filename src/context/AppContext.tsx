import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Notification } from '../types';

interface AppContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  markAsRead: (id: string) => void;
  savedProjects: string[];
  toggleSaveProject: (projectId: string) => void;
  isProjectSaved: (projectId: string) => boolean;
  unreadSupport: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockUser: User = {
  id: 'user-1', email: 'jean.pierre@email.com', fullName: 'Jean-Pierre Nkolo',
  phone: '+237 6 99 12 34 56', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  role: 'admin', kycStatus: 'approved', isVerified: true, createdAt: '2024-01-15', referralCode: 'INK8X92P'
};

const mockNotifications: Notification[] = [
  { id: 'n1', userId: 'user-1', type: 'donation', title: 'New donation!', message: 'You received a donation of 25,000 FCFA.', isRead: false, createdAt: new Date().toISOString() },
  { id: 'n2', userId: 'user-1', type: 'update_posted', title: 'Project update', message: 'A new update was posted on your project.', isRead: true, createdAt: new Date().toISOString() }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentUser] = useState<User | null>(mockUser);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [savedProjects, setSavedProjects] = useState<string[]>(['project-1', 'project-3']);
  const [unreadSupport] = useState(3);

  const setLanguage = (lang: string) => i18n.changeLanguage(lang);
  const isAdmin = currentUser?.role === 'admin';
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const toggleSaveProject = (id: string) => setSavedProjects(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  const isProjectSaved = (id: string) => savedProjects.includes(id);

  return (
    <AppContext.Provider value={{
      currentUser, isAuthenticated: !!currentUser, isAdmin, language: i18n.language, setLanguage,
      notifications, unreadCount, markAllRead, markAsRead, savedProjects, toggleSaveProject, isProjectSaved, unreadSupport
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => { const ctx = useContext(AppContext); if (!ctx) throw new Error('useApp must be used within AppProvider'); return ctx; };
