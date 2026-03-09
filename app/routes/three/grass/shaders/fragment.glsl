#include "./noise.glsl"

uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;
varying vec3 vWorldPos;

void main() {
  // Generate noise based on world position for tip color variation
  float grassTipNoise = snoise(vec3(vWorldPos.xz * 0.5, 0.0)); // [-1, 1]
  float normalizedTipNoise = grassTipNoise * 0.5 + 0.5; // Normalize to [0, 1]

  vec3 tipA = vec3(0.439,0.753,0.282);
  vec3 tipB = vec3(0.345,0.604,0.216);

  vec3 tip = mix(tipA, tipB, normalizedTipNoise);
  vec3 root = vec3(0.153,0.192,0.086);

  vec3 colorMix = mix(tip, root, vUv.y);

  float cloud = snoise(vec3(vWorldPos.xz * 0.3 + uTime * 0.15, 0.0)) * 0.5 +
  0.5;
  cloud = smoothstep(0.9, 0.6, cloud); // soften edges

  vec3 finalColor = colorMix * mix(0.5, 1.0, cloud);

  float d = distance(vWorldPos.xz, uMouse);
  float influence = smoothstep(1.5, 0.0, d);
  vec3 highlightColor = vec3(1.0, 0.8, 0.5);
  finalColor = mix(finalColor, highlightColor, influence);

  gl_FragColor = vec4(finalColor, 1.0);


   // Scrolling noise — moves in the wind direction over time
  // float noise = snoise(vec3(vWorldPos.xz * 2.0 + uTime * 0.22, 0.0)) * 0.5 +
  // 0.5;

  // // Sine wave — also scrolling in the same direction
  // float wave =  sin(vWorldPos.x * 1.0 - uTime + noise);

  // // Combine — multiply them together
  // float wind = smoothstep(-0.1, 1.0, wave);

  // gl_FragColor = vec4(vec3(wind), 1.0);
}
