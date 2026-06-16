import { api } from './api';

export const countriesService = {
  getAll: () => api.get('/countries'),
  getById: (id: string) => api.get(`/countries/${id}`),
  getPavilion: (id: string) => api.get(`/countries/${id}/pavilion`),
  getEmirates: (countryId: string) => api.get(`/countries/${countryId}/emirates`),
  getEmirateDetail: (countryId: string, emirateId: string) =>
    api.get(`/countries/${countryId}/emirates/${emirateId}`),
  searchPavilion: (countryId: string, query: string) =>
    api.get(`/countries/${countryId}/pavilion/search`, { params: { q: query } }),
};
