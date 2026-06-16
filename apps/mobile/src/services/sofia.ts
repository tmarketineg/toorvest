import { api } from './api';

export const sofiaService = {
  sendMessage: (message: string, options?: { countryId?: string; sector?: string }) =>
    api.post('/sofia/chat', { message, ...options }),
  getHistory: () => api.get('/sofia/history'),
};
