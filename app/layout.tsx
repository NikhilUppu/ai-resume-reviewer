import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import OgImage from '../public/banner.jpeg';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://resume-reviewer.pragusga.com'),
  title: {
    default: 'AI Resume Reviewer - Professional Resume Analysis Tool',
    template: '%s | AI Resume Reviewer',
  },
  description:
    'Free AI-powered resume analysis tool that provides instant feedback, scoring, and recommendations to improve your resume. Get professional insights for your job search.',
  keywords: [
    'resume review',
    'AI resume analysis',
    'resume scorer',
    'resume feedback',
    'career development',
    'job search',
    'resume improvement',
    'professional resume',
    'resume optimization',
    'career advancement',
  ],
  authors: [{ name: 'Taufik Pragusga', url: 'https://pragusga.com' }],
  creator: 'Taufik Pragusga',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resume-reviewer.pragusga.com',
    title: 'AI Resume Reviewer - Professional Resume Analysis Tool',
    description:
      'Free AI-powered resume analysis tool that provides instant feedback, scoring, and recommendations to improve your resume.',
    siteName: 'AI Resume Reviewer',
    images: [
      {
        url: OgImage.src,
        width: 1200,
        height: 630,
        alt: 'AI Resume Reviewer - Professional Resume Analysis Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Reviewer - Professional Resume Analysis Tool',
    description:
      'Free AI-powered resume analysis tool that provides instant feedback, scoring, and recommendations to improve your resume.',
    images: [
      {
        url: OgImage.src,
        width: 1200,
        height: 630,
        alt: 'AI Resume Reviewer - Professional Resume Analysis Tool',
      },
    ],
    creator: '@taufikpragusga',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://resume-reviewer.pragusga.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-100 via-orange-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 animate-gradient">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
