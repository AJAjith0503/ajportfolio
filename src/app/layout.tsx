import type { Metadata, Viewport } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const anthropicFont = Lora({
  subsets: ['latin'],
  variable: '--font-anthropic',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ajportfolio-one.vercel.app'),
  title: {
    default: 'Ajith K V — AI Agent & Automation Engineer',
    template: '%s | Ajith K V',
  },
  description:
    'AI Engineer specializing in building autonomous AI agents, intelligent workflows, and scalable automation systems.',
  keywords: [
    'Ajith K V',
    'Creative Developer',
    'Full Stack Developer',
    'Next.js Portfolio',
    'React Developer',
    'AI Developer',
    'Framer Motion',
  ],
  authors: [{ name: 'Ajith K V', url: 'https://github.com/AJAjith0503' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ajportfolio-one.vercel.app',
    title: 'Ajith K V — AI Agent & Automation Engineer',
    description:
      'AI Engineer specializing in building autonomous AI agents, intelligent workflows, and scalable automation systems.',
    siteName: 'Ajith K V Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ajith K V — AI Agent & Automation Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajith K V — AI Agent & Automation Engineer',
    description:
      'AI Engineer specializing in building autonomous AI agents, intelligent workflows, and scalable automation systems.',
    images: ['/images/og-image.png'],
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
}

export const viewport: Viewport = {
  themeColor: '#121212',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${anthropicFont.variable} antialiased bg-[#121212] text-white overflow-x-hidden min-h-screen content-font`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
