const vertexShader = `varying vec2 vUv;
varying float vDistance;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

export default vertexShader
