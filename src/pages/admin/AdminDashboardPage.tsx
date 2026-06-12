import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, FolderKanban, ShieldCheck, CreditCard, AlertTriangle, ArrowUpRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import { mockUsers, mockProjects, mockKycDocuments, mockDisputes, mockDonations } from '../../data/mockData';
import { formatCurrency } from '../../i18n';

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const pendingKyc = mockKycDocuments.filter(k => k.status === 'pending').length;
  const pendingProjects = mockProjects.filter(p => p.status === 'pending').length;
  const openDisputes = mockDisputes.filter(d => d.status === 'open').length;
  const totalRevenue = mockDonations.filter(d => d.paymentStatus === 'successful').reduce((s, d) => s + d.amount, 0);
  const stats = [
    { label: 'Total Users', value: mockUsers.length.toString(), icon: Users, color: 'bg-blue-500' },
    { label: 'Active Projects', value: mockProjects.filter(p => p.status === 'active').length.toString(), icon: FolderKanban, color: 'bg-amber-500' },
    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: CreditCard, color: 'bg-green-500' },
    { label: 'Pending KYC', value: pendingKyc.toString(), icon: ShieldCheck, color: 'bg-purple-500' },
    { label: 'Pending Projects', value: pendingProjects.toString(), icon: FolderKanban, color: 'bg-yellow-500' },
    { label: 'Open Disputes', value: openDisputes.toString(), icon: AlertTriangle, color: 'bg-red-500' }
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8"><h1 className="text-2xl font-bold text-white">{t('admin.dashboard')}</h1><p className="text-slate-400">{t('admin.overview.title')}</p></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">{stats.map((s, i) => <Card key={i} className="bg-slate-800 border-slate-700"><div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}><s.icon className="w-5 h-5 text-white" /></div><p className="text-2xl font-bold text-white">{s.value}</p><p className="text-sm text-slate-400">{s.label}</p></Card>)}</div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white">Revenue Overview</h3><span className="flex items-center gap-1 text-green-400 text-sm"><ArrowUpRight className="w-4 h-4" />+15%</span></div>
          <div className="h-32 flex items-end gap-2">{[40, 65, 45, 80, 55].map((h, i) => <div key={i} className="flex-1 bg-gradient-to-t from-amber-500 to-orange-500 rounded-t" style={{ height: `${h}%` }} />)}</div>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">{[{ type: 'user', msg: 'New user registration', time: '2m' }, { type: 'payment', msg: 'Payment received: 50K FCFA', time: '5m' }, { type: 'project', msg: 'Project submitted for review', time: '15m' }].map((a, i) => <div key={i} className="flex gap-3"><div className={`w-2 h-2 rounded-full mt-2 ${a.type === 'payment' ? 'bg-green-500' : a.type === 'project' ? 'bg-amber-500' : 'bg-blue-500'}`} /><div><p className="text-sm text-white">{a.msg}</p><p className="text-xs text-slate-500">{a.time} ago</p></div></div>)}</div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
