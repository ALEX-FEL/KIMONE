import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Tabs from '../../components/ui/Tabs';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockDisputes } from '../../data/mockData';
import { formatCurrency } from '../../i18n';

const AdminDisputesPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('open');
  const tabs = [{ id: 'open', label: 'Open', icon: AlertTriangle, count: mockDisputes.filter(d => d.status === 'open').length }, { id: 'in_progress', label: 'In Progress', icon: Clock }, { id: 'resolved', label: 'Resolved', icon: CheckCircle }];
  const filtered = mockDisputes.filter(d => d.status === activeTab);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold text-white">{t('admin.disputes.title')}</h1><p className="text-slate-400">Manage disputes</p></div>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-6" />
      <div className="space-y-4">{filtered.length > 0 ? filtered.map(d => <Card key={d.id} className="bg-slate-800 border-slate-700">
        <div className="flex items-start gap-4"><Avatar src={d.user.avatar} name={d.user.fullName} size="md" /><div className="flex-1"><div className="flex justify-between mb-2"><div><p className="font-medium text-white">{d.user.fullName}</p><p className="text-sm text-slate-400">{d.user.email}</p></div><Badge variant={d.status === 'open' ? 'danger' : d.status === 'in_progress' ? 'warning' : 'success'}>{d.status}</Badge></div><div className="bg-slate-700/50 rounded-xl p-3 mb-3"><p className="text-sm font-medium text-white">Reason: {d.reason}</p><p className="text-sm text-slate-400">{d.description}</p></div><div className="flex items-center gap-4 text-sm text-slate-400 mb-3"><span>Donation: {formatCurrency(d.donation.amount)}</span></div>{activeTab !== 'resolved' && <div className="flex gap-2"><Button variant="outline" size="sm">Contact</Button><Button size="sm" icon={CheckCircle}>Resolve</Button></div>}</div></div>
      </Card>) : <div className="text-center py-12"><AlertTriangle className="w-12 h-12 mx-auto text-slate-600" /><p className="text-slate-400">No disputes found</p></div>}</div>
    </div>
  );
};

export default AdminDisputesPage;
