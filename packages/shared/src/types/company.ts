export interface Company {
  id: string;
  user_id?: string;
  company_name: string;
  company_name_ar?: string;
  logo_url?: string;
  description?: string;
  description_ar?: string;
  country_id?: string;
  service_categories?: string[];
  service_type?: 'LOCAL' | 'INTERNATIONAL';
  budget_range_min?: number;
  budget_range_max?: number;
  is_verified: boolean;
  subscription_tier: 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  created_at: Date;
  updated_at?: Date;
  country?: { id: string; name: string; code: string };
}

export interface SubscriptionLimits {
  maxListings: number;
  maxBidsPerMonth: number;
  maxPhotos: number;
  verified: boolean;
}
