import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, CreditCard, Award, Bookmark } from 'lucide-react';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import ProjectCard from '../components/layout/ProjectCard';
import { mockDonations, mockProjects, mockBadges } from '../data/mockData';
import { formatCurrency, formatRelativeTime } from '../i18n';
import { useApp } from '../context/AppContext';

const UserDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useApp();
  const userDonations = mockDonations.filter(d => d.userId === currentUser?.id);
  const savedIds = ['p1', 'p3'];
  const savedProjects = mockProjects.filter(p => savedIds.includes(p.id));
  const [activeTab, setActiveTab] = React.useState('donations');

  const tabs = [{ id: 'donations', label: 'Donations', icon: CreditCard, count: userDonations.length }, { id: 'saved', label: 'Saved', icon: Bookmark, count: savedProjects.length }];

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4">
        <Card className="mb-6">
          <div className="flex items-center gap-6">
            <Avatar src={currentUser?.avatar} name={currentUser?.fullName} size="xl" className="w-20 h-20" />
            <div><h1 className="text-2xl font-bold">{currentUser?.fullName}</h1><p className="text-slate-500">{currentUser?.email}</p><div className="flex gap-2 mt-2"><Badge variant="success">Verified</Badge></div></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t text-center">
            <div><p className="text-2xl font-bold text-amber-600">{userDonations.length}</p><p className="text-sm text-slate-500">Donations</p></div>
            <div><p className="text-2xl font-bold text-amber-600">{formatCurrency(userDonations.reduce((s, d) => s + d.amount, 0))}</p><p className="text-sm text-slate-500">Total Given</p></div>
            <div><p className="text-2xl font-bold text-amber-600">{savedProjects.length}</p><p className="text-sm text-slate-500">Saved</p></div>
            <div><p className="text-2xl font-bold text-amber-600">3</p><p className="text-sm text-slate-500">Badges</p></div>
          </div>
        </Card>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />
        {activeTab === 'donations' && <div className="space-y-4">{userDonations.map(d => <Card key={d.id} className="flex items-center gap-4"><img src={d.project.coverImage} alt="" className="w-20 h-20 rounded-xl object-cover" /><div className="flex-1"><h3 className="font-semibold">{d.project.title}</h3><p className="text-amber-600 font-bold">{formatCurrency(d.amount)}</p><p className="text-sm text-slate-500">{formatRelativeTime(d.createdAt)}</p></div><Badge variant={d.paymentStatus === 'successful' ? 'success' : 'warning'}>{d.paymentStatus}</Badge></Card>)}</div>}
        {activeTab === 'saved' && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{savedProjects.map(p => <ProjectCard key={p.id} project={p} variant="horizontal" />)}</div>}
      </div>
    </div>
  );
};

export default UserDashboardPage;
