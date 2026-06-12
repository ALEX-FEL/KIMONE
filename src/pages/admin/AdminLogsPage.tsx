import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Pagination from '../../components/ui/Pagination';
import { mockAdminLogs } from '../../data/mockData';
import { formatRelativeTime } from '../../i18n';

const AdminLogsPage: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const filtered = mockAdminLogs.filter(l => !filter || l.action === filter);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const getActionColor = (a: string) => a === 'login' ? 'info' : a === 'payment' ? 'success' : a === 'project' ? 'primary' : 'default';

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-start mb-6"><div><h1 className="text-2xl font-bold text-white">{t('admin.logs.title')}</h1><p className="text-slate-400">System activity</p></div><Button variant="outline" icon={Download}>Export</Button></div>
      <Card className="mb-6 bg-slate-800 border-slate-700">
        <div className="flex flex-col md:flex-row gap-4"><Input placeholder="Search..." className="flex-1" /><Select value={filter} onChange={e => { setFilter(e.target.value); setCurrentPage(1); }} options={[{ value: '', label: 'All' }, { value: 'login', label: 'Login' }, { value: 'payment', label: 'Payment' }, { value: 'project', label: 'Project' }, { value: 'system', label: 'System' }]} className="min-w-[150px]" /></div>
      </Card>
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <div className="divide-y divide-slate-700">{paginated.map(l => <div key={l.id} className="p-4 hover:bg-slate-700/30"><div className="flex items-start gap-4"><Avatar src={l.admin.avatar} name={l.admin.fullName} size="sm" /><div className="flex-1"><div className="flex items-center gap-2 mb-1"><p className="font-medium text-white">{l.admin.fullName}</p><Badge variant={getActionColor(l.action)} size="sm">{l.action}</Badge></div><p className="text-slate-300">{l.description}</p></div><p className="text-sm text-slate-500">{formatRelativeTime(l.createdAt)}</p></div></div>)}</div>
        <div className="p-4 border-t border-slate-700"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} /></div>
      </Card>
    </div>
  );
};

export default AdminLogsPage;
