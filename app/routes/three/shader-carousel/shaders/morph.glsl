uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;
varying vec2 vUv;

void main() {
  float p = uProgress;
  float ease = p * p * (3.0 - 2.0 * p);

  // Stretch image 1 horizontally as it exits
  vec2 uv1 = vUv;
  uv1.x = uv1.x + ease * (uv1.x - 0.5) * 1.5;
  uv1.y = uv1.y + ease * (uv1.y - 0.5) * 0.3;

  // Compress image 2 as it enters
  vec2 uv2 = vUv;
  uv2.x = uv2.x - (1.0 - ease) * (uv2.x - 0.5) * 1.5;
  uv2.y = uv2.y - (1.0 - ease) * (uv2.y - 0.5) * 0.3;

  vec4 color1 = texture2D(uTexture1, uv1);
  vec4 color2 = texture2D(uTexture2, uv2);

  // Fade through dark in the middle for drama
  float darkness = 1.0 - pow(4.0 * ease * (1.0 - ease), 0.5) * 0.4;

  gl_FragColor = mix(color1, color2, ease) * darkness;
}
