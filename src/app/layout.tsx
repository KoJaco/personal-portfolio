import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Providers } from '@/lib/providers'

import '@/styles/tailwind.css'
// import ParticlesWrapper from '@/components/particles/wrapper'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
  weight: '200 900',
})

export const metadata: Metadata = {
  title: 'TODO: Add title',
  description: 'TODO: add desc.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

const ParticlesWrapper = dynamic(
  () => import('@/components/particles/wrapper'),
  {
    ssr: false,
  },
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, monaSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex h-screen w-full flex-col overflow-hidden bg-white dark:bg-gray-950">
        {/* <body className="flex min-h-full flex-col bg-white dark:bg-gray-950"></body> */}
        <Providers>
          <>
            <ParticlesWrapper />

            <div className="flex h-screen w-full flex-col overflow-y-auto">
              {children}
            </div>
          </>
        </Providers>
      </body>
    </html>
  )
}
