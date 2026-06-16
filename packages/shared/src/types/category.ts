export interface Category {
  id: string;
  name: string;
  name_ar: string;
  slug: string;
  icon_url?: string;
  description?: string;
  description_ar?: string;
  parent_id?: string;
  module: 'business_hub' | 'investment_tourism' | 'general';
  sort_order: number;
  is_active: boolean;
}
