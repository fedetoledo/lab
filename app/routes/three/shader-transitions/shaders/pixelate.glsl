uniform sampler2D uTexture;
uniform float uProgress;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 diff = abs(vUv - uMouse);
  float dist = max(diff.x, diff.y);

  float radius = 0.25;
  float falloff = smoothstep(radius, 0.0, dist) * uProgress;

  float cells = mix(300.0, 6.0, falloff);
  vec2 gridUv = floor(vUv * cells) / cells;

  vec4 color = texture2D(uTexture, gridUv);
  gl_FragColor = color;
}
