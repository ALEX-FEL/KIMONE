import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, TrendingUp, Shield, Award, ChevronRight, Play, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProjectCard from '../components/layout/ProjectCard';
import Footer from '../components/layout/Footer';
import { mockProjects, mockStats } from '../data/mockData';
import { formatCurrency } from '../i18n';
import { Category } from '../types';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser, isAdmin } = useApp();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const featured = mockProjects.filter(p => p.status === 'active').slice(0, 4);
  const trending = mockProjects.filter(p => p.status === 'active').sort((a, b) => b.views - a.views).slice(0, 3);

  const catIcons: { id: Category; img: string }[] = [
    { id: 'film', img: 'https://images.pexels.com/photos/2873786/pexels-photo-2873786.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'music', img: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'events', img: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'arts', img: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'theater', img: 'https://images.pexels.com/photos/167492/pexels-photo-167492.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'literature', img: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=200' }
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide(p => (p + 1) % featured.length), 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  const handleCreateProject = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/create-project');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0">
          {featured.map((p, i) => (
            <div key={p.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-30' : 'opacity-0'}`}>
              <img src={p.coverImage} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95" />

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-amber-500/30">
            <Sparkles className="w-4 h-4" />
            {t('home.hero.badge')}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight max-w-5xl mx-auto">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">{t('home.title').split(' ').slice(0, 2).join(' ')}</span>
            <br className="hidden sm:block" />
            <span className="text-white">{t('home.title').split(' ').slice(2).join(' ')}</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/explore">
              <Button size="lg" icon={ArrowRight} iconPosition="right" className="shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow">
                {t('home.exploreProjects')}
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={handleCreateProject} className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              {t('home.startProject')}
            </Button>
            {currentUser && isAdmin && (
              <Link to="/admin">
                <Button size="lg" variant="secondary" icon={Shield}>
                  Admin
                </Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white">{mockStats.totalProjects}+</p>
              <p className="text-sm text-slate-400">{t('home.hero.stat1')}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white">2.45</p>
              <p className="text-sm text-slate-400">{t('home.hero.stat2')}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-white">{mockStats.totalCreators}+</p>
              <p className="text-sm text-slate-400">{t('home.hero.stat3')}</p>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {featured.slice(0, 4).map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-10 bg-amber-500' : 'w-2 bg-white/40 hover:bg-white/60'}`} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t('home.categories.title')}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Explore projects across different creative domains</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {catIcons.map(c => (
              <Link key={c.id} to={`/explore?category=${c.id}`} className="group">
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-3 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <img src={c.img} alt={c.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-amber-900/70 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-end justify-center pb-4">
                    <span className="text-white font-semibold text-sm md:text-base">{t(`home.categories.${c.id}`)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{t('home.featured.title')}</h2>
              <p className="text-slate-500 mt-2">Discover inspiring projects making an impact</p>
            </div>
            <Link to="/explore" className="flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors group">
              <span className="hidden sm:inline">{t('home.featured.viewAll')}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Hot
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">{t('home.trending.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trending.map((project, index) => {
              const percentage = (project.raisedAmount / project.goalAmount) * 100;
              return (
                <Card key={project.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-amber-500/50 transition-all group">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img src={project.coverImage} alt={project.title} className="w-20 h-20 rounded-xl object-cover" />
                      {index === 0 && (
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{project.category}</p>
                      <h3 className="font-semibold text-white mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">{project.title}</h3>
                      <p className="text-amber-400 font-bold">{formatCurrency(project.raisedAmount)}</p>
                      <div className="mt-2">
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{percentage.toFixed(0)}% funded</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">{t('home.cta.subtitle')}</p>
          <Button size="lg" onClick={handleCreateProject} icon={Play} iconPosition="left" className="bg-white text-amber-600 hover:bg-slate-100 shadow-2xl">
            {t('home.cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
