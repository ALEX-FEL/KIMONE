import { User, Project, Donation, Transaction, KycDocument, AdminLog, Notification } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', email: 'jean.pierre@email.com', fullName: 'Jean-Pierre Nkolo', phone: '+237 6 99 12 34 56', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'creator', kycStatus: 'approved', isVerified: true, createdAt: '2024-01-15', referralCode: 'INK8X92P' },
  { id: 'u2', email: 'marie.ngono@email.com', fullName: 'Marie Ngono', phone: '+237 6 77 89 01 23', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'creator', kycStatus: 'approved', isVerified: true, createdAt: '2024-02-20', referralCode: 'INK7W21M' },
  { id: 'u3', email: 'paul.atos@email.com', fullName: 'Paul Atos', phone: '+237 6 55 67 89 01', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'user', kycStatus: 'pending', isVerified: false, createdAt: '2024-03-10', referralCode: 'INK3P45A' },
  { id: 'u4', email: 'claire.mbida@email.com', fullName: 'Claire Mbida', phone: '+237 6 11 22 33 44', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'creator', kycStatus: 'approved', isVerified: true, createdAt: '2024-01-05', referralCode: 'INK4C88M' },
  { id: 'u8', email: 'admin@ining.cm', fullName: 'Admin INING', phone: '+237 6 00 00 00 00', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', role: 'admin', kycStatus: 'approved', isVerified: true, createdAt: '2023-01-01', referralCode: 'INKADMIN1' },
];

const budgetBreakdown = [{ label: 'Production', amount: 0, percentage: 40 }, { label: 'Marketing', amount: 0, percentage: 25 }, { label: 'Logistique', amount: 0, percentage: 15 }, { label: 'Equipe', amount: 0, percentage: 12 }, { label: 'Imprevus', amount: 0, percentage: 8 }];

