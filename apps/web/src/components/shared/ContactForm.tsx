'use client';

import { useState } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center dark:border-brand-900 dark:bg-brand-950/30">
        <PaperPlaneTilt weight="light" className="mx-auto mb-3 h-8 w-8 text-brand-600" />
        <h3 className="mb-1 text-lg font-semibold">Message Sent</h3>
        <p className="text-sm text-[hsl(var(--text-secondary))]">
          We will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="mb-1 block text-sm font-medium">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        <PaperPlaneTilt weight="light" className="h-4 w-4" />
        Send Message
      </button>
    </form>
  );
}
