import React, { useState } from 'react';
import { User } from 'lucide-react';

interface AvatarProps { src?: string; name?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; }

const Avatar: React.FC<AvatarProps> = ({ src, name = '', size = 'md', className = '' }) => {
  const [error, setError] = useState(false);
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' };

  if (src && !error) return <img src={src} onError={() => setError(true)} className={`${sizes[size]} rounded-full object-cover ${className}`} alt="" />;
  if (name) {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    return <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold ${className}`}>{initials}</div>;
  }
  return <div className={`${sizes[size]} rounded-full bg-slate-200 flex items-center justify-center ${className}`}><User className="w-1/2 h-1/2 text-slate-400" /></div>;
};

export default Avatar;
