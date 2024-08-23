'use client'

import { lazy, Suspense, useEffect, useState } from 'react'
// import ParticlesLoading from './loading'
// import { Canvas } from '@react-three/offscreen'
import Scene from './scene'
import { Canvas } from '@react-three/fiber'

// const Scene = lazy(() => import('./scene'))
// const worker = new Worker(new URL('./worker.jsx', import.meta.url), {
//   type: 'module',
// })

// https://www.youtube.com/watch?v=vEaAheMO0bo -- particles to image.

const Particles = () => {
  const [displayLargeAnimations, setDisplayLargeAnimations] = useState(true)

  // initial useEffect to detect device type
  useEffect(() => {
    const nav = navigator.userAgent

    if (/iphone|ipad|ipod|android|webos|blackberry|windows phone/.test(nav)) {
      setDisplayLargeAnimations(false)
    }
  }, [])

  if (!displayLargeAnimations) return null

  return (
    <Canvas
      camera={{
        fov: 22,
        position: [1.5, 1.5, 1.5],
      }}
    >
      <Suspense>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

export default Particles
