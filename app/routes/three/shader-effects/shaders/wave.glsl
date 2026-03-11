uniform sampler2D uTexture;
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;

void main() {
  float frequency = 12.0;
  float amplitude = uProgress * 0.04;

  vec2 waveUv = vUv;
  waveUv.x += sin(vUv.y * frequency + uTime * 3.0) * amplitude;
  waveUv.y += cos(vUv.x * frequency + uTime * 2.0) * amplitude * 0.6;

  vec4 color = texture2D(uTexture, waveUv);
  gl_FragColor = color;
}
