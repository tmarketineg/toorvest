import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { api } from '../services/api';
import { setLanguage } from '../i18n';

interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { fullName: string; email: string; password: string; phone: string }) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  login: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    await SecureStore.setItemAsync('token', data.token);
    set({ user: data.user, token: data.token });
  },

  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    await SecureStore.setItemAsync('token', data.token);
    set({ user: data.user, token: data.token });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('token');
    set({ user: null, token: null });
  },

  restoreSession: async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        const { data } = await api.get('/auth/me');
        set({ user: data.user, token });
      }
    } catch {
      await SecureStore.deleteItemAsync('token');
    } finally {
      set({ isLoading: false });
    }
  },
}));
