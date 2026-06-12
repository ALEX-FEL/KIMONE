import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Tab { id: string; label: string; icon?: LucideIcon; count?: number; }
interface TabsProps { tabs: Tab[]; activeTab: string; onChange: (id: string) => void; variant?: 'default' | 'pills'; }

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, variant = 'default' }) => {
  if (variant === 'pills') {
    return (
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => onChange(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${activeTab === tab.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}>
            {tab.label} {tab.count !== undefined && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200">{tab.count}</span>}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="border-b border-slate-200">
      <div className="flex gap-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => onChange(tab.id)} className={`flex items-center gap-2 pb-3 px-1 font-medium whitespace-nowrap border-b-2 ${activeTab === tab.id ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:border-slate-300'}`}>
            {tab.label} {tab.count !== undefined && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100">{tab.count}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
