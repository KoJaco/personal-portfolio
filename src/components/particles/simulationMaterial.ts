import * as THREE from 'three'

import simulationVertexShader from './shaders/simulationVertextShader'
import simulationFragmentShader from './shaders/simulationFragmentShader'

function getPoint(
  v: THREE.Vector3,
  size: number,
  data: Float32Array,
  offset: number,
): THREE.Vector3 {
  v.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
  if (v.length() > 1) return getPoint(v, size, data, offset)
  return v
    .normalize()
    .multiplyScalar(size)
    .toArray(data, offset) as unknown as THREE.Vector3
}

function getSphere(count: number, size: number, p = new THREE.Vector3()) {
  const data = new Float32Array(count * 4)
  for (let i = 0; i < count * 4; i += 4) getPoint(p, size, data, i)
  return data
}

// Create a custom simulation shader material
class SimulationMaterial extends THREE.ShaderMaterial {
  constructor() {
    const positionsTextureSphere = new THREE.DataTexture(
      getSphere(256 * 256, 256),
      256,
      256,
      THREE.RGBAFormat,
      THREE.FloatType,
    )
    positionsTextureSphere.needsUpdate = true

    const simulationUniforms = {
      positionsSphere: { value: positionsTextureSphere },
      uTime: { value: 0.01 },
      uCurlFreq: { value: 0.4 },
    }

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    })
  }
}

export default SimulationMaterial
