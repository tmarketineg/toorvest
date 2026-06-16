import { api } from './api';

export const articlesService = {
  getByCountry: (countryId: string) => api.get(`/countries/${countryId}/articles`),
  getByCategory: (countryId: string, category: string) =>
    api.get(`/countries/${countryId}/articles`, { params: { category } }),
  getTips: (countryId: string) => api.get(`/countries/${countryId}/tips`),
};
