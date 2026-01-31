export type UserRole = 'student' | 'admin' | 'caretaker';

export type IssueStatus = 'pending' | 'in-progress' | 'resolved' | 'closed' | 'emergency';

export type IssueCategory = 
  | 'electrical' 
  | 'plumbing' 
  | 'furniture' 
  | 'cleaning' 
  | 'internet' 
  | 'security' 
  | 'other';

export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hostel?: string;
  block?: string;
  room?: string;
  avatar?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  isPublic: boolean;
  hostel: string;
  block: string;
  room: string;
  images: string[];
  reportedBy: User;
  assignedTo?: User;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetHostel?: string;
  targetBlock?: string;
  createdBy: User;
  createdAt: Date;
  isActive: boolean;
}

export interface AnalyticsData {
  issuesByCategory: { category: string; count: number }[];
  resolvedVsPending: { status: string; count: number }[];
  responseTime: { date: string; avgTime: number }[];
  totalIssues: number;
  resolvedIssues: number;
  pendingIssues: number;
  avgResponseTime: number;
}
