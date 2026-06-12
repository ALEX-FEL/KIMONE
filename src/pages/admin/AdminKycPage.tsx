import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileCheck, Search, X, Check } from 'lucide-react';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockKycDocuments } from '../../data/mockData';
import { formatDate } from '../../i18n';

const AdminKycPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('pending');
  const tabs = [{ id: 'pending', label: 'Pending', count: mockKycDocuments.filter(k => k.status === 'pending').length }, { id: 'approved', label: 'Approved' }, { id: 'rejected', label: 'Rejected' }];
  const filtered = mockKycDocuments.filter(d => d.status === activeTab);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6"><h1 className="text-2xl font-bold text-white">{t('admin.kyc.title')}</h1><p className="text-slate-400">Verify user identities</p></div>
      <div className="flex flex-col md:flex-row gap-4 mb-6"><Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" /><Input placeholder="Search..." icon={Search} className="max-w-xs" /></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map(doc => <Card key={doc.id} className="bg-slate-800 border-slate-700">
        <div className="flex items-start gap-4"><Avatar src={doc.user.avatar} name={doc.user.fullName} size="md" /><div className="flex-1"><p className="font-medium text-white">{doc.user.fullName}</p><p className="text-sm text-slate-400">{doc.user.email}</p></div><Badge size="sm">{doc.documentType}</Badge></div>
        <div className="mt-4 bg-slate-700/50 rounded-xl p-4 text-center"><FileCheck className="w-12 h-12 mx-auto text-slate-500 mb-2" /><p className="text-sm text-slate-400">Document uploaded</p></div>
        <div className="mt-4 text-sm text-slate-400 text-center">Submitted {formatDate(doc.submittedAt)}</div>
        {activeTab === 'pending' && <div className="flex gap-2 mt-4"><Button fullWidth variant="danger" size="sm" icon={X}>{t('admin.kyc.actions.reject')}</Button><Button fullWidth size="sm" icon={Check}>{t('admin.kyc.actions.approve')}</Button></div>}
      </Card>)}</div>
    </div>
  );
};

export default AdminKycPage;
