export type SearchType = 'articles' | 'companies' | 'projects' | 'countries';

export interface SearchResponse {
  countries?: any[];
  articles?: any[];
  companies?: any[];
  projects?: any[];
}
