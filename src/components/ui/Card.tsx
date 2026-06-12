import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover = false, padding = 'md' }) => {
  const paddings = { none: '', sm: 'p-3', md: 'p-4 md:p-5', lg: 'p-5 md:p-6' };
  return (
    <div onClick={onClick} className={`bg-white rounded-2xl shadow-sm border ${hover ? 'hover:shadow-lg hover:border-slate-200 cursor-pointer transition-all' : ''} ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
