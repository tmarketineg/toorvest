export interface SofiaMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SofiaRecommendation {
  type: 'project_match' | 'company_match' | 'pavilion_redirect' | 'proposal_advice' | 'no_match';
  id?: string;
  title: string;
  description: string;
  relevance_score: number;
}

export interface SofiaConversation {
  id: string;
  user_id: string;
  messages: SofiaMessage[];
  context_country_id?: string;
  context_sector?: string;
  recommendations_generated: SofiaRecommendation[];
  created_at: Date;
  updated_at: Date;
}

export interface SofiaChatDto {
  message: string;
  country_id: string;
  sector?: string;
}
