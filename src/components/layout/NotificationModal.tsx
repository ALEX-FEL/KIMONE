import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Bell, CheckCheck, Gift, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatRelativeTime } from '../../i18n';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const { notifications, unreadCount, markAllRead, markAsRead } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'donation': return <Gift className="w-5 h-5 text-green-500" />;
      case 'project_approved': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'project_rejected': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'update_posted': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'campaign_ending': return <Clock className="w-5 h-5 text-amber-500" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleClick = (notification: typeof notifications[0]) => {
    markAsRead(notification.id);
    if (notification.projectId) {
      onClose();
      navigate(`/projects/${notification.projectId}`);
    } else {
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-16 right-4 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-scale-up">
        <div className="flex items-center justify-between p-4 border-b bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold text-slate-800">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5.5 bg-red-500 text-white text-xs rounded-full font-bold">{unreadCount}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                <CheckCheck className="w-4 h-4" />
                Tout marquer lu
              </button>
            )}
            <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Aucune notification</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map(notification => (
                <button
                  key={notification.id}
                  onClick={() => handleClick(notification)}
                  className={`w-full p-4 text-left hover:bg-slate-50 transition-colors ${!notification.isRead ? 'bg-amber-50/50' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-medium text-sm ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'}`}>{notification.title}</p>
                        {!notification.isRead && <span className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 mt-1.5" />}
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-slate-400 mt-1">{formatRelativeTime(notification.createdAt)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t bg-slate-50">
          <button onClick={() => { onClose(); navigate('/notifications'); }} className="w-full py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
            Voir toutes les notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
