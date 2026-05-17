import type { Metadata } from 'next'
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
  title: 'Creative Developer Portfolio',
  description: 'High-end Scrollytelling Personal Portfolio Website',
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
