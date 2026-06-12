import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Share2, Heart, Clock, Users, Check, X, Play, Copy } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Progress from '../components/ui/Progress';
import Avatar from '../components/ui/Avatar';
import Tabs from '../components/ui/Tabs';
import Modal from '../components/ui/Modal';
import { mockProjects, mockDonations } from '../data/mockData';
import { formatCurrency, formatDate, formatRelativeTime } from '../i18n';
import { useApp } from '../context/AppContext';
import PaymentModal from '../components/payment/PaymentModal';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { toggleSaveProject, isProjectSaved } = useApp();
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];
  const donations = mockDonations.filter(d => d.projectId === project.id);
  const saved = isProjectSaved(project.id);
  const [activeTab, setActiveTab] = useState('description');
  const [showShare, setShowShare] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const percentage = (project.raisedAmount / project.goalAmount) * 100;
  const daysLeft = Math.max(0, Math.ceil((new Date(project.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const tabs = [{ id: 'description', label: t('project.details') }, { id: 'rewards', label: t('project.rewards.title'), count: project.rewards.length }, { id: 'donors', label: 'Donors', count: donations.length }];

  return (
    <div className="min-h-screen py-4 md:py-8">
      <Modal isOpen={showShare} onClose={() => setShowShare(false)} title={t('share.title')}>
        <div className="space-y-4">
          <a href={`https://wa.me/?text=${encodeURIComponent(project.title + ' ' + window.location.href)}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl">WhatsApp</a>
          <button onClick={() => { navigator.clipboard.writeText(window.location.href); }} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl hover:bg-slate-200"><Copy className="w-5 h-5" />{t('share.copy')}</button>
        </div>
      </Modal>
      {showPayment && <PaymentModal project={project} onClose={() => setShowPayment(false)} />}
      <div className="container mx-auto px-4">
        <div className="mb-6 text-sm text-slate-500"><Link to="/explore" className="hover:text-amber-600">{t('nav.explore')}</Link> / <span>{project.category}</span></div>
        <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">{project.title}</h1>
        <div className="flex items-center gap-3 mb-6"><Avatar src={project.creator.avatar} name={project.creator.fullName} /><div><p className="font-medium">{project.creator.fullName}</p><p className="text-sm text-slate-500">{formatDate(project.createdAt)}</p></div></div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6"><img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" /></div>
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
            <div className="mt-6">
              {activeTab === 'description' && <div className="prose"><p className="text-slate-600">{project.story}</p></div>}
              {activeTab === 'rewards' && <div className="space-y-4">{project.rewards.map(r => <Card key={r.id}><h4 className="font-semibold">{r.title}</h4><p className="text-amber-600 font-bold">{formatCurrency(r.minimumAmount)}</p><p className="text-slate-500 text-sm">{r.description}</p></Card>)}</div>}
              {activeTab === 'donors' && <div className="space-y-3">{donations.map(d => <div key={d.id} className="flex items-center justify-between"><div className="flex items-center gap-2"><Avatar size="sm" name={d.isAnonymous ? 'A' : d.user?.fullName} /><span>{d.isAnonymous ? 'Anonymous' : d.user?.fullName}</span></div><span className="text-amber-600 font-semibold">{formatCurrency(d.amount)}</span></div>)}</div>}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <Progress value={percentage} size="lg" className="mb-4" />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><p className="text-2xl font-bold">{formatCurrency(project.raisedAmount)}</p><p className="text-sm text-slate-500">{t('project.progress.raised')}</p></div>
                <div><p className="text-2xl font-bold text-amber-600">{percentage.toFixed(0)}%</p><p className="text-sm text-slate-500">{t('project.progress.funded')}</p></div>
                <div><p className="text-2xl font-bold">{project.backersCount}</p><p className="text-sm text-slate-500">{t('project.progress.backers')}</p></div>
                <div><p className="text-2xl font-bold">{daysLeft}</p><p className="text-sm text-slate-500">{t('project.progress.daysLeft')}</p></div>
              </div>
              <Button fullWidth size="lg" onClick={() => setShowPayment(true)}>{t('project.backProject')}</Button>
              <div className="flex gap-2 mt-3"><Button fullWidth variant="outline" onClick={() => setShowShare(true)} icon={Share2}>{t('project.share')}</Button><Button variant={saved ? 'secondary' : 'outline'} onClick={() => toggleSaveProject(project.id)} icon={Heart} /></div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
