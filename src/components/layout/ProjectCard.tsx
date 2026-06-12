import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Users, Heart } from 'lucide-react';
import { Project } from '../../types';
import { formatCurrency } from '../../i18n';
import Progress from '../ui/Progress';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { useApp } from '../../context/AppContext';

interface ProjectCardProps { project: Project; variant?: 'default' | 'horizontal'; }

const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'default' }) => {
  const { t } = useTranslation();
  const { toggleSaveProject, isProjectSaved } = useApp();
  const saved = isProjectSaved(project.id);
  const percentage = (project.raisedAmount / project.goalAmount) * 100;
  const daysLeft = Math.max(0, Math.ceil((new Date(project.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const catLabels: Record<string, string> = { film: 'home.categories.film', music: 'home.categories.music', events: 'home.categories.events', arts: 'home.categories.arts', theater: 'home.categories.theater', literature: 'home.categories.literature' };

  if (variant === 'horizontal') {
    return (
      <Link to={`/projects/${project.id}`} className="flex bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all group">
        <div className="w-32 md:w-48 flex-shrink-0 relative overflow-hidden">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        </div>
        <div className="flex-1 p-4">
          <Badge size="sm" className="mb-2">{t(catLabels[project.category])}</Badge>
          <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">{project.title}</h3>
          <div className="flex items-center gap-2 mb-2"><Avatar src={project.creator.avatar} name={project.creator.fullName} size="sm" /><span className="text-sm text-slate-500">{project.creator.fullName}</span></div>
          <Progress value={percentage} size="sm" className="mb-2" />
          <div className="flex justify-between text-xs text-slate-500"><span className="font-semibold text-amber-600">{formatCurrency(project.raisedAmount)}</span><span>{percentage.toFixed(0)}% {t('project.progress.funded')}</span></div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/projects/${project.id}`} className="block bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative aspect-video overflow-hidden">
        <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        <div className="absolute top-3 left-3"><Badge size="sm">{t(catLabels[project.category])}</Badge></div>
        <button onClick={e => { e.preventDefault(); toggleSaveProject(project.id); }} className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm ${saved ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white'}`}><Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} /></button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2"><Avatar src={project.creator.avatar} name={project.creator.fullName} size="sm" /><span className="text-sm text-slate-500">{project.creator.fullName}</span></div>
        <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2 group-hover:text-amber-600">{project.title}</h3>
        <Progress value={percentage} size="md" className="mb-3" />
        <div className="flex justify-between items-center text-sm">
          <div><p className="font-semibold">{formatCurrency(project.raisedAmount)}</p><p className="text-xs text-slate-500">{t('project.progress.goal')}: {formatCurrency(project.goalAmount)}</p></div>
          <div className="text-right"><p className="font-semibold text-amber-600">{percentage.toFixed(0)}%</p><div className="flex items-center gap-1 text-xs text-slate-500"><Clock className="w-3 h-3" /><span>{daysLeft} {t('project.progress.daysLeft')}</span></div></div>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t text-xs text-slate-500"><Users className="w-3.5 h-3.5" /><span>{project.backersCount} {t('project.progress.backers')}</span></div>
      </div>
    </Link>
  );
};

export default ProjectCard;
