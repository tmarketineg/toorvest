import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Toorvest Privacy Policy - How we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
      <div className="prose prose-sm max-w-none space-y-6 text-[hsl(var(--text-secondary))]">
        <p><em>Last updated: January 2026</em></p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">1. Information We Collect</h2>
        <p>
          When you use Toorvest, we collect information you provide directly, such as your name, email address,
          phone number, and company details. We also collect usage data including pages visited, features used,
          and interaction patterns.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and improve our platform services</li>
          <li>To match you with relevant business opportunities and investment projects</li>
          <li>To communicate with you about your account and platform updates</li>
          <li>To ensure platform security and prevent fraud</li>
        </ul>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">3. Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share your data with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Other platform users when you initiate business interactions</li>
          <li>Service providers who help us operate the platform</li>
          <li>Government authorities when required by law</li>
        </ul>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data, including encryption,
          access controls, and regular security audits. However, no method of transmission over the
          Internet is 100% secure.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">5. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal data. You can manage your
          account settings through the platform dashboard or contact us directly.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">6. Cookies</h2>
        <p>
          We use essential cookies to maintain your session and improve your experience. We do not
          use third-party advertising cookies.
        </p>

        <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">7. Contact Us</h2>
        <p>
          For privacy-related inquiries, please contact us at privacy@toorvest.com.
        </p>
      </div>
    </div>
  );
}
