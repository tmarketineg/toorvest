import { create } from 'zustand';
import type { User } from './api';
import api from './api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({ user, isAuthenticated: !!user }),

  setToken: (token) => {
    if (token) {
      localStorage.setItem('toorvest_token', token);
    } else {
      localStorage.removeItem('toorvest_token');
    }
    set({ token });
  },

  login: (user, token) => {
    localStorage.setItem('toorvest_token', token);
    set({ user, token, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('toorvest_token');
    set({ user: null, token: null, isAuthenticated: false, isLoading: false });
  },

  setLoading: (isLoading) => set({ isLoading }),

  initializeAuth: async () => {
    const token = localStorage.getItem('toorvest_token');
    if (!token) {
      set({ isLoading: false });
      return;
    }
    try {
      const res = await api.get('/auth/me');
      set({ user: res.data, token, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('toorvest_token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
