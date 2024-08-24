'use client'

import { DesktopNavigation } from '@/components/navigation'

// Layout for transitions...
// maybe use a transition provider as a client-side component and keep this server

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // includes base width cutoff and full page margin/spacing.
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center space-y-16">
      <DesktopNavigation />

      {children}

      <footer className="fixed bottom-10 left-24 self-center">
        <div className="flex flex-col justify-start gap-x-4 text-start">
          <h2 className="text-muted-foreground leading-none tracking-wide">
            Kori Jacobsen
          </h2>

          <p className="text-muted-foreground/50 mb-0.5 text-sm font-light">
            Full-stack . AI . CLI
          </p>
        </div>
      </footer>
    </div>
  )
}
