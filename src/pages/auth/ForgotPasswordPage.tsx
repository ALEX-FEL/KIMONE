import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/login" className="inline-flex items-center gap-2 mb-6 text-slate-600"><ArrowLeft className="w-5 h-5" /><span>{t('common.back')}</span></Link>
        <Card className="p-6 md:p-8 shadow-xl border-0 text-center">
          {!submitted ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-2xl">I</span></div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">{t('auth.resetPassword')}</h1>
              <p className="text-slate-500 mb-6">Enter your email to reset your password.</p>
              <div className="space-y-4"><Input label={t('auth.email')} type="email" value={email} onChange={e => setEmail(e.target.value)} icon={Mail} required /><Button fullWidth onClick={() => setSubmitted(true)}>{t('common.continue')}</Button></div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-600" /></div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Email Sent!</h1>
              <p className="text-slate-500 mb-6">Check your inbox for reset instructions.</p>
              <Link to="/login"><Button fullWidth variant="outline">{t('auth.login')}</Button></Link>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
