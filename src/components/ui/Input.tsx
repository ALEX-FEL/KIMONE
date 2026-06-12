import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  helper?: string;
}

const Input: React.FC<InputProps> = ({ label, error, icon: Icon, helper, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
    <div className="relative">
      {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon className="w-5 h-5" /></div>}
      <input
        className={`w-full rounded-xl border transition-all ${Icon ? 'pl-10' : ''} ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-amber-500 focus:ring-amber-500/20'} focus:ring-4 focus:outline-none px-4 py-3 text-slate-700 ${className}`}
        {...props}
      />
    </div>
    {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    {helper && !error && <p className="mt-1.5 text-sm text-slate-500">{helper}</p>}
  </div>
);

export default Input;
