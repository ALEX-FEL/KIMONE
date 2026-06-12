import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, max = 100, size = 'md', showLabel = false, className = '' }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const sizes = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500" style={{ width: `${percentage}%` }} />
      </div>
      {showLabel && <div className="flex justify-between mt-1 text-xs text-slate-500"><span>{percentage.toFixed(0)}%</span></div>}
    </div>
  );
};

export default Progress;
