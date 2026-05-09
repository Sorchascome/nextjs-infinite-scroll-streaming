import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Shop | Infinite Scroll Streaming',
  description: 'Product listing with infinite scroll and Next.js streaming',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Header />
        <main className="pt-6 pb-16">
          <Suspense>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
