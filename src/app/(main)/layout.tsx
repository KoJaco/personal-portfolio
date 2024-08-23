'use client'

import { DesktopNavigation } from '@/components/navigation'

// Layout for transitions...
// maybe use a transition provider as a client-side component and keep this server

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // includes base width cutoff and full page margin/spacing.
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center space-y-16 py-16">
      <header className="flex w-full justify-between">
        <DesktopNavigation />
      </header>

      <div className="flex h-full w-full">{children}</div>
    </div>
  )
}
