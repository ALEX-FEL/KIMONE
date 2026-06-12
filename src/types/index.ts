export type Currency = 'FCFA' | 'EUR' | 'USD';
export type ProjectStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'active' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'successful' | 'failed';
export type PaymentMethod = 'orange_money' | 'mtn_momo' | 'paypal' | 'card';
export type KycStatus = 'pending' | 'approved' | 'rejected';
export type UserRole = 'user' | 'creator' | 'admin';
export type DisputeStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type Category = 'film' | 'music' | 'events' | 'arts' | 'theater' | 'literature';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  kycStatus: KycStatus;
  isVerified: boolean;
  createdAt: string;
  referralCode: string;
  referredBy?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  story: string;
  category: Category;
  status: ProjectStatus;
  creatorId: string;
  creator: User;
  coverImage: string;
  videoUrl?: string;
  goalAmount: number;
  currency: Currency;
  raisedAmount: number;
  backersCount: number;
  startDate: string;
  endDate: string;
  rewards: Reward[];
  budgetBreakdown: BudgetItem[];
  risks: string;
  timeline: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  isSaved?: boolean;
}

export interface Reward {
  id: string;
  projectId: string;
  title: string;
  description: string;
  minimumAmount: number;
  estimatedDelivery: string;
  quantity?: number;
  claimedCount: number;
  includes: string[];
}

export interface BudgetItem {
  label: string;
  amount: number;
  percentage: number;
}

export interface Donation {
  id: string;
  projectId: string;
  project: Project;
  userId: string;
  user: User;
  amount: number;
  currency: Currency;
  rewardId?: string;
  reward?: Reward;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  phoneNumber?: string;
  createdAt: string;
  isAnonymous: boolean;
}

export interface KycDocument {
  id: string;
  userId: string;
  user: User;
  documentType: 'id_card' | 'passport' | 'selfie';
  documentUrl: string;
  status: KycStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}

export interface Transaction {
  id: string;
  donationId?: string;
  userId: string;
  user: User;
  type: 'donation' | 'withdrawal' | 'refund';
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  reference: string;
}

export interface Dispute {
  id: string;
  donationId: string;
  donation: Donation;
  userId: string;
  user: User;
  reason: string;
  description: string;
  status: DisputeStatus;
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'donation' | 'project_approved' | 'project_rejected' | 'campaign_ending' | 'update_posted' | 'comment_reply' | 'kyc_approved' | 'kyc_rejected' | 'withdrawal';
  title: string;
  message: string;
  isRead: boolean;
  projectId?: string;
  createdAt: string;
}

export interface AdminLog {
  id: string;
  adminId: string;
  admin: User;
  action: 'login' | 'payment' | 'project' | 'user' | 'system';
  description: string;
  targetType?: string;
  targetId?: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  user: User;
  content: string;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
}

export interface Update {
  id: string;
  projectId: string;
  title: string;
  content: string;
  createdAt: string;
}
