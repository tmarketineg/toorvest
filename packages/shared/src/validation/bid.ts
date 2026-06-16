import { z } from 'zod';

export const createBidSchema = z.object({
  category_id: z.string().uuid('Invalid category'),
  country_id: z.string().uuid('Invalid country'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  budget_min: z.number().positive().optional(),
  budget_max: z.number().positive().optional(),
  deadline: z.string().optional(),
});

export const respondBidSchema = z.object({
  proposal_text: z.string().min(20, 'Proposal must be at least 20 characters'),
  proposed_budget: z.number().positive().optional(),
  proposed_timeline: z.string().optional(),
});

export type CreateBidInput = z.infer<typeof createBidSchema>;
export type RespondBidInput = z.infer<typeof respondBidSchema>;
