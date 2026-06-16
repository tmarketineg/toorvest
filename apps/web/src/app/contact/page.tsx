import type { Metadata } from 'next';
import { ContactForm } from '@/components/shared/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
          <p className="mt-2 text-[hsl(var(--text-secondary))]">
            Have a question or want to work together? Fill out the form below.
          </p>
        </div>

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
