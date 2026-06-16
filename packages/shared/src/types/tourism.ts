export interface TourismActivity {
  id: string;
  country_id: string;
  emirate_id?: string;
  name: string;
  name_ar: string;
  description?: string;
  description_ar?: string;
  activity_type: 'agriculture' | 'business' | 'cultural' | 'adventure' | 'wellness';
  image_url?: string;
  interactive_data: Record<string, any>;
  sort_order: number;
}
