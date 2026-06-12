import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Eye, Check, X } from 'lucide-react';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import Badge from '../../components/ui/Badge';
import Progress from '../../components/ui/Progress';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockProjects } from '../../data/mockData';
import { formatCurrency } from '../../i18n';

const AdminProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const tabs = [{ id: 'all', label: 'All' }, { id: 'pending', label: 'Pending', count: mockProjects.filter(p => p.status === 'pending').length }, { id: 'active', label: 'Active' }, { id: 'rejected', label: 'Rejected' }];
  const filtered = mockProjects.filter(p => activeTab === 'all' || p.status === activeTab).filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold text-white">{t('admin.projects.title')}</h1><p className="text-slate-400">Review and moderate</p></div>
      <div className="flex flex-col md:flex-row gap-4 mb-6"><Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" /><Input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} icon={Search} className="max-w-xs" /></div>
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50"><tr><th className="text-left px-4 py-3 text-sm text-slate-300">Project</th><th className="text-left px-4 py-3 text-sm text-slate-300">Progress</th><th className="text-left px-4 py-3 text-sm text-slate-300">Status</th><th className="text-right px-4 py-3 text-sm text-slate-300">Actions</th></tr></thead>
          <tbody>{filtered.map(p => { const pct = (p.raisedAmount / p.goalAmount) * 100; return <tr key={p.id} className="border-t border-slate-700 hover:bg-slate-700/30">
            <td className="px-4 py-4"><div className="flex items-center gap-3"><img src={p.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover" /><div><p className="font-medium text-white">{p.title}</p><p className="text-xs text-slate-400">{formatCurrency(p.goalAmount)} goal</p></div></div></td>
            <td className="px-4 py-4"><div className="min-w-[100px]"><Progress value={pct} size="sm" /><p className="text-xs text-slate-400 mt-1">{formatCurrency(p.raisedAmount)}</p></div></td>
            <td className="px-4 py-4"><Badge variant={p.status === 'active' ? 'success' : p.status === 'pending' ? 'warning' : 'danger'}>{p.status}</Badge></td>
            <td className="px-4 py-4"><div className="flex justify-end gap-2">{p.status === 'pending' && <><Button variant="danger" size="sm" icon={X} /><Button size="sm" icon={Check} /></>}<Button variant="ghost" size="sm" icon={Eye} /></div></td>
          </tr> })}</tbody>
        </table>
      </Card>
    </div>
  );
};

export default AdminProjectsPage;
