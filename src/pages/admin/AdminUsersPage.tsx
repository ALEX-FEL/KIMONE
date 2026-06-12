import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Pagination from '../../components/ui/Pagination';
import Card from '../../components/ui/Card';
import { mockUsers } from '../../data/mockData';
import { formatDate } from '../../i18n';

const AdminUsersPage: React.FC = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const filtered = mockUsers.filter(u => {
    const matchSearch = u.fullName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchRole;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold text-white">{t('admin.users.title')}</h1><p className="text-slate-400">{mockUsers.length} users</p></div>
      <Card className="mb-6 bg-slate-800 border-slate-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1"><Input placeholder="Search users..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} icon={Search} /></div>
          <Select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }} options={[{ value: '', label: 'All Roles' }, { value: 'user', label: 'User' }, { value: 'creator', label: 'Creator' }, { value: 'admin', label: 'Admin' }]} className="min-w-[150px]" />
        </div>
      </Card>
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50"><tr><th className="text-left px-4 py-3 text-sm text-slate-300">User</th><th className="text-left px-4 py-3 text-sm text-slate-300">Role</th><th className="text-left px-4 py-3 text-sm text-slate-300">KYC</th><th className="text-left px-4 py-3 text-sm text-slate-400">Joined</th></tr></thead>
          <tbody>{paginated.map(u => <tr key={u.id} className="border-t border-slate-700 hover:bg-slate-700/30"><td className="px-4 py-4"><div className="flex items-center gap-3"><Avatar src={u.avatar} name={u.fullName} size="sm" /><div><p className="font-medium text-white">{u.fullName}</p><p className="text-xs text-slate-400">{u.email}</p></div></div></td><td className="px-4 py-4"><Badge variant={u.role === 'admin' ? 'info' : u.role === 'creator' ? 'primary' : 'default'}>{u.role}</Badge></td><td className="px-4 py-4"><Badge variant={u.kycStatus === 'approved' ? 'success' : u.kycStatus === 'rejected' ? 'danger' : 'warning'}>{u.kycStatus}</Badge></td><td className="px-4 py-4 text-sm text-slate-400">{formatDate(u.createdAt)}</td></tr>)}</tbody>
        </table>
        <div className="p-4 border-t border-slate-700"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} /></div>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
