uniform sampler2D uTexture;
uniform float uProgress;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  vec2 dir = vUv - uMouse;
  float dist = length(dir);

  float radius = 0.5;
  float falloff = smoothstep(radius, 0.0, dist);

  float shift = uProgress * 0.03 * falloff;

  float r = texture2D(uTexture, vUv + vec2(shift, 0.0)).r;
  float g = texture2D(uTexture, vUv + vec2(0.0, -shift)).g;
  float b = texture2D(uTexture, vUv + vec2(-shift, shift * 0.5)).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}
