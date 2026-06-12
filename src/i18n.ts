import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const fr = {
  translation: {
    "app.name": "INING",
    "app.tagline": "Financez la culture africaine",
    "nav.home": "Accueil", "nav.explore": "Explorer", "nav.create": "Creer", "nav.notifications": "Notifications", "nav.profile": "Profil", "nav.dashboard": "Tableau de bord", "nav.settings": "Parametres",
    "home.title": "Financez les projets culturels du Cameroun", "home.subtitle": "Decouvrez et soutenez des projets dans le cinema, la musique, les arts et les evenements culturels",
    "home.exploreProjects": "Explorer les projets", "home.startProject": "Lancer un projet",
    "home.hero.badge": "Plateforme de crowdfunding culturel",
    "home.categories.title": "Categories populaires",
    "home.categories.film": "Cinema", "home.categories.music": "Musique", "home.categories.events": "Evenements", "home.categories.arts": "Arts visuels", "home.categories.theater": "Theatre", "home.categories.literature": "Litterature",
    "home.featured.title": "Projets en vedette", "home.featured.viewAll": "Voir tout",
    "home.trending.title": "Tendances actuelles", "home.trending.hot": "Tres populaire",
    "home.stats.title": "Notre impact", "home.stats.projectsFunded": "Projets finances", "home.stats.totalRaised": "Total leve", "home.stats.creatorsSupported": "Createurs soutenus", "home.stats.successRate": "Taux de reussite",
    "home.cta.title": "Pret a lancer votre projet ?", "home.cta.subtitle": "Rejoignez des centaines de createurs qui ont realise leurs reves grace a INING", "home.cta.button": "Commencer maintenant",
    "project.create": "Creer un projet", "project.details": "Details du projet", "project.backProject": "Soutenir ce projet", "project.share": "Partager", "project.save": "Enregistrer",
    "project.progress.raised": "Recolte", "project.progress.goal": "Objectif", "project.progress.backers": "Contributeurs", "project.progress.daysLeft": "jours restants", "project.progress.funded": "finance",
    "project.status.draft": "Brouillon", "project.status.pending": "En attente", "project.status.approved": "Approuve", "project.status.rejected": "Rejete", "project.status.active": "Actif", "project.status.completed": "Termine", "project.status.cancelled": "Annule",
    "project.form.step1": "Informations de base", "project.form.step2": "Budget", "project.form.step3": "Recompenses", "project.form.step4": "Apercu",
    "project.form.next": "Suivant", "project.form.previous": "Precedent", "project.form.submit": "Soumettre",
    "project.form.title": "Titre du projet", "project.form.titlePlaceholder": "Ex: Mon film documentaire sur Douala",
    "project.form.category": "Categorie", "project.form.selectCategory": "Selectionner une categorie",
    "project.form.description": "Description", "project.form.descriptionPlaceholder": "Decrivez votre projet en detail...",
    "project.form.goalAmount": "Objectif de financement", "project.form.goalPlaceholder": "Ex: 5000000",
    "project.form.currency": "Devise", "project.form.duration": "Duree de la campagne", "project.form.durationUnit": "jours",
    "project.form.story": "Votre histoire", "project.form.risks": "Defis et risques", "project.form.timeline": "Calendrier",
    "project.rewards.title": "Niveaux de recompenses", "project.rewards.add": "Ajouter une recompense", "project.rewards.minimumAmount": "Montant minimum",
    "project.comments.title": "Commentaires", "project.comments.placeholder": "Partagez vos thoughts...", "project.comments.post": "Publier", "project.comments.none": "Soyez le premier a commenter !",
    "project.donors.title": "Contributeurs recents", "project.donors.anonymous": "Donateur anonyme",
    "donate.title": "Faire un don", "donate.selectAmount": "Choisir un montant", "donate.custom": "Montant personnalise", "donate.paymentMethod": "Mode de paiement", "donate.total": "Total", "donate.continue": "Continuer", "donate.success": "Don reussi !", "donate.pending": "Paiement en cours...", "donate.failed": "Echec du paiement",
    "payment.orangeMoney": "Orange Money", "payment.mtnMoMo": "MTN Mobile Money", "payment.card": "Carte bancaire", "payment.phoneNumber": "Numero de telephone", "payment.phonePlaceholder": "Ex: 6 XX XX XX XX",
    "auth.login": "Connexion", "auth.register": "Inscription", "auth.logout": "Deconnexion", "auth.forgotPassword": "Mot de passe oublie ?", "auth.email": "Adresse email", "auth.phone": "Telephone", "auth.password": "Mot de passe", "auth.loginButton": "Se connecter", "auth.registerButton": "S'inscrire", "auth.noAccount": "Pas encore de compte ?", "auth.hasAccount": "Deja un compte ?", "auth.signup": "S'inscrire", "auth.signin": "Se connecter",
    "dashboard.creator.title": "Tableau de bord createur", "dashboard.creator.myProjects": "Mes projets", "dashboard.creator.views": "Vues", "dashboard.creator.fundsRaised": "Fonds leves", "dashboard.creator.backers": "Contributeurs", "dashboard.creator.createProject": "Creer un nouveau projet", "dashboard.creator.noProjects": "Vous n'avez pas encore de projets",
    "admin.dashboard": "Tableau de bord Admin", "admin.users": "Utilisateurs", "admin.projects": "Projets", "admin.kyc": "Verification KYC", "admin.payments": "Paiements", "admin.disputes": "Litiges", "admin.logs": "Journal d'activite",
    "admin.overview.totalUsers": "Utilisateurs totaux", "admin.overview.activeProjects": "Projets actifs", "admin.overview.totalRevenue": "Revenus totaux", "admin.overview.pendingKyc": "KYC en attente",
    "admin.users.title": "Gestion des utilisateurs", "admin.users.search": "Rechercher un utilisateur...",
    "admin.kyc.title": "Verification KYC", "admin.kyc.pending": "En attente de verification", "admin.kyc.approved": "Approuves", "admin.kyc.rejected": "Rejetes", "admin.kyc.review": "Examiner", "admin.kyc.actions.approve": "Approuver", "admin.kyc.actions.reject": "Rejeter",
    "admin.projects.title": "Moderation des projets", "admin.projects.pending": "En attente", "admin.projects.approved": "Approuves", "admin.projects.rejected": "Rejetes", "admin.projects.all": "Tous",
    "admin.payments.title": "Suivi des paiements", "admin.disputes.title": "Centre des litiges", "admin.logs.title": "Journal d'activite",
    "notification.title": "Notifications", "notification.markRead": "Marquer comme lu", "notification.none": "Aucune notification",
    "currency.fcfa": "FCFA", "currency.eur": "EUR", "currency.usd": "USD",
    "pagination.previous": "Precedent", "pagination.next": "Suivant", "pagination.showing": "Affichage", "pagination.to": "a", "pagination.entries": "entrees",
    "search.placeholder": "Rechercher des projets...", "search.filter": "Filtres", "search.sort": "Trier par", "search.all": "Tous", "search.newest": "Plus recent", "search.popular": "Populaire", "search.endingSoon": "Se termine bientot", "search.mostFunded": "Plus finances", "search.results": "resultats",
    "common.loading": "Chargement...", "common.error": "Une erreur s'est produite", "common.back": "Retour", "common.continue": "Continuer", "common.cancel": "Annuler", "common.close": "Fermer"
  }
};

