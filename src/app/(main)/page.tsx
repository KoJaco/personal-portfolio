import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

// keep very simple.
const HomePage = () => {
  return (
    <main className="flex h-full w-full items-center justify-center">
      {/* <Card className="border-opacity-50 bg-transparent backdrop-blur-md transition-all duration-300"> */}

      <h1 className="text-primary/90 max-w-lg text-xl font-light leading-8 tracking-wide">
        What&apos;s up? <br />
        I&apos;m <span className="text-sky-300">Kori</span>, a full-stack
        developer who ...
      </h1>

      {/* </Card> */}
    </main>
  )
}

export default HomePage
