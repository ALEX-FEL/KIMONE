import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Phone, Lock, CheckCircle, Clock, AlertCircle, ChevronRight, Check } from 'lucide-react';
import { Project } from '../../types';
import { formatCurrency } from '../../i18n';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface PaymentModalProps { project: Project; onClose: () => void; }

type Step = 'amount' | 'reward' | 'payment' | 'processing' | 'success';
type Method = 'orange_money' | 'mtn_momo' | 'card';

const PaymentModal: React.FC<PaymentModalProps> = ({ project, onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [method, setMethod] = useState<Method>('orange_money');
  const [phone, setPhone] = useState('');

  const presets = [5000, 10000, 25000, 50000, 100000];
  const currentAmount = selectedPreset || parseInt(amount) || 0;

  const getStepContent = () => {
    switch (step) {
      case 'amount': return (
        <div className="space-y-6">
          <p className="text-sm text-slate-500 mb-3">{t('donate.selectAmount')}</p>
          <div className="grid grid-cols-3 gap-2">{presets.map(amt => <button key={amt} onClick={() => { setSelectedPreset(amt); setAmount(''); }} className={`p-3 rounded-xl border-2 text-center transition-all ${selectedPreset === amt ? 'border-amber-500 bg-amber-50' : 'border-slate-200'}`}><span className="text-sm font-semibold">{formatCurrency(amt)}</span></button>)}</div>
          <Input label={t('donate.custom')} value={amount} onChange={e => { setAmount(e.target.value); setSelectedPreset(null); }} placeholder="0" type="number" />
          <Button fullWidth disabled={currentAmount < 1000} onClick={() => setStep('reward')} icon={ChevronRight} iconPosition="right">{t('donate.continue')}</Button>
        </div>
      );
      case 'reward': return (
        <div className="space-y-4">
          <div className="flex justify-between p-3 bg-amber-50 rounded-xl mb-4"><span className="text-sm">{t('donate.total')}</span><span className="text-lg font-bold text-amber-600">{formatCurrency(currentAmount)}</span></div>
          <p className="text-sm text-slate-500">{t('donate.selectReward')}</p>
          {project.rewards.filter(r => r.minimumAmount <= currentAmount).map(r => <Card key={r.id} hover className="border-2"><p className="font-semibold">{r.title}</p><p className="text-amber-600">{formatCurrency(r.minimumAmount)}</p><p className="text-sm text-slate-500">{r.description}</p></Card>)}
          <div className="flex gap-3"><Button variant="outline" onClick={() => setStep('amount')}>{t('common.back')}</Button><Button fullWidth onClick={() => setStep('payment')} icon={ChevronRight} iconPosition="right">{t('donate.continue')}</Button></div>
        </div>
      );
      case 'payment': return (
        <div className="space-y-4">
          <div className="flex justify-between p-3 bg-amber-50 rounded-xl mb-4"><span className="text-sm">{t('donate.total')}</span><span className="text-lg font-bold text-amber-600">{formatCurrency(currentAmount)}</span></div>
          <p className="text-sm text-slate-500">{t('donate.paymentMethod')}</p>
          {[{ id: 'orange_money', name: 'Orange Money', color: 'bg-orange-500' }, { id: 'mtn_momo', name: 'MTN Mobile Money', color: 'bg-yellow-500' }, { id: 'card', name: 'Card', color: 'bg-blue-600' }].map(m => <button key={m.id} onClick={() => setMethod(m.id as Method)} className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 ${method === m.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200'}`}><div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center text-white font-bold`}>{m.name[0]}</div><span className="font-medium">{m.name}</span>{method === m.id && <Check className="w-5 h-5 text-amber-500 ml-auto" />}</button>)}
          {method !== 'card' && <Input label={t('payment.phoneNumber')} placeholder="6 XX XX XX XX" value={phone} onChange={e => setPhone(e.target.value)} icon={Phone} />}
          <div className="flex gap-3"><Button variant="outline" onClick={() => setStep('reward')}>{t('common.back')}</Button><Button fullWidth onClick={() => { setStep('processing'); setTimeout(() => setStep('success'), 3000); }} icon={Lock}>{t('payment.confirmPayment')}</Button></div>
        </div>
      );
      case 'processing': return <div className="text-center py-8"><Clock className="w-16 h-16 mx-auto text-amber-600 animate-pulse mb-4" /><p className="text-lg font-semibold">{t('donate.processing')}</p><p className="text-slate-500">{t('payment.pendingMessage')}</p></div>;
      case 'success': return <div className="text-center py-8"><CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" /><p className="text-lg font-semibold text-slate-800">{t('donate.success')}</p><p className="text-slate-500 mb-4">{t('payment.successMessage')}</p><div className="bg-amber-50 p-4 rounded-xl mb-4"><p className="text-lg font-bold text-amber-600">{formatCurrency(currentAmount)}</p><p className="text-sm text-slate-600">{project.title}</p></div><Button fullWidth onClick={onClose}>{t('common.close')}</Button></div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-2xl shadow-xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b"><div><h2 className="text-lg font-semibold">{t('donate.title')}</h2><p className="text-sm text-slate-500 truncate">{project.title}</p></div><button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100"><X className="w-5 h-5" /></button></div>
        {step !== 'processing' && step !== 'success' && <div className="flex items-center justify-center gap-2 p-4 bg-slate-50">{['amount', 'reward', 'payment'].map((s, i) => <React.Fragment key={s}><div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${['amount', 'reward', 'payment'].indexOf(step) >= i ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400'}`}>{i + 1}</div>{i < 2 && <div className="w-8 h-0.5 bg-slate-200" />}</React.Fragment>)}</div>}
        <div className="p-6">{getStepContent()}</div>
      </div>
    </div>
  );
};

export default PaymentModal;
