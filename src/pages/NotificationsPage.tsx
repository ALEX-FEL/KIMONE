import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Gift, CheckCircle, AlertTriangle, Mail } from 'lucide-react';
import Card from '../components/ui/Card';
import { mockNotifications } from '../data/mockData';
import { formatRelativeTime } from '../i18n';
import { useApp } from '../context/AppContext';

const NotificationsPage: React.FC = () => {
  const { t } = useTranslation();
  const { notifications, unreadCount } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'donation': return Gift;
      case 'project_approved': return CheckCircle;
      case 'project_rejected': return AlertTriangle;
      default: return Mail;
    }
  };
  const getColor = (type: string) => {
    switch (type) {
      case 'donation': return 'text-green-500 bg-green-100';
      case 'project_approved': return 'text-amber-500 bg-amber-100';
      case 'project_rejected': return 'text-red-500 bg-red-100';
      default: return 'text-blue-500 bg-blue-100';
    }
  };

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-slate-800">{t('notification.title')}</h1>{unreadCount > 0 && <p className="text-slate-500">{unreadCount} unread</p>}</div>
          <button className="text-amber-600 text-sm font-medium">{t('notification.markAllRead')}</button>
        </div>
        <div className="space-y-3">{notifications.map(n => {
          const Icon = getIcon(n.type);
          return (
            <Card key={n.id} className={`transition-all ${!n.isRead ? 'border-amber-200 bg-amber-50/50' : ''}`} hover>
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColor(n.type)}`}><Icon className="w-5 h-5" /></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between"><h3 className="font-semibold">{n.title}</h3><span className="text-xs text-slate-500">{formatRelativeTime(n.createdAt)}</span></div>
                  <p className="text-sm text-slate-600 mt-1">{n.message}</p>
                </div>
              </div>
            </Card>
          );
        })}</div>
      </div>
    </div>
  );
};

export default NotificationsPage;
