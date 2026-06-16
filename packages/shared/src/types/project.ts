export interface Project {
  id: string;
  country_id: string;
  title: string;
  title_ar?: string;
  description?: string;
  description_ar?: string;
  project_type: 'governmental' | 'individual';
  sector: 'real_estate' | 'agriculture' | 'industry' | 'other';
  status: 'off_plan' | 'under_construction' | 'secondary_market' | 'operational';
  images: any[];
  budget?: number;
  roi_percentage?: number;
  location?: string;
  contact_info: Record<string, any>;
  created_at: Date;
}
