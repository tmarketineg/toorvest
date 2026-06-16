import { api } from './api';

export const bidsService = {
  submit: (data: {
    title: string;
    description?: string;
    categoryId?: string;
    countryId?: string;
    budgetMin?: number;
    budgetMax?: number;
    deadline?: string;
  }) => api.post('/bids', data),

  getInbox: () => api.get('/bids/my'),
  getMyBids: () => api.get('/bids/my'),
  respond: (bidId: string, data: {
    proposalText: string;
    proposedBudget?: number;
    proposedTimeline?: string;
  }) => api.post(`/bids/${bidId}/respond`, data),
};
