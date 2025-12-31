
export enum ToolCategory {
  EVALUATION = 'AI Evaluation & Testing Frameworks',
  AUTOMATION = 'Test Automation Frameworks',
  VISUAL = 'Visual Testing & UI Tools',
  UTILITIES = 'Specialized Testing Utilities',
  RUNNERS = 'Local AI Runners (The Engines)',
  WEB_MOBILE = 'Web & Mobile Agents'
}

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  url: string;
  howToUse: string;
  frameworks: string[];
  tags: string[];
  isPaid: boolean;
  isOpenSource: boolean;
  agentStrategy: string;
  version?: string;
  logo?: string;
}

export interface FilterState {
  search: string;
  category: ToolCategory | 'All';
  pricing: 'All' | 'Free/OS' | 'Paid';
  selectedTags: string[];
}
