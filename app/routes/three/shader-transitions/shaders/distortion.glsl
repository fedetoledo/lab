uniform sampler2D uTexture;
uniform float uProgress;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 dir = vUv - uMouse;
  float dist = length(dir);

  float radius = 0.4;
  float strength = uProgress * 0.3;

  float falloff = smoothstep(radius, 0.0, dist);

  vec2 distortedUv = vUv + normalize(dir) * falloff * strength;

  vec4 color = texture2D(uTexture, distortedUv);
  gl_FragColor = color;
}
