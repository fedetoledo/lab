uniform sampler2D uTexture;
uniform float uProgress;
uniform vec2 uMouse;
varying vec2 vUv;

void main() {
  float squareSize = 0.125 * uProgress;
  vec2 diff = abs(vUv - uMouse);
  bool insideSquare = diff.x < squareSize && diff.y < squareSize;

  if (insideSquare) {
    float cells = 8.0;
    vec2 localUv = (vUv - uMouse + squareSize) / (squareSize * 2.0);
    vec2 pixelUv = floor(localUv * cells) / cells;
    vec2 sampledUv = uMouse - squareSize + pixelUv * (squareSize * 2.0);
    gl_FragColor = texture2D(uTexture, sampledUv);
  } else {
    gl_FragColor = texture2D(uTexture, vUv);
  }
}
