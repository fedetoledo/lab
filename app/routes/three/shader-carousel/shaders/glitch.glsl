uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;

float random(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float p = uProgress;

  // Intensity peaks in the middle of the transition
  float intensity = sin(p * 3.14159);

  // Horizontal slice displacement
  float sliceY = floor(vUv.y * 30.0) / 30.0;
  float sliceRand = random(vec2(sliceY, floor(uTime * 10.0)));
  float sliceOffset = (sliceRand - 0.5) * intensity * 0.15;

  vec2 uv = vUv;
  uv.x += sliceOffset;

  // Block glitch
  vec2 block = floor(vUv * 8.0);
  float blockRand = random(block + floor(uTime * 8.0));
  float blockActive = step(0.85 - intensity * 0.4, blockRand);
  uv.x += blockActive * (random(block) - 0.5) * 0.1 * intensity;

  // RGB split
  float rgbShift = intensity * 0.02;
  float r = mix(
    texture2D(uTexture1, uv + vec2(rgbShift, 0.0)).r,
    texture2D(uTexture2, uv + vec2(rgbShift, 0.0)).r,
    p
  );
  float g = mix(
    texture2D(uTexture1, uv).g,
    texture2D(uTexture2, uv).g,
    p
  );
  float b = mix(
    texture2D(uTexture1, uv - vec2(rgbShift, 0.0)).b,
    texture2D(uTexture2, uv - vec2(rgbShift, 0.0)).b,
    p
  );

  gl_FragColor = vec4(r, g, b, 1.0);
}
