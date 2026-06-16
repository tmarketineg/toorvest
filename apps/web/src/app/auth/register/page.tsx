import type { Metadata } from 'next';
import { SignupForm } from '@/components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-[hsl(var(--text-secondary))]">
            Join Toorvest and start exploring opportunities
          </p>
        </div>
        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 shadow-sm">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
