export interface Article {
  id: string;
  title: string;
  title_ar: string;
  slug: string;
  content?: string;
  content_ar?: string;
  excerpt: string;
  excerpt_ar: string;
  cover_image?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  module: 'BUSINESS_HUB' | 'INVESTMENT_TOURISM' | 'BOTH';
  tags?: string[];
  published_at?: Date;
  author_id: string;
  category_id?: string;
  country_id?: string;
  created_at: Date;
  author?: { id: string; full_name: string; avatar_url?: string };
  country?: { id: string; name: string; code: string };
  category?: { id: string; name: string; name_ar: string; slug: string };
}
