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

const AfricanMotif = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="60,10 110,95 10,95" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" />
    <polygon points="60,28 92,83 28,83" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
    <polygon points="60,46 74,71 46,71" fill="currentColor" fillOpacity="0.15" />
    <line x1="60" y1="10" x2="60" y2="95" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
    <line x1="10" y1="95" x2="110" y2="95" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
  </svg>
);

const SoundWaves = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 160 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 70 Q80 10 140 70" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
    <path d="M35 70 Q80 25 125 70" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
    <path d="M50 70 Q80 40 110 70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" />
    <path d="M65 70 Q80 55 95 70" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.2" />
  </svg>
);

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

  const handleCreateProject = () => navigate(currentUser ? '/create-project' : '/login');

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1e35 0%, #1B2A4A 50%, #0f1e35 100%)' }}
      >
        {featured.map((p, i) => (
          <div key={p.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-20' : 'opacity-0'}`}>
            <img src={p.coverImage} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,30,53,0.95), rgba(27,42,74,0.8), rgba(15,30,53,0.95))' }} />

        {/* Cultural geometric decorations */}
        <AfricanMotif className="absolute top-16 left-6 md:left-16 w-24 md:w-36 text-[#D4940F] opacity-25 animate-float" />
        <AfricanMotif className="absolute bottom-20 right-6 md:right-16 w-20 md:w-28 text-[#2B6B8A] opacity-20 animate-float" style={{ animationDelay: '2s' } as React.CSSProperties} />
        <AfricanMotif className="absolute top-1/3 right-1/4 w-16 text-[#4A8C5C] opacity-15 hidden xl:block" />
        <SoundWaves className="absolute top-10 left-1/2 -translate-x-1/2 w-64 text-[#D4940F] opacity-20" />
        <SoundWaves className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 text-[#2B6B8A] opacity-15" />

        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(212,148,15,0.06)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(43,107,138,0.06)' }} />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="rounded-2xl px-6 py-3 inline-block shadow-2xl" style={{ background: '#F5F0E8' }}>
              <img src="/904e9292-1706-4a11-bb70-892f46fefe4b.jpg" alt="INING" className="h-20 md:h-28 w-auto object-contain" />
            </div>
          </div>

          {/* Slogan */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px" style={{ background: '#D4940F' }} />
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase" style={{ color: '#D4940F' }}>
              Crowdfunding · Communaute · Croissance
            </span>
            <span className="w-8 h-px" style={{ background: '#D4940F' }} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight max-w-5xl mx-auto">
            <span style={{ background: 'linear-gradient(to right, #D4940F, #f5b528, #D4940F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('home.title').split(' ').slice(0, 2).join(' ')}
            </span>
            <br className="hidden sm:block" />
            <span className="text-white">{t('home.title').split(' ').slice(2).join(' ')}</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link to="/explore">
              <Button size="lg" icon={ArrowRight} iconPosition="right">
                {t('home.exploreProjects')}
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={handleCreateProject} className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              {t('home.startProject')}
            </Button>
            {currentUser && isAdmin && (
              <Link to="/admin">
                <Button size="lg" variant="secondary" icon={Shield}>Admin</Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-3xl mx-auto">
            {[
              { icon: <Award className="w-7 h-7" style={{ color: '#D4940F' }} />, value: `${mockStats.totalProjects}+`, label: t('home.hero.stat1'), border: 'rgba(212,148,15,0.3)' },
              { icon: <TrendingUp className="w-7 h-7" style={{ color: '#4A8C5C' }} />, value: '2.45M', label: t('home.hero.stat2'), border: 'rgba(74,140,92,0.3)' },
              { icon: <Sparkles className="w-7 h-7" style={{ color: '#2B6B8A' }} />, value: `${mockStats.totalCreators}+`, label: t('home.hero.stat3'), border: 'rgba(43,107,138,0.3)' },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform" style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${s.border}` }}>
                  {s.icon}
                </div>
                <p className="text-2xl md:text-4xl font-bold text-white">{s.value}</p>
                <p className="text-xs md:text-sm text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {featured.slice(0, 4).map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-10' : 'w-2 hover:opacity-60'}`} style={{ background: i === currentSlide ? '#D4940F' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </section>

      {/* ── Slogan Banner ────────────────────────────────────────── */}
      <section className="py-8 pattern-tribal overflow-hidden" style={{ background: '#F5F0E8' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-12">
            {['Crowdfunding', 'Communaute', 'Croissance'].map((word, i) => (
              <div key={word} className="flex items-center gap-4 md:gap-8">
                <span className="text-xl md:text-3xl font-black tracking-wider uppercase" style={{ color: '#1B2A4A' }}>{word}</span>
                {i < 2 && <AfricanMotif className="w-7 md:w-10" style={{ color: '#D4940F' } as React.CSSProperties} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-kente opacity-40" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AfricanMotif className="w-8" style={{ color: '#D4940F' } as React.CSSProperties} />
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1B2A4A' }}>{t('home.categories.title')}</h2>
              <AfricanMotif className="w-8" style={{ color: '#2B6B8A' } as React.CSSProperties} />
            </div>
            <p className="text-slate-500 max-w-xl mx-auto">Explorez les projets dans differents domaines culturels</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
            {catIcons.map(c => (
              <Link key={c.id} to={`/explore?category=${c.id}`} className="group">
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-3 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                  <img src={c.img} alt={c.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 transition-colors duration-300" style={{ background: 'linear-gradient(to top, rgba(27,42,74,0.8), rgba(0,0,0,0.1), transparent)' }} />
                  <div className="absolute inset-0 flex items-end justify-center pb-3">
                    <span className="text-white font-semibold text-xs md:text-sm text-center px-1">{t(`home.categories.${c.id}`)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ background: 'linear-gradient(to bottom, #f8fafc, #fff)' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <AfricanMotif className="w-7" style={{ color: '#D4940F' } as React.CSSProperties} />
                <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#1B2A4A' }}>{t('home.featured.title')}</h2>
              </div>
              <p className="text-slate-500 mt-1">Decouvrez des projets inspirants avec un impact reel</p>
            </div>
            <Link to="/explore" className="flex items-center gap-2 font-semibold transition-colors group" style={{ color: '#D4940F' }}>
              <span className="hidden sm:inline">{t('home.featured.viewAll')}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      </section>

      {/* ── Trending ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 text-white relative overflow-hidden" style={{ background: '#1B2A4A' }}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #D4940F, #4A8C5C, #2B6B8A)' }} />
        <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #2B6B8A, #4A8C5C, #D4940F)' }} />
        <AfricanMotif className="absolute -top-8 -right-8 w-64 opacity-5" style={{ color: '#D4940F' } as React.CSSProperties} />
        <AfricanMotif className="absolute -bottom-8 -left-8 w-64 opacity-5" style={{ color: '#2B6B8A' } as React.CSSProperties} />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-wider" style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>
              <Sparkles className="w-3 h-3" /> Tendances
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">{t('home.trending.title')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trending.map((project, index) => {
              const percentage = Math.min((project.raisedAmount / project.goalAmount) * 100, 100);
              const rankColors = ['#D4940F', '#2B6B8A', '#4A8C5C'];
              return (
                <Card key={project.id} className="backdrop-blur-sm border-white/10 hover:border-white/30 transition-all group" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0">
                      <img src={project.coverImage} alt={project.title} className="w-20 h-20 rounded-xl object-cover" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: rankColors[index] }}>
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{project.category}</p>
                      <h3 className="font-semibold text-white mb-1 line-clamp-1 transition-colors group-hover:text-[#D4940F]">{project.title}</h3>
                      <p className="font-bold text-sm" style={{ color: '#D4940F' }}>{formatCurrency(project.raisedAmount)}</p>
                      <div className="mt-2">
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                          <div className="h-full rounded-full" style={{ width: `${percentage}%`, background: 'linear-gradient(to right, #D4940F, #f5b528)' }} />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{percentage.toFixed(0)}% finance</p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why INING ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: '#F5F0E8' }}>
        <div className="absolute inset-0 pattern-adinkra opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <SoundWaves className="w-20 mx-auto mb-4" style={{ color: '#D4940F' } as React.CSSProperties} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B2A4A' }}>Pourquoi choisir INING ?</h2>
            <p className="text-slate-600 max-w-xl mx-auto">La plateforme qui comprend la culture africaine et soutient les createurs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { color: '#D4940F', title: 'Crowdfunding', desc: 'Collectez des fonds facilement via Mobile Money, carte bancaire et d\'autres modes de paiement locaux.' },
              { color: '#2B6B8A', title: 'Communaute', desc: 'Rejoignez une communaute de createurs et de donateurs passionnes par la culture camerounaise et africaine.' },
              { color: '#4A8C5C', title: 'Croissance', desc: 'Developpez votre projet, touchez un plus large public et transformez vos idees en realisations concretes.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: item.color }}>
                  <AfricanMotif className="w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1B2A4A' }}>{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #D4940F, #C4622D, #D4940F)' }}>
        <div className="absolute inset-0 pattern-tribal opacity-10" />
        <div className="absolute top-8 left-8 w-32 h-32 opacity-20">
          <AfricanMotif className="w-full text-white" />
        </div>
        <div className="absolute bottom-8 right-8 w-24 h-24 opacity-20">
          <AfricanMotif className="w-full text-white" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <SoundWaves className="w-40 text-white mx-auto mb-6 opacity-60" />
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">{t('home.cta.subtitle')}</p>
          <p className="text-sm font-semibold tracking-[0.2em] text-white/70 uppercase mb-10">
            Crowdfunding · Communaute · Croissance
          </p>
          <Button size="lg" onClick={handleCreateProject} icon={Play} iconPosition="left" className="!bg-white !text-[#D4940F] hover:!bg-slate-100 shadow-2xl">
            {t('home.cta.button')}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
