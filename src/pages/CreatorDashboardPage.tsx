import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FolderKanban, CreditCard, Megaphage, TrendingUp, Eye, Users, DollarSign, ArrowUpRight, Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Progress from '../components/ui/Progress';
import { mockProjects, mockDonations } from '../data/mockData';
import { formatCurrency, formatRelativeTime } from '../i18n';
import { useApp } from '../context/AppContext';

const CreatorDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useApp();
  const projects = mockProjects.filter(p => p.creatorId === currentUser?.id);
  const totalRaised = projects.reduce((s, p) => s + p.raisedAmount, 0);
  const totalBackers = projects.reduce((s, p) => s + p.backersCount, 0);
  const stats = [
    { label: 'Funds Raised', value: formatCurrency(totalRaised), change: '+15%', icon: DollarSign, positive: true },
    { label: 'Views', value: '3.5K', change: '+23%', icon: Eye, positive: true },
    { label: 'Backers', value: totalBackers.toString(), change: '+8%', icon: Users, positive: true },
  ];

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl font-bold text-slate-800">Creator Dashboard</h1><p className="text-slate-500">Welcome, {currentUser?.fullName}</p></div>
          <Link to="/create-project"><Button icon={Plus}>New Project</Button></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">{stats.map((s, i) => <Card key={i}><div className="flex items-start justify-between"><div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"><s.icon className="w-5 h-5 text-amber-600" /></div><span className={`flex items-center gap-1 text-sm ${s.positive ? 'text-green-500' : 'text-red-500'}`}><ArrowUpRight className="w-4 h-4" />{s.change}</span></div><p className="text-2xl font-bold mt-3">{s.value}</p><p className="text-sm text-slate-500">{s.label}</p></Card>)}</div>
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">My Projects</h2><Badge>{projects.length}</Badge></div>
          {projects.length > 0 ? <div className="space-y-4">{projects.map(p => { const pct = (p.raisedAmount / p.goalAmount) * 100; return <div key={p.id} className="p-4 rounded-xl border hover:border-amber-200 transition-colors"><div className="flex gap-4"><img src={p.coverImage} alt="" className="w-16 h-16 rounded-lg object-cover" /><div className="flex-1"><h3 className="font-semibold">{p.title}</h3><Badge variant={p.status === 'active' ? 'success' : 'warning'} size="sm" className="mt-1">{p.status}</Badge></div></div><div className="mt-2"><Progress value={pct} size="sm" /><div className="flex justify-between text-sm mt-1"><span className="text-amber-600 font-semibold">{formatCurrency(p.raisedAmount)}</span></div></div></div> })}</div> : <div className="text-center py-8"><FolderKanban className="w-12 h-12 mx-auto text-slate-300" /><p className="text-slate-500 mt-4">No projects yet</p><Link to="/create-project"><Button className="mt-4">Create First Project</Button></Link></div>}
        </Card>
      </div>
    </div>
  );
};

export default CreatorDashboardPage;
