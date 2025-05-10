
import { 
  Recommendation, 
  RuleDefinition, 
  UrgencyLevel, 
  SourceType, 
  TagType, 
  StatusType,
  TeamType,
  WalletType
} from '../types/recommendation';

export const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Underutilized VM - consider shutdown',
    description: 'VM instance has been running at <5% CPU utilization for the past 30 days.',
    detailedDescription: 'This virtual machine has sustained extremely low utilization metrics over an extended period. Based on CPU, memory, and network traffic analysis, this instance appears to be idle or severely underutilized. Consider shutting down or rightsizing this instance to reduce costs.',
    suggestedAction: 'Shutdown unused VM instance to save on compute costs.',
    urgency: 'medium',
    source: 'Rule Engine',
    sourceDetails: 'Resource Utilization Monitor v1.2',
    tags: ['Cost', 'Optimization'],
    timestamp: new Date(2023, 4, 15),
    team: 'Infrastructure',
    wallet: 'Production',
    status: 'Pending',
    region: 'US-East',
    category: 'Compute'
  },
  {
    id: '2',
    title: 'Security vulnerability detected in container',
    description: 'Critical vulnerability CVE-2023-1234 found in production container images.',
    detailedDescription: 'Our security scanning has detected a critical vulnerability (CVE-2023-1234) in your container images currently running in production. This vulnerability could allow remote code execution and unauthorized access to your systems and data. Immediate patching is required.',
    suggestedAction: 'Update base container image to latest patch version.',
    urgency: 'critical',
    source: 'Rule Engine',
    sourceDetails: 'Container Security Scanner v3.1',
    tags: ['Security', 'Compliance'],
    timestamp: new Date(2023, 4, 17),
    team: 'Security',
    wallet: 'Production',
    status: 'Pending',
    region: 'Global',
    category: 'Containers'
  },
  {
    id: '3',
    title: 'Database index optimization recommended',
    description: 'Query performance could improve by 43% with additional index on transactions table.',
    detailedDescription: 'Based on query pattern analysis over the last 2 weeks, adding a composite index on (customer_id, transaction_date) could improve query performance by approximately 43%. This would significantly reduce database load during peak hours and improve application response times.',
    suggestedAction: 'Add composite index on transactions table.',
    urgency: 'low',
    source: 'AI Model',
    sourceDetails: 'Database Performance Analyzer AI v2.9',
    tags: ['Performance', 'Optimization'],
    timestamp: new Date(2023, 4, 10),
    team: 'Data',
    wallet: 'Production',
    status: 'Pending',
    region: 'US-West',
    category: 'Database'
  },
  {
    id: '4',
    title: 'Auto-scaling configuration suboptimal',
    description: 'Current scaling thresholds causing resource waste during off-peak hours.',
    detailedDescription: 'Your current auto-scaling configuration maintains too many instances during predictable off-peak hours. By adjusting scaling thresholds based on historical traffic patterns, you could reduce instance hours by approximately 15% without impacting performance during peak loads.',
    suggestedAction: 'Adjust auto-scaling thresholds based on traffic patterns.',
    urgency: 'medium',
    source: 'AI Model',
    sourceDetails: 'Load Forecasting AI v2.9',
    tags: ['Cost', 'Optimization'],
    timestamp: new Date(2023, 4, 12),
    team: 'DevOps',
    wallet: 'Development',
    status: 'Pending',
    region: 'EU-Central',
    category: 'Compute'
  },
  {
    id: '5',
    title: 'Unused storage volumes detected',
    description: '3 unattached storage volumes found, costing ~$45/month.',
    detailedDescription: 'We have detected 3 storage volumes that have been unattached to any instances for more than 30 days. These unused resources are incurring approximately $45 per month in unnecessary costs.',
    suggestedAction: 'Delete or archive unused storage volumes.',
    urgency: 'low',
    source: 'Rule Engine',
    sourceDetails: 'Cost Optimization Engine v2.1',
    tags: ['Cost'],
    timestamp: new Date(2023, 4, 14),
    team: 'Infrastructure',
    wallet: 'Development',
    status: 'Pending',
    region: 'US-East',
    category: 'Storage'
  },
  {
    id: '6',
    title: 'Network ACL rules too permissive',
    description: 'Public subnet has overly permissive inbound rules.',
    detailedDescription: 'Your public subnet network ACLs allow inbound traffic from all sources on ports that should be restricted. This configuration increases your attack surface and violates security best practices for least-privilege access.',
    suggestedAction: 'Restrict network ACL rules to specific IP ranges and required ports only.',
    urgency: 'critical',
    source: 'Rule Engine',
    sourceDetails: 'Network Security Analyzer v1.8',
    tags: ['Security', 'Compliance'],
    timestamp: new Date(2023, 4, 16),
    team: 'Security',
    wallet: 'Production',
    status: 'Pending',
    region: 'Global',
    category: 'Network'
  },
  {
    id: '7',
    title: 'API rate limiting recommended',
    description: 'Public API endpoints show irregular traffic patterns suggesting possible abuse.',
    detailedDescription: 'Analysis of your API traffic patterns indicates possible abuse or inefficient client implementations. Implementing rate limiting would protect your services from excessive requests and ensure fair usage across all clients.',
    suggestedAction: 'Implement API rate limiting policies.',
    urgency: 'medium',
    source: 'AI Model',
    sourceDetails: 'API Traffic Analyzer AI v1.5',
    tags: ['Security', 'Performance'],
    timestamp: new Date(2023, 4, 13),
    team: 'DevOps',
    wallet: 'Production',
    status: 'Pending',
    region: 'Global',
    category: 'API'
  },
  {
    id: '8',
    title: 'Logging level too verbose',
    description: 'Excessive INFO level logging is impacting performance and increasing storage costs.',
    detailedDescription: 'Your applications are generating approximately 4TB of log data per week, with over 70% being INFO level logs that are rarely accessed. This is negatively impacting performance and significantly increasing storage costs.',
    suggestedAction: 'Adjust logging configuration to reduce verbosity in production.',
    urgency: 'low',
    source: 'Rule Engine',
    sourceDetails: 'Log Analyzer v2.3',
    tags: ['Performance', 'Cost'],
    timestamp: new Date(2023, 4, 11),
    team: 'DevOps',
    wallet: 'Production',
    status: 'Pending',
    region: 'Global',
    category: 'Logging'
  }
];

