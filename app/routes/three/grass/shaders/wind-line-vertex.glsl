uniform float uTime;
uniform float uOffset;

varying vec2 vUv;
varying float vLife;

void main() {
  vUv = uv;

  // Lifecycle: each line loops on a ~4s cycle with its own offset
  float cycle = mod(uTime * 0.25 + uOffset, 1.0);
  // Fade in then out
  vLife = sin(cycle * 3.14159);

  // Move along X over its lifetime
  float travel = cycle * 6.0 - 3.0;

  // Sine wave on Y for a wavy shape
  float wave = sin(uv.x * 6.28 + uTime * 3.0) * 0.08;

  vec3 pos = position;
  pos.x += travel;
  pos.y += wave;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