export const mockProjects: Project[] = [
  {
    id: 'p1', title: 'Documentaire: Les Voix de Douala', description: 'Un documentaire qui explore la scene musicale underground de Douala.', story: 'Douala, la capitale economique du Cameroun, est un creuset culturel exceptionnel.', category: 'film', status: 'active', creatorId: 'u1', creator: mockUsers[0],
    coverImage: 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=800', videoUrl: 'https://www.youtube.com/placeholder',
    goalAmount: 5000000, currency: 'FCFA', raisedAmount: 3850000, backersCount: 127, startDate: '2024-03-01', endDate: '2024-07-15',
    rewards: [
      { id: 'r1', projectId: 'p1', title: 'Remerciements', description: 'Votre nom dans les credits du film', minimumAmount: 5000, estimatedDelivery: '2024-08-01', claimedCount: 45, includes: ['Nom dans les credits'] },
      { id: 'r2', projectId: 'p1', title: 'DVD Signe', description: 'Copie du DVD signee par le realisateur', minimumAmount: 25000, estimatedDelivery: '2024-08-15', quantity: 50, claimedCount: 32, includes: ['DVD signe', 'Bonus'] },
    ],
    budgetBreakdown, risks: 'Le principal defi est l\'acces a certains quartiers.', timeline: 'Tournage: Mai-Juin 2024 | Sortie: Octobre 2024', views: 3420, createdAt: '2024-02-15', updatedAt: '2024-05-01'
  },
  {
    id: 'p2', title: 'Album: Afrobeats Cameroun Volume 1', description: 'Premier album studio fusionnant l\'afrobeats nigirian avec le bikutsi camerounais.', story: 'N\'ayant grandi entre deux cultures.', category: 'music', status: 'active', creatorId: 'u2', creator: mockUsers[1],
    coverImage: 'https://images.pexels.com/photos/257923/pexels-photo-257923.jpeg?auto=compress&cs=tinysrgb&w=800',
    goalAmount: 8000000, currency: 'FCFA', raisedAmount: 6200000, backersCount: 234, startDate: '2024-02-15', endDate: '2024-06-30',
    rewards: [
      { id: 'r3', projectId: 'p2', title: 'Fan', description: 'Telechargement digital de l\'album', minimumAmount: 3000, estimatedDelivery: '2024-08-01', claimedCount: 89, includes: ['Album digital'] },
      { id: 'r4', projectId: 'p2', title: 'Collector', description: 'CD + Poster + T-shirt', minimumAmount: 35000, estimatedDelivery: '2024-08-15', quantity: 100, claimedCount: 67, includes: ['CD physique', 'Poster'] },
    ],
    budgetBreakdown, risks: '', timeline: '', views: 5680, createdAt: '2024-01-20', updatedAt: '2024-04-28'
  },
  {
    id: 'p3', title: 'Festival Culturel de Bafoussam 2024', description: 'Le plus grand festival culturel de l\'Ouest Cameroun.', story: 'Apres le succes de l\'edition 2023.', category: 'events', status: 'active', creatorId: 'u1', creator: mockUsers[0],
    coverImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    goalAmount: 15000000, currency: 'FCFA', raisedAmount: 12400000, backersCount: 412, startDate: '2024-04-01', endDate: '2024-08-15',
    rewards: [
      { id: 'r5', projectId: 'p3', title: 'Pass Jour', description: 'Acces pour 1 jour du festival', minimumAmount: 5000, estimatedDelivery: '2024-08-20', claimedCount: 156, includes: ['Acces 1 jour'] },
    ],
    budgetBreakdown, risks: '', timeline: '', views: 8920, createdAt: '2024-03-01', updatedAt: '2024-05-05'
  },
  {
    id: 'p4', title: 'Exposition: Nouveaux Regards sur Douala', description: 'Exposition d\'art contemporain.', story: 'L\'art doit etre accessible.', category: 'arts', status: 'active', creatorId: 'u4', creator: mockUsers[3],
    coverImage: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=800',
    goalAmount: 3500000, currency: 'FCFA', raisedAmount: 2100000, backersCount: 78, startDate: '2024-05-01', endDate: '2024-09-30',
    rewards: [], budgetBreakdown, risks: '', timeline: '', views: 2150, createdAt: '2024-04-10', updatedAt: '2024-04-25'
  },
  {
    id: 'p5', title: 'Spectacle: Bantoue en Scene', description: 'Piece de theatre contemporain.', story: 'Le theatre camerounais a tant a dire.', category: 'theater', status: 'active', creatorId: 'u2', creator: mockUsers[1],
    coverImage: 'https://images.pexels.com/photos/167492/pexels-photo-167492.jpeg?auto=compress&cs=tinysrgb&w=800',
    goalAmount: 2500000, currency: 'FCFA', raisedAmount: 1800000, backersCount: 94, startDate: '2024-04-15', endDate: '2024-08-31',
    rewards: [], budgetBreakdown, risks: '', timeline: '', views: 1890, createdAt: '2024-03-25', updatedAt: '2024-05-02'
  },
  {
    id: 'p6', title: 'Roman: Memoires d\'un Village Bamilike', description: 'Roman historique.', story: 'Mon grand-pere m\'a raconte ces histoires.', category: 'literature', status: 'active', creatorId: 'u3', creator: mockUsers[2],
    coverImage: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=800',
    goalAmount: 1500000, currency: 'FCFA', raisedAmount: 980000, backersCount: 67, startDate: '2024-05-15', endDate: '2024-10-15',
    rewards: [], budgetBreakdown, risks: '', timeline: '', views: 1340, createdAt: '2024-04-20', updatedAt: '2024-05-03'
  },
  {
    id: 'p7', title: 'Court-Metrage: Yaounde la Belle', description: 'Court-metrage poetique sur Yaounde.', story: 'Yaounde ne dort jamais.', category: 'film', status: 'pending', creatorId: 'u4', creator: mockUsers[3],
    coverImage: 'https://images.pexels.com/photos/1114690/pexels-photo-1114690.jpeg?auto=compress&cs=tinysrgb&w=800',
    goalAmount: 2000000, currency: 'FCFA', raisedAmount: 0, backersCount: 0, startDate: '2024-06-01', endDate: '2024-10-01',
    rewards: [], budgetBreakdown, risks: '', timeline: '', views: 0, createdAt: '2024-05-10', updatedAt: '2024-05-10'
  },
  {
    id: 'p8', title: 'EP: Gospel Fusion', description: 'EP de 6 titres.', story: 'La foi et la musique.', category: 'music', status: 'active', creatorId: 'u2', creator: mockUsers[1],
    coverImage: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=800',
    goalAmount: 3000000, currency: 'FCFA', raisedAmount: 2450000, backersCount: 189, startDate: '2024-04-01', endDate: '2024-07-31',
    rewards: [], budgetBreakdown, risks: '', timeline: '', views: 4560, createdAt: '2024-03-15', updatedAt: '2024-05-01'
  },
];

