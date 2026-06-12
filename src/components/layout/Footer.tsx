import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.explore'), path: '/explore' },
    { label: t('project.create'), path: '/create-project' },
    { label: t('nav.notifications'), path: '/notifications' },
    { label: t('nav.profile'), path: '/profile' },
  ];

  const projectLinks = [
    { label: t('home.categories.film'), path: '/explore?category=film' },
    { label: t('home.categories.music'), path: '/explore?category=music' },
    { label: t('home.categories.events'), path: '/explore?category=events' },
    { label: t('home.categories.arts'), path: '/explore?category=arts' },
    { label: t('home.categories.theater'), path: '/explore?category=theater' },
    { label: t('home.categories.literature'), path: '/explore?category=literature' },
  ];

  const supportLinks = [
    { label: 'Centre d\'aide', path: '/help' },
    { label: 'Contactez-nous', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Conditions d\'utilisation', path: '/terms' },
    { label: 'Politique de confidentialite', path: '/privacy' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">INING</span>
                <p className="text-xs text-slate-400">{t('app.tagline')}</p>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              La premiere plateforme de crowdfunding culturel au Cameroun.
              Financez et soutenez des projets dans le cinema, la musique, les arts et les evenements culturels.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-amber-500" />
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-amber-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-amber-500" />
              Categories
            </h4>
            <ul className="space-y-3">
              {projectLinks.slice(0, 5).map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-amber-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-amber-500" />
              Contactez-nous
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <a href="mailto:contact@ining.cm" className="text-white hover:text-amber-400 transition-colors">contact@ining.cm</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Telephone</p>
                  <a href="tel:+237690000000" className="text-white hover:text-amber-400 transition-colors">+237 6 90 00 00 00</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Adresse</p>
                  <p className="text-white">Douala, Cameroun</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Pret a lancer votre projet ?</h4>
            <p className="text-slate-400">Rejoignez nos createurs et financez vos idees culturelles</p>
          </div>
          <Link to="/create-project" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all whitespace-nowrap">
            Creer un projet
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p className="flex items-center gap-2">
              © 2024 INING. Fait avec <Heart className="w-4 h-4 text-red-500 fill-current" /> au Cameroun
            </p>
            <div className="flex gap-6">
              {supportLinks.slice(3).map(link => (
                <Link key={link.path} to={link.path} className="hover:text-amber-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
