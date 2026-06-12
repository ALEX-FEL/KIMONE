import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const OtpPage: React.FC = () => {
  const { t } = useTranslation();
  const [otp, setOtp] = React.useState<string[]>(Array(6).fill(''));
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => { if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1]?.focus(); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 mb-6 text-slate-600"><ArrowLeft className="w-5 h-5" /><span>{t('common.back')}</span></Link>
        <Card className="p-6 md:p-8 shadow-xl border-0 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-6"><ShieldCheck className="w-10 h-10 text-amber-600" /></div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{t('auth.otp.title')}</h1>
          <p className="text-slate-500 mb-8">{t('auth.otp.subtitle')}</p>
          <div className="flex justify-center gap-2 md:gap-3 mb-6">{otp.map((d, i) => <input key={i} ref={el => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={d} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)} className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-semibold border-2 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none" />)}</div>
          <Link to="/"><Button fullWidth>{t('auth.otp.verify')}</Button></Link>
        </Card>
      </div>
    </div>
  );
};

export default OtpPage;