export const mockDonations: Donation[] = [
  { id: 'd1', projectId: 'p1', project: mockProjects[0], userId: 'u3', user: mockUsers[2], amount: 50000, currency: 'FCFA', paymentMethod: 'orange_money', paymentStatus: 'successful', phoneNumber: '+237 6 55 67 89 01', createdAt: '2024-05-01', isAnonymous: false },
  { id: 'd2', projectId: 'p2', project: mockProjects[1], userId: 'u4', user: mockUsers[3], amount: 35000, currency: 'FCFA', paymentMethod: 'mtn_momo', paymentStatus: 'successful', phoneNumber: '+237 6 11 22 33 44', createdAt: '2024-04-28', isAnonymous: false },
  { id: 'd3', projectId: 'p3', project: mockProjects[2], userId: 'u1', user: mockUsers[0], amount: 75000, currency: 'FCFA', paymentMethod: 'orange_money', paymentStatus: 'successful', createdAt: '2024-04-25', isAnonymous: false },
];

export const mockTransactions: Transaction[] = [
  { id: 'tx1', donationId: 'd1', userId: 'u3', user: mockUsers[2], type: 'donation', amount: 50000, currency: 'FCFA', paymentMethod: 'orange_money', status: 'successful', createdAt: '2024-05-01', reference: 'ORN-001' },
  { id: 'tx2', userId: 'u1', user: mockUsers[0], type: 'withdrawal', amount: 2000000, currency: 'FCFA', paymentMethod: 'orange_money', status: 'successful', createdAt: '2024-04-15', reference: 'WTH-001' },
];

export const mockKycDocuments: KycDocument[] = [
  { id: 'kyc1', userId: 'u3', user: mockUsers[2], documentType: 'id_card', documentUrl: '/kyc/id.jpg', status: 'pending', submittedAt: '2024-05-01' },
];

export const mockAdminLogs: AdminLog[] = [
  { id: 'log1', adminId: 'u8', admin: mockUsers[4], action: 'login', description: 'Admin connected', createdAt: new Date().toISOString() },
];

export const mockDisputes: { id: string; donationId: string; donation: Donation; userId: string; user: User; reason: string; description: string; status: string; createdAt: string }[] = [
  { id: 'disp1', donationId: 'd1', donation: mockDonations[0], userId: 'u3', user: mockUsers[2], reason: 'Transaction issue', description: 'Payment deducted but not reflected', status: 'open', createdAt: '2024-05-01' },
  { id: 'disp2', donationId: 'd2', donation: mockDonations[1], userId: 'u4', user: mockUsers[3], reason: 'Pending too long', description: 'Payment stuck for hours', status: 'in_progress', createdAt: '2024-05-02' }
];

export const mockStats = { totalProjects: 156, totalRaised: 2450000000, totalCreators: 892, successRate: 78 };
