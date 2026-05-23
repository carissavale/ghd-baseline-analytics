// Core entity types — match Supabase schema in supabase/migrations/

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'investor';
  created_at: string;
  updated_at: string;
}

// Meetings — V4 category palette (investor/advisory/strategy/board)
export type MeetingCategory = 'investor' | 'advisory' | 'strategy' | 'board';

export interface Meeting {
  id: string;
  title: string;
  meeting_date: string;
  category: MeetingCategory;
  summary: string;
  content: string;
  attendees: string[] | null;
  organization_name: string | null;
  organization_initial: string | null;
  logo_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export const MEETING_CATEGORY_LABELS: Record<MeetingCategory, string> = {
  investor: 'Investor',
  advisory: 'Advisory',
  strategy: 'Strategy',
  board: 'Board',
};

// Rolling summary block at top of Meetings page
export interface CycleSummary {
  id: string;
  content: string;
  last_updated: string;
  updated_by: string | null;
}

// Deal Intel comparables
export type DealType = 'Acquisition' | 'IPO' | 'Contract' | 'Equity+License' | 'Partnership' | 'Projected';

export interface Deal {
  id: string;
  name: string;
  value_amount: number;
  value_unit: string;
  deal_year: number;
  deal_type: DealType;
  note: string | null;
  is_highlight: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Vault documents
export interface Document {
  id: string;
  name: string;
  description: string | null;
  category: string;
  file_path: string;
  file_type: string | null;
  pages: string | null;
  uploaded_at: string;
  uploaded_by: string | null;
}

// IAB members
export type IABStatus = 'active' | 'pending' | 'upcoming_offer';

export interface IABMember {
  id: string;
  name: string;
  affiliation: string;
  description: string | null;
  initials: string;
  status: IABStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Milestones
export type MilestoneStatus = 'planned' | 'in_progress' | 'completed';

export interface Milestone {
  id: string;
  title: string;
  description: string | null;
  target_date: string;
  status: MilestoneStatus;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Audit log — track admin actions
export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}
