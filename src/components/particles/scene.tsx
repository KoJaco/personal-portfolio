'use client'

import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, extend, createPortal } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useFBO } from '@react-three/drei'
import * as THREE from 'three'

import SimulationMaterial from './simulationMaterial'
import './shaders/dofPointsMaterial'

// Make the simulation material available as a TSX element in our canvas
extend({ SimulationMaterial: SimulationMaterial })
extend({ OrbitControls })

export const particleState = {
  speed: 0.01,
  fov: 0,
  aperture: 5.2,
  focus: 2,
  curl: 0.5,
  fragColorStrength: 1.0,
  cameraFov: 50,
  size: 256,
}

interface ParticlesProps {
  speed: number
  fov: number
  aperture: number
  focus: number
  curl: number
  fragColorStrength: number
  cameraFov: number
  size?: number
}

interface Uniforms {
  positions: {
    value: THREE.Texture
  }
  uTime: {
    value: number
  }
  uFocus: {
    value: number
  }
  uFov: {
    value: number
  }
  uBlur: {
    value: number
  }
  uCurlFreq: {
    value: number
  }
  // Controls fragment shader colour, lerp between white and black on theme change.
  uFragColorStrength: {
    value: number
  }
}

interface SimulationRef {
  uniforms: Uniforms
}

const FBOParticles = ({
  speed,
  fov,
  aperture,
  focus,
  curl,
  fragColorStrength,
  cameraFov,
  size = 256,
  ...props
}: ParticlesProps) => {
  const simRef = useRef<SimulationRef | null>(null)
  const renderRef = useRef<SimulationRef | null>(null)

  // Set up FBO
  const [scene] = useState(() => new THREE.Scene())

  const [camera] = useState(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1),
  )

  const [positions] = useState(
    () =>
      new Float32Array([
        -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
      ]),
  )
  const [uvs] = useState(
    () => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]),
  )
  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  })

  // Normalize points
  const particles = useMemo(() => {
    const length = size * size
    const particles = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
      const i3 = i * 3
      particles[i3 + 0] = (i % size) / size
      particles[i3 + 1] = i / size / size
    }
    return particles
  }, [size])

  // Update FBO and pointcloud every frame
  useFrame((state) => {
    state.gl.setRenderTarget(target)
    state.gl.clear()
    state.gl.render(scene, camera)
    state.gl.setRenderTarget(null)

    if (renderRef.current && simRef.current) {
      renderRef.current.uniforms.positions.value = target.texture
      renderRef.current.uniforms.uTime.value = state.clock.elapsedTime
      renderRef.current.uniforms.uFocus.value = THREE.MathUtils.lerp(
        renderRef.current.uniforms.uFocus.value,
        focus,
        0.1,
      )
      renderRef.current.uniforms.uFov.value = THREE.MathUtils.lerp(
        renderRef.current.uniforms.uFov.value,
        fov,
        0.1,
      )
      renderRef.current.uniforms.uBlur.value = THREE.MathUtils.lerp(
        renderRef.current.uniforms.uBlur.value,
        (5.6 - aperture) * 9,
        0.1,
      )
      renderRef.current.uniforms.uFragColorStrength.value =
        THREE.MathUtils.lerp(
          renderRef.current.uniforms.uFragColorStrength.value,
          fragColorStrength,
          0.1,
        )

      simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed
      simRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(
        simRef.current.uniforms.uCurlFreq.value,
        curl,
        0.1,
      )
    }
  })

  return (
    <Fragment>
      {/* Render off-screen our simulation material geometry */}
      {createPortal(
        <mesh>
          {/* @ts-expect-error -we know this is a shader material */}
          <simulationMaterial ref={simRef} />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene,
      )}

      {/* The result of which is forwarded into a pointcloud via data-texture */}
      <points {...props}>
        {/* @ts-expect-error */}
        <dofPointsMaterial ref={renderRef} />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
      </points>
    </Fragment>
  )
}

const Scene = () => {
  return (
    <>
      <FBOParticles {...particleState} />
      <PerspectiveCamera
        makeDefault
        manual={false}
        position={[1.5, 1.5, 1.5]} // this is the default position
        fov={25}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
      >
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.05}
          zoomSpeed={1}
          enableZoom={false}
          maxZoom={1000}
          enablePan={false}
          enableRotate={false}
        />
      </PerspectiveCamera>
    </>
  )
}

export default Scene
