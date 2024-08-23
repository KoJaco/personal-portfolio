'use client'

import React, { useEffect, useState } from 'react'
import Particles from './particles' // Assume Particles is your existing component

const ParticlesWrapper = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`absolute isolate -z-50 h-screen w-full overflow-hidden transition-all duration-[2000ms] ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <svg
        aria-hidden="true"
        className="absolute left-1/2 top-[-10vh] -z-10 h-[100vh] w-[100vw] min-w-[60rem] -translate-x-1/2"
      >
        <defs>
          <radialGradient id="gradient" cy="0%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)" />
      </svg>

      <Particles />
    </div>
  )
}

export default ParticlesWrapper
