import { api } from './api';

export const companiesService = {
  getAll: (params?: { category?: string; search?: string }) =>
    api.get('/companies', { params }),
  getById: (id: string) => api.get(`/companies/${id}`),
  getByCategory: (category: string) =>
    api.get('/companies', { params: { category } }),
};
