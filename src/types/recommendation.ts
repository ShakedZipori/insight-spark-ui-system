
export type UrgencyLevel = 'low' | 'medium' | 'critical';
export type SourceType = 'Rule Engine' | 'AI Model';
export type TagType = 'Performance' | 'Cost' | 'Security' | 'Compliance' | 'Optimization';
export type StatusType = 'Pending' | 'Resolved' | 'Ignored';
export type TeamType = 'DevOps' | 'Infrastructure' | 'Security' | 'Data' | 'All Teams';
export type WalletType = 'Production' | 'Development' | 'Testing' | 'Shared Services';
export type ActionType = 'Resize' | 'Shutdown' | 'Upgrade' | 'Reconfigure' | 'Alert';

// New addition: RuleType to distinguish between AI and Rule-based recommendations
export type RuleType = 'Rule-based' | 'AI-based';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  suggestedAction: string;
  urgency: UrgencyLevel;
  source: SourceType;
  sourceDetails?: string;
  tags: TagType[];
  timestamp: Date;
  team?: TeamType;
  wallet?: WalletType;
  status: StatusType;
  region?: string;
  category?: string;
}

export interface RuleDefinition {
  id?: string;
  name: string;
  condition: string;
  timeWindow: string;
  suggestedAction: ActionType;
  description: string;
  isActive: boolean;
  // New additions
  ruleType: RuleType;
  targetTeam?: TeamType;
  targetWallet?: WalletType;
  conditionDetails?: string;
}

// Filter types for recommendations
export interface RecommendationFilters {
  search: string;
  sourceType: SourceType | 'All';
  urgency: UrgencyLevel | 'All';
  startDate: Date | null;
  endDate: Date | null;
  team: TeamType | 'All';
  wallet: WalletType | 'All';
}
