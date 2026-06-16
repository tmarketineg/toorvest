import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Cairo } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from '@/components/providers/Providers';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Toorvest — Global Business & Investment Hub',
    template: '%s | Toorvest',
  },
  description:
    'Toorvest connects countries, businesses, and investors worldwide. Explore investment tourism, business hubs, and country pavilions.',
  keywords: [
    'investment',
    'business hub',
    'tourism',
    'countries',
    'investors',
    'pavilions',
  ],
  openGraph: {
    title: 'Toorvest',
    description:
      'Global Business & Investment Hub connecting countries, businesses, and investors.',
    url: 'https://toorvest.com',
    siteName: 'Toorvest',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${cairo.variable} font-sans antialiased noise-overlay`}
      >
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
