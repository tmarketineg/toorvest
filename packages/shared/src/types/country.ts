export interface Country {
  id: string;
  name: string;
  name_ar: string;
  code: string;
  flag_url: string;
  description?: string;
  description_ar?: string;
  pavilion_config: Record<string, any>;
  is_active: boolean;
  sort_order: number;
  created_at: Date;
}

export interface Emirates {
  id: string;
  country_id: string;
  name: string;
  name_ar: string;
  description?: string;
  description_ar?: string;
  tourism_highlights: any[];
  tips_for_investors: any[];
  images: any[];
  sort_order: number;
}
