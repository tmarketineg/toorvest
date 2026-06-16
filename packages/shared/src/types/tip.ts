export interface Tip {
  id: string;
  country_id: string;
  title: string;
  title_ar: string;
  content: string;
  content_ar: string;
  icon_url?: string;
  module: 'business_hub' | 'investment_tourism';
  display_mode: 'web_static' | 'app_interstitial';
  is_mandatory_view: boolean;
  sort_order: number;
}
