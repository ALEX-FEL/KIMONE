import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-slate-600"><ArrowLeft className="w-5 h-5" /><span>{t('common.back')}</span></Link>
        <Card className="p-6 md:p-8 shadow-xl border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-2xl">I</span></div>
            <h1 className="text-2xl font-bold text-slate-800">{t('auth.register')}</h1>
          </div>
          <div className="space-y-4">
            <Input label={t('auth.fullName')} placeholder="Jean-Pierre Nkolo" value={fullName} onChange={e => setFullName(e.target.value)} icon={User} required />
            <Input label={t('auth.email')} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} icon={Mail} required />
            <div className="relative"><Input label={t('auth.password')} type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} icon={Lock} required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-slate-400">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div>
            <label className="flex items-center gap-3"><div onClick={() => setAgreeTerms(!agreeTerms)} className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${agreeTerms ? 'bg-amber-500 border-amber-500' : 'border-slate-300'}`}>{agreeTerms && <Check className="w-3 h-3 text-white" />}</div><span className="text-sm text-slate-600">I agree to the terms and conditions</span></label>
            <Link to="/"><Button fullWidth>{t('auth.registerButton')}</Button></Link>
          </div>
          <p className="text-center mt-6 text-slate-600">{t('auth.hasAccount')} <Link to="/login" className="text-amber-600 font-semibold">{t('auth.signin')}</Link></p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
