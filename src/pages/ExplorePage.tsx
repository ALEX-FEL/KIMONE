import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, LayoutGrid, List } from 'lucide-react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Pagination from '../components/ui/Pagination';
import ProjectCard from '../components/layout/ProjectCard';
import { mockProjects } from '../data/mockData';

const ExplorePage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const pageSize = 8;

  const categories = [{ value: '', label: t('search.all') }, { value: 'film', label: t('home.categories.film') }, { value: 'music', label: t('home.categories.music') }, { value: 'events', label: t('home.categories.events') }, { value: 'arts', label: t('home.categories.arts') }, { value: 'theater', label: t('home.categories.theater') }, { value: 'literature', label: t('home.categories.literature') }];
  const sortOptions = [{ value: 'newest', label: t('search.newest') }, { value: 'popular', label: t('search.popular') }, { value: 'mostFunded', label: t('search.mostFunded') }];

  const filtered = useMemo(() => {
    let projects = mockProjects.filter(p => p.status === 'active');
    if (search) projects = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (category) projects = projects.filter(p => p.category === category);
    if (sortBy === 'popular') projects.sort((a, b) => b.views - a.views);
    else if (sortBy === 'mostFunded') projects.sort((a, b) => b.raisedAmount - a.raisedAmount);
    return projects;
  }, [search, category, sortBy]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">{t('nav.explore')}</h1>
        <div className="bg-white rounded-2xl p-4 md:p-6 mb-6 shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1"><Input placeholder={t('search.placeholder')} value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} icon={Search} /></div>
            <Select value={category} onChange={e => { setCategory(e.target.value); setCurrentPage(1); }} options={categories} className="min-w-[150px]" />
            <Select value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }} options={sortOptions} className="min-w-[150px]" />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4"><p className="text-slate-600"><span className="font-semibold">{filtered.length}</span> {t('search.results')}</p><div className="flex items-center gap-2"><button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-slate-400'}`}><LayoutGrid className="w-5 h-5" /></button><button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-slate-400'}`}><List className="w-5 h-5" /></button></div></div>
        {paginated.length > 0 ? (viewMode === 'grid' ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{paginated.map(p => <ProjectCard key={p.id} project={p} />)}</div>) : (<div className="space-y-4">{paginated.map(p => <ProjectCard key={p.id} project={p} variant="horizontal" />)}</div>)) : (<div className="text-center py-12"><p className="text-slate-500">{t('empty.projects')}</p></div>)}
        {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} />}
      </div>
    </div>
  );
};

export default ExplorePage;
