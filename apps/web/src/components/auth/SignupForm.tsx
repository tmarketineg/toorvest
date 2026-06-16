'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeSlash,
  Envelope,
  LockKey,
  User,
} from '@phosphor-icons/react/dist/ssr';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        fullName: form.name,
        email: form.email,
        password: form.password,
      });
      login(res.data.user, res.data.token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="signup-name" className="mb-1 block text-sm font-medium">
          Full name
        </label>
        <div className="relative">
          <User
            weight="light"
            className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--text-secondary))]"
          />
          <input
            id="signup-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] py-3 ps-10 pe-4 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="signup-email" className="mb-1 block text-sm font-medium">
          Email address
        </label>
        <div className="relative">
          <Envelope
            weight="light"
            className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--text-secondary))]"
          />
          <input
            id="signup-email"
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
        <label htmlFor="signup-password" className="mb-1 block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <LockKey
            weight="light"
            className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--text-secondary))]"
          />
          <input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] py-3 ps-10 pe-10 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            placeholder="Create a password"
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

      <div>
        <label htmlFor="signup-confirm" className="mb-1 block text-sm font-medium">
          Confirm password
        </label>
        <div className="relative">
          <LockKey
            weight="light"
            className="absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(var(--text-secondary))]"
          />
          <input
            id="signup-confirm"
            type="password"
            required
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] py-3 ps-10 pe-4 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            placeholder="Confirm your password"
          />
        </div>
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" required className="mt-0.5 rounded border-[hsl(var(--border))]" />
        <span className="text-[hsl(var(--text-secondary))]">
          I agree to the{' '}
          <Link href="#" className="font-medium text-brand-600 hover:text-brand-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="#" className="font-medium text-brand-600 hover:text-brand-700">
            Privacy Policy
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>

      {error && (
        <p className="text-center text-sm text-red-500">{error}</p>
      )}

      <p className="text-center text-sm text-[hsl(var(--text-secondary))]">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-medium text-brand-600 hover:text-brand-700">
          Log in
        </Link>
      </p>
    </form>
  );
}
