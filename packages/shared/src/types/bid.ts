export type BidStatus = 'pending' | 'routed' | 'responded' | 'accepted' | 'completed' | 'expired';
export type ResponseStatus = 'pending' | 'shortlisted' | 'accepted' | 'rejected';

export interface SmartBid {
  id: string;
  client_id: string;
  category_id: string;
  country_id: string;
  title: string;
  description: string;
  budget_min?: number;
  budget_max?: number;
  deadline?: Date;
  status: BidStatus;
  routed_at?: Date;
  created_at: Date;
}

export interface SmartBidResponse {
  id: string;
  bid_id: string;
  company_id: string;
  proposal_text: string;
  proposed_budget?: number;
  proposed_timeline?: string;
  status: ResponseStatus;
  created_at: Date;
}

export interface CreateBidDto {
  category_id: string;
  country_id: string;
  title: string;
  description: string;
  budget_min?: number;
  budget_max?: number;
  deadline?: string;
}
