#include "./noise.glsl"

varying vec2 vUv;
varying float vLife;

void main() {
  // Stretch noise: wide on X, thin on Y
  vec2 stretchedUV = vec2(vUv.x * 0.3, vUv.y * 8.0);

  float line = snoise(vec3(stretchedUV, 0.0));

  // Only show narrow peaks as thin lines
  line = smoothstep(0.6, 0.75, line);

  // Fade out at edges of the plane
  float edgeFade = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
  edgeFade *= smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);

  float alpha = line * edgeFade * vLife * 0.4;

  gl_FragColor = vec4(vec3(1.0), alpha);
}