export const ruleConditions = [
  'CPU > 80%',
  'Memory > 90%',
  'Disk Usage > 85%',
  'Network I/O > 1GB/s',
  'Error Rate > 1%',
  'Response Time > 500ms',
  'Unused Resource Age > 30 days',
  'Security Vulnerability Detected',
];

export const timeWindows = [
  '15 minutes',
  '1 hour',
  '6 hours',
  '24 hours',
  '3 days',
  '7 days',
  '30 days',
];

export const actionTypes = [
  'Send Alert',
  'Resize Resource',
  'Shutdown Resource',
  'Upgrade Component',
  'Mark as Critical',
  'Generate Report',
];

export const mockRules: RuleDefinition[] = [
  {
    id: '1',
    name: 'High CPU Alert',
    condition: 'CPU > 80%',
    timeWindow: '15 minutes',
    suggestedAction: 'Alert',
    description: 'Alert when CPU usage exceeds 80% for 15 minutes',
    isActive: true,
    ruleType: 'Rule-based', // Added the required field
  },
  {
    id: '2',
    name: 'Underutilized VM Detection',
    condition: 'CPU < 5%',
    timeWindow: '7 days',
    suggestedAction: 'Shutdown',
    description: 'Recommend shutdown for VMs with consistently low CPU usage',
    isActive: true,
    ruleType: 'Rule-based', // Added the required field
  },
];

export const getFilteredRecommendations = (
  recommendations: Recommendation[],
  filters: {
    search?: string;
    sourceType?: string;
    urgency?: string;
    team?: string;
    wallet?: string;
    startDate?: Date | null;
    endDate?: Date | null;
  }
) => {
  return recommendations.filter((rec) => {
    // Search filter
    if (
      filters.search &&
      !rec.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !rec.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Source type filter
    if (filters.sourceType && filters.sourceType !== 'All' && rec.source !== filters.sourceType) {
      return false;
    }

    // Urgency filter
    if (filters.urgency && filters.urgency !== 'All' && rec.urgency !== filters.urgency) {
      return false;
    }

    // Team filter
    if (filters.team && filters.team !== 'All' && rec.team !== filters.team) {
      return false;
    }

    // Wallet filter
    if (filters.wallet && filters.wallet !== 'All' && rec.wallet !== filters.wallet) {
      return false;
    }

    // Date range filter
    if (filters.startDate && new Date(rec.timestamp) < filters.startDate) {
      return false;
    }

    if (filters.endDate) {
      const endOfDay = new Date(filters.endDate);
      endOfDay.setHours(23, 59, 59, 999);
      if (new Date(rec.timestamp) > endOfDay) {
        return false;
      }
    }

    return true;
  });
};

export const sourceTypeOptions = ['All', 'Rule Engine', 'AI Model'];
export const urgencyOptions = ['All', 'low', 'medium', 'critical'];
export const teamOptions = ['All', 'DevOps', 'Infrastructure', 'Security', 'Data'];
export const walletOptions = ['All', 'Production', 'Development', 'Testing', 'Shared Services'];
