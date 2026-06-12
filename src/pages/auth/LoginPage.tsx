import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Phone, Smartphone } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [loginMethod, setLoginMethod] = React.useState<'email' | 'phone'>('email');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-slate-600"><ArrowLeft className="w-5 h-5" /><span>{t('common.back')}</span></Link>
        <Card className="p-6 md:p-8 shadow-xl border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4"><span className="text-white font-bold text-2xl">I</span></div>
            <h1 className="text-2xl font-bold text-slate-800">{t('auth.login')}</h1>
            <p className="text-slate-500">{t('app.tagline')}</p>
          </div>

          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'email' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500'}`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'phone' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500'}`}
            >
              <Phone className="w-4 h-4" />
              Telephone
            </button>
          </div>

          <div className="space-y-4">
            {loginMethod === 'email' ? (
              <Input label={t('auth.email')} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} icon={Mail} required />
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">{t('auth.phone')}</label>
                <div className="flex gap-2">
                  <div className="flex items-center px-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium text-slate-600">
                    +237
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      placeholder="6 XX XX XX XX"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="relative">
              <Input label={t('auth.password')} type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} icon={Lock} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-slate-400">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Link to="/forgot-password" className="block text-sm text-amber-600 hover:underline">{t('auth.forgotPassword')}</Link>
            <Link to="/"><Button fullWidth>{t('auth.loginButton')}</Button></Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-500">ou continuer avec</span></div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl hover:bg-slate-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-slate-700 font-medium">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="flex-1 flex items-center justify-center gap-2 py-3 border rounded-xl hover:bg-slate-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-slate-700 font-medium">Facebook</span>
            </button>
          </div>

          <p className="text-center mt-6 text-slate-600">{t('auth.noAccount')} <Link to="/register" className="text-amber-600 font-semibold">{t('auth.signup')}</Link></p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
