import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Toorvest Terms of Service - Rules and guidelines for using our platform.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>
      <div className="prose prose-sm max-w-none space-y-6 text-[hsl(var(--text-secondary))]">
        <p><em>Last updated: January 2026</em></p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">1. Acceptance of Terms</h2>
        <p>
          By accessing or using Toorvest, you agree to be bound by these Terms of Service.
          If you do not agree, do not use the platform.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">2. Account Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials
          and for all activities under your account. You must provide accurate and complete
          information during registration.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">3. Platform Usage</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You may use the platform for legitimate business purposes only</li>
          <li>You must not misrepresent your identity or company affiliation</li>
          <li>You must not attempt to manipulate bids, ratings, or platform data</li>
          <li>You must comply with all applicable laws and regulations</li>
        </ul>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">4. Intellectual Property</h2>
        <p>
          All content on Toorvest, including text, graphics, logos, and software, is the property
          of Toorvest or its licensors and is protected by copyright and trademark laws.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">5. Limitation of Liability</h2>
        <p>
          Toorvest is not liable for any indirect, incidental, or consequential damages arising
          from your use of the platform. We do not guarantee the accuracy of third-party content
          or investment outcomes.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at our discretion, with or
          without notice, for violations of these terms.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">7. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the platform after
          changes constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">8. Contact Us</h2>
        <p>
          For questions about these terms, please contact us at legal@toorvest.com.
        </p>
      </div>
    </div>
  );
}
