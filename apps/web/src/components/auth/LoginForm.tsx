'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeSlash, Envelope, LockKey } from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });
      login(res.data.user, res.data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="mb-1 block text-sm font-medium">
          Email address
        </label>
        <div className="relative">
          <Envelope
            weight="light"
            className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--text-secondary))]"
          />
          <input
            id="login-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] py-3 ps-10 pe-4 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <LockKey
            weight="light"
            className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--text-secondary))]"
          />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] py-3 ps-10 pe-10 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-[hsl(var(--text-secondary))]"
          >
            {showPassword ? (
              <EyeSlash weight="light" className="h-5 w-5" />
            ) : (
              <Eye weight="light" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="rounded border-[hsl(var(--border))]" />
          Remember me
        </label>
        <Link href="/auth/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>

      {error && (
        <p className="text-center text-sm text-red-500">{error}</p>
      )}

      <p className="text-center text-sm text-[hsl(var(--text-secondary))]">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="font-medium text-brand-600 hover:text-brand-700">
          Sign up
        </Link>
      </p>
    </form>
  );
}
