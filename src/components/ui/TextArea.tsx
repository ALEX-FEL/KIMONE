import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, error, helper, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>}
    <textarea className={`w-full rounded-xl border resize-none ${error ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-amber-500'} focus:ring-amber-500/20 focus:ring-4 outline-none px-4 py-3 text-slate-700 ${className}`} {...props} />
    {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    {helper && !error && <p className="mt-1.5 text-sm text-slate-500">{helper}</p>}
  </div>
);

export default TextArea;
