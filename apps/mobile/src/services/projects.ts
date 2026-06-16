import { api } from './api';

export const projectsService = {
  getAll: (params?: { category?: string; search?: string }) =>
    api.get('/projects', { params }),
  getById: (id: string) => api.get(`/projects/${id}`),
  getRealEstate: () => api.get('/projects', { params: { category: 'real-estate' } }),
  getAgriculture: () => api.get('/projects', { params: { category: 'agriculture' } }),
  getIndustry: () => api.get('/projects', { params: { category: 'industry' } }),
};