const en = {
  translation: {
    "app.name": "INING",
    "app.tagline": "Finance African culture",
    "nav.home": "Home", "nav.explore": "Explore", "nav.create": "Create", "nav.notifications": "Notifications", "nav.profile": "Profile", "nav.dashboard": "Dashboard", "nav.settings": "Settings",
    "home.title": "Fund Cameroon's Cultural Projects", "home.subtitle": "Discover and support projects in film, music, arts, and cultural events",
    "home.exploreProjects": "Explore Projects", "home.startProject": "Start a Project",
    "home.hero.badge": "Cultural crowdfunding platform",
    "home.categories.title": "Popular Categories",
    "home.categories.film": "Film", "home.categories.music": "Music", "home.categories.events": "Events", "home.categories.arts": "Visual Arts", "home.categories.theater": "Theater", "home.categories.literature": "Literature",
    "home.featured.title": "Featured Projects", "home.featured.viewAll": "View All",
    "home.trending.title": "Trending Now", "home.trending.hot": "Very Popular",
    "home.stats.title": "Our Impact", "home.stats.projectsFunded": "Projects Funded", "home.stats.totalRaised": "Total Raised", "home.stats.creatorsSupported": "Creators Supported", "home.stats.successRate": "Success Rate",
    "home.cta.title": "Ready to launch your project?", "home.cta.subtitle": "Join hundreds of creators who have made their dreams come true with INING", "home.cta.button": "Get Started Now",
    "project.create": "Create Project", "project.details": "Project Details", "project.backProject": "Back this Project", "project.share": "Share", "project.save": "Save",
    "project.progress.raised": "Raised", "project.progress.goal": "Goal", "project.progress.backers": "Backers", "project.progress.daysLeft": "days left", "project.progress.funded": "funded",
    "project.status.draft": "Draft", "project.status.pending": "Pending", "project.status.approved": "Approved", "project.status.rejected": "Rejected", "project.status.active": "Active", "project.status.completed": "Completed", "project.status.cancelled": "Cancelled",
    "project.form.step1": "Basic Info", "project.form.step2": "Budget", "project.form.step3": "Rewards", "project.form.step4": "Preview",
    "project.form.next": "Next", "project.form.previous": "Previous", "project.form.submit": "Submit",
    "project.rewards.title": "Reward Tiers", "project.rewards.add": "Add Reward",
    "project.comments.title": "Comments", "project.comments.placeholder": "Share your thoughts...", "project.comments.post": "Post",
    "donate.title": "Make a Donation", "donate.selectAmount": "Select Amount", "donate.total": "Total", "donate.continue": "Continue", "donate.success": "Donation Successful!",
    "payment.orangeMoney": "Orange Money", "payment.mtnMoMo": "MTN Mobile Money", "payment.card": "Credit Card",
    "auth.login": "Login", "auth.register": "Sign Up", "auth.logout": "Logout", "auth.email": "Email Address", "auth.phone": "Phone", "auth.password": "Password", "auth.loginButton": "Sign In",
    "admin.dashboard": "Admin Dashboard", "admin.users": "Users", "admin.projects": "Projects", "admin.kyc": "KYC Verification", "admin.payments": "Payments", "admin.disputes": "Disputes", "admin.logs": "Activity Logs",
    "admin.overview.totalUsers": "Total Users", "admin.overview.activeProjects": "Active Projects", "admin.overview.totalRevenue": "Total Revenue",
    "common.loading": "Loading...", "common.back": "Back", "common.cancel": "Cancel", "common.close": "Close"
  }
};

const savedLanguage = localStorage.getItem('ining-language') || 'fr';

i18n.use(initReactI18next).init({
  resources: { fr, en },
  lng: savedLanguage,
  fallbackLng: 'fr',
  interpolation: { escapeValue: false }
});

i18n.on('languageChanged', (lng) => localStorage.setItem('ining-language', lng));

export const formatCurrency = (amount: number, currency: string = 'FCFA'): string => {
  const lang = i18n.language || 'fr';
  if (currency === 'FCFA') return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US').format(amount) + ' FCFA';
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return 'Just now';
};

export default i18n;
