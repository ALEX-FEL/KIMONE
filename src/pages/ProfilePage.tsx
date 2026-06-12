import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Shield, Award, LogOut, Heart, Wallet } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Avatar from '../components/ui/Avatar';
import Tabs from '../components/ui/Tabs';
import { useApp } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, language, setLanguage } = useApp();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [{ id: 'profile', label: t('nav.profile') }, { id: 'badges', label: t('dashboard.user.badges') }, { id: 'settings', label: t('nav.settings') }];
  const badges = [{ id: '1', name: 'Verified', icon: 'badge', earnedAt: '2024-02-01' }];

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card className="text-center">
              <div className="relative inline-block"><Avatar src={currentUser?.avatar} name={currentUser?.fullName} size="xl" className="w-24 h-24" /><button className="absolute bottom-0 right-0 p-2 rounded-full bg-amber-500 text-white shadow-lg"><Camera className="w-4 h-4" /></button></div>
              <h1 className="text-2xl font-bold mt-4">{currentUser?.fullName}</h1>
              <p className="text-slate-500">{currentUser?.email}</p>
              <div className="flex items-center justify-center gap-2 mt-4"><Badge variant={currentUser?.kycStatus === 'approved' ? 'success' : 'warning'}>KYC: {currentUser?.kycStatus}</Badge>{currentUser?.isVerified && <Badge variant="primary"><Shield className="w-3 h-3 mr-1" />Verified</Badge>}</div>
            </Card>
            <Card>
              <h3 className="font-semibold mb-4">Activity</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><Heart className="w-6 h-6 mx-auto text-red-500 mb-2" /><p className="font-bold text-xl">5</p><p className="text-sm text-slate-500">Saved</p></div>
                <div><Wallet className="w-6 h-6 mx-auto text-amber-500 mb-2" /><p className="font-bold text-xl">3</p><p className="text-sm text-slate-500">Donations</p></div>
                <div><Award className="w-6 h-6 mx-auto text-blue-500 mb-2" /><p className="font-bold text-xl">{badges.length}</p><p className="text-sm text-slate-500">Badges</p></div>
              </div>
            </Card>
          </div>
        )}
        {activeTab === 'badges' && <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{badges.map(b => <Card key={b.id} className="text-center"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-3"><Award className="w-8 h-8 text-white" /></div><p className="font-semibold">{b.name}</p><p className="text-xs text-slate-500">{b.earnedAt}</p></Card>)}</div>}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <Card>
              <h3 className="font-semibold mb-4">Language</h3>
              <div className="flex gap-3">
                <button onClick={() => setLanguage('fr')} className={`flex-1 p-4 rounded-xl border-2 transition-all ${language === 'fr' ? 'border-amber-500 bg-amber-50' : 'border-slate-200'}`}>Francais</button>
                <button onClick={() => setLanguage('en')} className={`flex-1 p-4 rounded-xl border-2 transition-all ${language === 'en' ? 'border-amber-500 bg-amber-50' : 'border-slate-200'}`}>English</button>
              </div>
            </Card>
            <Button variant="danger" fullWidth icon={LogOut}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
