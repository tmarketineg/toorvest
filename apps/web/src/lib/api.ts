import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? '/api' : 'http://localhost:3001/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('toorvest_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('toorvest_token');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'INVESTOR' | 'COMPANY' | 'ADMIN' | 'GOVERNMENT';
  phone?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  createdAt?: string;
  country?: { id: string; name: string; code: string; flagUrl?: string };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Article {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  excerpt: string;
  excerptAr?: string;
  content?: string;
  contentAr?: string;
  coverImage?: string;
  tags?: string[];
  publishedAt?: string;
  author?: { id: string; fullName: string; avatarUrl?: string };
  country?: { id: string; name: string; code: string };
  category?: { id: string; name: string; nameAr?: string; slug: string };
}

export interface Country {
  id: string;
  name: string;
  nameAr?: string;
  code: string;
  description?: string;
  descriptionAr?: string;
  flagUrl?: string;
}

export interface Company {
  id: string;
  companyName: string;
  companyNameAr?: string;
  logoUrl?: string;
  description?: string;
  descriptionAr?: string;
  serviceType?: string;
  serviceCategories?: string[];
  budgetRangeMin?: number;
  budgetRangeMax?: number;
  isVerified?: boolean;
  subscriptionTier?: string;
  country?: { id: string; name: string; code: string };
}

export interface SmartBid {
  id: string;
  title: string;
  description?: string;
  budgetMin?: number;
  budgetMax?: number;
  deadline?: string;
  status: 'PENDING' | 'ROUTED' | 'RESPONDED' | 'ACCEPTED' | 'COMPLETED' | 'EXPIRED';
  createdAt?: string;
  client?: { id: string; fullName: string; email: string };
  category?: { id: string; name: string; nameAr?: string };
  country?: { id: string; name: string; code: string };
  responses?: SmartBidResponse[];
}

export interface SmartBidResponse {
  id: string;
  proposalText: string;
  proposedBudget?: number;
  proposedTimeline?: string;
  status: string;
  createdAt?: string;
  company?: { id: string; companyName: string; logoUrl?: string; isVerified?: boolean };
}

export interface Project {
  id: string;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  projectType?: string;
  status?: string;
  sector?: string;
  budgetMin?: number;
  budgetMax?: number;
  deadline?: string;
  country?: { id: string; name: string; code: string };
}
