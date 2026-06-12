import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Target, Calendar, Gift, Check, Plus, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';

const CreateProjectPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ title: '', category: '', description: '', story: '', goalAmount: '', duration: '', risks: '' });
  const [rewards, setRewards] = useState<{ id: string; title: string; amount: string; description: string }[]>([]);

  const steps = [{ id: 'basic', title: t('project.form.step1'), icon: Target }, { id: 'budget', title: t('project.form.step2'), icon: Calendar }, { id: 'rewards', title: t('project.form.step3'), icon: Gift }, { id: 'preview', title: t('project.form.step4'), icon: Check }];
  const categories = [{ value: 'film', label: t('home.categories.film') }, { value: 'music', label: t('home.categories.music') }, { value: 'events', label: t('home.categories.events') }, { value: 'arts', label: t('home.categories.arts') }, { value: 'theater', label: t('home.categories.theater') }, { value: 'literature', label: t('home.categories.literature') }];

  const addReward = () => setRewards(prev => [...prev, { id: `r${Date.now()}`, title: '', amount: '', description: '' }]);
  const removeReward = (id: string) => setRewards(prev => prev.filter(r => r.id !== id));

  return (
    <div className="min-h-screen py-4 md:py-8 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{t('project.create')}</h1>
        <div className="mb-8">
          <div className="flex items-center justify-between">{steps.map((s, i) => <React.Fragment key={s.id}><div className="flex flex-col items-center"><div className={`w-12 h-12 rounded-full flex items-center justify-center ${i <= step ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400'}`}>{i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}</div><span className="text-xs mt-2">{s.title}</span></div>{i < 3 && <div className={`flex-1 h-1 mx-4 rounded-full ${i < step ? 'bg-green-500' : 'bg-slate-200'}`} />}</React.Fragment>)}</div>
        </div>
        <Card className="!p-6 md:!p-8">
          {step === 0 && <div className="space-y-6"><Input label={t('project.form.title')} value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} required /><Select label={t('project.form.category')} options={categories} placeholder={t('project.form.selectCategory')} value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} /><TextArea label={t('project.form.description')} value={formData.description} onChange={e => setFormData(p => ({ ...p, description: e.target.value }))} rows={4} /><TextArea label={t('project.form.story')} value={formData.story} onChange={e => setFormData(p => ({ ...p, story: e.target.value }))} rows={6} /></div>}
          {step === 1 && <div className="space-y-6"><Input label={t('project.form.goalAmount')} type="number" value={formData.goalAmount} onChange={e => setFormData(p => ({ ...p, goalAmount: e.target.value }))} required /><Input label={t('project.form.duration')} type="number" helper={t('project.form.durationUnit')} value={formData.duration} onChange={e => setFormData(p => ({ ...p, duration: e.target.value }))} /><TextArea label={t('project.form.risks')} value={formData.risks} onChange={e => setFormData(p => ({ ...p, risks: e.target.value }))} rows={4} /></div>}
          {step === 2 && <div className="space-y-4"><div className="flex justify-between"><div><h3 className="font-semibold">{t('project.rewards.title')}</h3><p className="text-sm text-slate-500">Add rewards for your backers</p></div><Button variant="outline" size="sm" onClick={addReward} icon={Plus}>{t('project.rewards.add')}</Button></div>{rewards.length === 0 ? <div className="text-center py-12 border-2 border-dashed rounded-xl"><Gift className="w-12 h-12 mx-auto text-slate-300" /><p className="text-slate-500 mt-2">No rewards defined</p><Button variant="ghost" size="sm" onClick={addReward} className="mt-2">Add a reward</Button></div> : <div className="space-y-4">{rewards.map(r => <Card key={r.id}><button onClick={() => removeReward(r.id)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-4 h-4" /></button><div className="grid md:grid-cols-2 gap-4"><Input placeholder="Reward Title" value={r.title} onChange={e => setRewards(prev => prev.map(x => x.id === r.id ? { ...x, title: e.target.value } : x))} /><Input placeholder="Amount" type="number" value={r.amount} onChange={e => setRewards(prev => prev.map(x => x.id === r.id ? { ...x, amount: e.target.value } : x))} /></div><TextArea placeholder="Description" value={r.description} onChange={e => setRewards(prev => prev.map(x => x.id === r.id ? { ...x, description: e.target.value } : x))} rows={2} /></Card>)}</div>}</div>}
          {step === 3 && <div className="space-y-6"><div className="bg-amber-50 rounded-xl p-6"><h3 className="font-semibold mb-4 flex items-center gap-2"><Check className="w-5 h-5 text-green-500" />Project Summary</h3><p className="text-slate-800"><strong>Title:</strong> {formData.title || 'Not set'}</p><p className="text-slate-800"><strong>Goal:</strong> {formData.goalAmount ? `${parseInt(formData.goalAmount).toLocaleString()} FCFA` : 'Not set'}</p><p className="text-slate-800"><strong>Rewards:</strong> {rewards.length} tier(s)</p></div></div>}
          <div className="flex justify-between mt-8 pt-6 border-t">{step > 0 ? <Button variant="outline" onClick={() => setStep(s => s - 1)} icon={ArrowLeft}>{t('project.form.previous')}</Button> : <div />}{step < 3 ? <Button onClick={() => setStep(s => s + 1)} icon={ArrowRight} iconPosition="right">{t('project.form.next')}</Button> : <Button onClick={() => { alert('Project submitted!'); navigate('/dashboard/creator'); }}>{t('project.form.submit')}</Button>}</div>
        </Card>
      </div>
    </div>
  );
};

export default CreateProjectPage;
