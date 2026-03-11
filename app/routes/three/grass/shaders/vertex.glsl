#include "./noise.glsl"

uniform float uTime;
uniform float uWindStrength;
uniform float uWindSpeed;
varying vec2 vUv;
varying vec3 vWorldPos;

void main() {

  // Get world position of this instance
  vec4 worldPos = instanceMatrix * vec4(position, 1.0);

  // Use height (y in local space) as bend factor — base stays fixed, tips move most
  float heightFactor = pow(position.y, 2.5);

  // Sample noise based on world xz position + time for wind
  // float windX = snoise(vec3(worldPos.x * 0.3, worldPos.z * 0.3, uTime * uWindSpeed));
  // float windZ = snoise(vec3(worldPos.x * 0.3 + 100.0, worldPos.z * 0.3 + 100.0, uTime * uWindSpeed * 0.8));

  // float windX = sin(uTime);
  // float windZ = cos(uTime * 0.8);

  // Wind: same sine + noise pattern as fragment shader
  float noise = snoise(vec3(worldPos.xz * 2.0 + uTime * 0.23, 0.0));
  float wave = sin(worldPos.x * 1.0 - uTime + noise);
  float wind = wave;
  
  vec3 displaced = position;
  displaced.x += wind * heightFactor * uWindStrength;
  displaced.z += wind * heightFactor * uWindStrength * 0.3;


  vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Varyings
  vWorldPos = worldPos.xyz;
  vUv = uv;
}
