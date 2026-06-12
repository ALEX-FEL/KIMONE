import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Download } from 'lucide-react';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';
import { mockTransactions } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../i18n';

const AdminPaymentsPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const tabs = [{ id: 'all', label: 'All' }, { id: 'successful', label: 'Successful' }, { id: 'pending', label: 'Pending' }, { id: 'failed', label: 'Failed' }];
  const filtered = mockTransactions.filter(tx => activeTab === 'all' || tx.status === activeTab);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getMethod = (m: string) => m === 'orange_money' ? 'Orange Money' : m === 'mtn_momo' ? 'MTN MoMo' : 'Card';

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-start mb-6"><div><h1 className="text-2xl font-bold text-white">{t('admin.payments.title')}</h1><p className="text-slate-400">Monitor transactions</p></div><Button variant="outline" icon={Download}>Export</Button></div>
      <div className="flex flex-col md:flex-row gap-4 mb-6"><Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" /><Input placeholder="Search..." icon={Search} className="max-w-xs" /></div>
      <Card className="bg-slate-800 border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700/50"><tr><th className="px-4 py-3 text-sm text-slate-300">Reference</th><th className="px-4 py-3 text-sm text-slate-300">User</th><th className="px-4 py-3 text-sm text-slate-300">Type</th><th className="px-4 py-3 text-sm text-slate-300">Amount</th><th className="px-4 py-3 text-sm text-slate-300">Method</th><th className="px-4 py-3 text-sm text-slate-300">Status</th></tr></thead>
          <tbody>{paginated.map(tx => <tr key={tx.id} className="border-t border-slate-700 hover:bg-slate-700/30">
            <td className="px-4 py-4 font-mono text-sm text-slate-300">{tx.reference}</td>
            <td className="px-4 py-4 text-white">{tx.user.fullName}</td>
            <td className="px-4 py-4"><Badge variant={tx.type === 'donation' ? 'primary' : 'info'}>{tx.type}</Badge></td>
            <td className="px-4 py-4 text-white">{formatCurrency(tx.amount)}</td>
            <td className="px-4 py-4 text-slate-300">{getMethod(tx.paymentMethod)}</td>
            <td className="px-4 py-4"><Badge variant={tx.status === 'successful' ? 'success' : tx.status === 'pending' ? 'warning' : 'danger'}>{tx.status}</Badge></td>
          </tr>)}</tbody>
        </table>
        <div className="p-4 border-t border-slate-700"><Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} /></div>
      </Card>
    </div>
  );
};

export default AdminPaymentsPage;
