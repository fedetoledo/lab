import { useMemo, useEffect, useState, useRef, type JSX } from "react";
import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

extend({ Line_: THREE.Line });

declare module "@react-three/fiber" {
  interface ThreeElements {
    line_: JSX.IntrinsicElements["mesh"] & {
      ref?: React.Ref<THREE.Line>;
    };
  }
}

const IMAGE_PATH = "/masks/spain-map.png";
const SAMPLE_STEP = 4;
const POINT_SIZE = 6.0;

const TRAIL_SPEED = 200; // units per second
const TRAIL_ARC_HEIGHT = 40; // peak height of parabolic arc (in Y)
const TRAIL_SEGMENTS = 60;

function sampleImagePoints(
  image: HTMLImageElement,
  step: number,
): Float32Array {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imageData;

  const points: number[] = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a > 128 && b > 100 && r < 100 && g < 100) {
        const px = x - width / 2;
        const py = -(y - height / 2);
        points.push(px, py, 0);
      }
    }
  }

  return new Float32Array(points);
}

function scalePositions(
  positions: Float32Array,
  viewportWidth: number,
  viewportHeight: number,
): Float32Array {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  const mapWidth = maxX - minX;
  const mapHeight = maxY - minY;
  const scaleX = (viewportWidth * 0.8) / mapWidth;
  const scaleY = (viewportHeight * 0.8) / mapHeight;
  const scale = Math.min(scaleX, scaleY);

  const scaled = new Float32Array(positions.length);
  for (let i = 0; i < positions.length; i += 3) {
    scaled[i] = positions[i] * scale;
    scaled[i + 1] = positions[i + 1] * scale;
    scaled[i + 2] = 0;
  }

  return scaled;
}

function getRandomPoint(positions: Float32Array): THREE.Vector2 {
  const pointCount = positions.length / 3;
  const idx = Math.floor(Math.random() * pointCount) * 3;
  return new THREE.Vector2(positions[idx], positions[idx + 1]);
}

/**
 * Builds a parabolic arc between two 2D points.
 * The control point is the midpoint raised in Y by an amount
 * proportional to the horizontal distance.
 */
function buildArcPoints(
  from: THREE.Vector2,
  to: THREE.Vector2,
): THREE.Vector3[] {
  const mid = new THREE.Vector2().addVectors(from, to).multiplyScalar(0.5);
  const dist = from.distanceTo(to);
  const height = Math.min(TRAIL_ARC_HEIGHT, dist * 0.4);

  const control = new THREE.Vector3(mid.x, mid.y + height, 0);
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(from.x, from.y, 0),
    control,
    new THREE.Vector3(to.x, to.y, 0),
  );

  return curve.getPoints(TRAIL_SEGMENTS);
}

const TRAIL_MAX_LENGTH = 40;
const HIGHLIGHT_RADIUS = 8; // how close (in world units) a point must be to glow
const HIGHLIGHT_SIZE = 7.5; // max size of highlighted dot (base * 1.25)
const HIGHLIGHT_DECAY = 3.0; // how fast the glow fades per second

// Shared ref so the map points can read the trail head position
const trailHeadPosition = { x: 0, y: 0 };

function Trail({ positions }: { positions: Float32Array }) {
  const lineRef = useRef<THREE.Line>(null);

  const state = useRef<{
    from: THREE.Vector2;
    to: THREE.Vector2;
    arcPoints: THREE.Vector3[];
    progress: number;
    arcLength: number;
    headIndex: number;
    trail: THREE.Vector3[];
  }>(null!);

  if (!state.current) {
    const from = getRandomPoint(positions);
    const to = getRandomPoint(positions);
    const arcPoints = buildArcPoints(from, to);
    state.current = {
      from,
      to,
      arcPoints,
      progress: 0,
      arcLength: from.distanceTo(to),
      headIndex: 0,
      trail: [],
    };
  }

  useFrame((_, delta) => {
    const s = state.current;
    const step = s.arcLength > 0 ? (TRAIL_SPEED * delta) / s.arcLength : 1;
    s.progress += step;

    if (s.progress >= 1) {
      for (let i = s.headIndex; i <= TRAIL_SEGMENTS; i++) {
        if (s.arcPoints[i]) s.trail.push(s.arcPoints[i]);
      }
      s.from = s.to.clone();
      s.to = getRandomPoint(positions);
      s.arcPoints = buildArcPoints(s.from, s.to);
      s.arcLength = s.from.distanceTo(s.to);
      s.progress = 0;
      s.headIndex = 0;
    }

    const targetIndex = Math.floor(Math.min(s.progress, 1) * TRAIL_SEGMENTS);
    for (let i = s.headIndex; i < targetIndex; i++) {
      if (s.arcPoints[i]) s.trail.push(s.arcPoints[i]);
    }
    s.headIndex = targetIndex;

    const headPoint =
      s.arcPoints[targetIndex] ?? s.arcPoints[s.arcPoints.length - 1];

    // Update shared head position for the map highlight
    trailHeadPosition.x = headPoint.x;
    trailHeadPosition.y = headPoint.y;

    const displayPoints = [...s.trail, headPoint];

    while (displayPoints.length > TRAIL_MAX_LENGTH) {
      displayPoints.shift();
    }
    while (s.trail.length > TRAIL_MAX_LENGTH) {
      s.trail.shift();
    }

    const line = lineRef.current;
    if (line && displayPoints.length >= 2) {
      const geo = new THREE.BufferGeometry().setFromPoints(displayPoints);
      line.geometry.dispose();
      line.geometry = geo;
    }
  });

  return (
    <line_ ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#f59e0b" transparent opacity={0.9} />
    </line_>
  );
}

// Vertex shader: uses per-point size attribute
const pointsVertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aHighlight;
  varying float vHighlight;

  void main() {
    vHighlight = aHighlight;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader: circular point with glow
const pointsFragmentShader = /* glsl */ `
  uniform vec3 uBaseColor;
  uniform vec3 uGlowColor;
  varying float vHighlight;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    vec3 color = mix(uBaseColor, uGlowColor, vHighlight);
    float alpha = mix(0.85, 1.0, vHighlight);

    gl_FragColor = vec4(color, alpha);
  }
`;

export function SpainMap() {
  const [rawPositions, setRawPositions] = useState<Float32Array | null>(null);
  const { viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = IMAGE_PATH;
    img.onload = () => {
      setRawPositions(sampleImagePoints(img, SAMPLE_STEP));
    };
  }, []);

  const scaledPositions = useMemo(() => {
    if (!rawPositions) return null;
    return scalePositions(rawPositions, viewport.width, viewport.height);
  }, [rawPositions, viewport.width, viewport.height]);

  const { geometry, sizesArray, highlightArray } = useMemo(() => {
    if (!scaledPositions)
      return { geometry: null, sizesArray: null, highlightArray: null };
    const pointCount = scaledPositions.length / 3;
    const sizes = new Float32Array(pointCount).fill(POINT_SIZE);
    const highlight = new Float32Array(pointCount).fill(0);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(scaledPositions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aHighlight", new THREE.BufferAttribute(highlight, 1));
    return { geometry: geo, sizesArray: sizes, highlightArray: highlight };
  }, [scaledPositions]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uBaseColor: { value: new THREE.Color("#c7d5ed") },
          uGlowColor: { value: new THREE.Color("#fbbf24") },
        },
        vertexShader: pointsVertexShader,
        fragmentShader: pointsFragmentShader,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  // Each frame: update per-point size + highlight based on trail head proximity
  useFrame((_, delta) => {
    if (!scaledPositions || !sizesArray || !highlightArray || !geometry) return;

    const pointCount = scaledPositions.length / 3;
    const hx = trailHeadPosition.x;
    const hy = trailHeadPosition.y;

    for (let i = 0; i < pointCount; i++) {
      const px = scaledPositions[i * 3];
      const py = scaledPositions[i * 3 + 1];
      const dx = px - hx;
      const dy = py - hy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < HIGHLIGHT_RADIUS) {
        const intensity = 1 - dist / HIGHLIGHT_RADIUS;
        highlightArray[i] = Math.max(highlightArray[i], intensity);
        sizesArray[i] = Math.max(
          sizesArray[i],
          POINT_SIZE + (HIGHLIGHT_SIZE - POINT_SIZE) * intensity,
        );
      } else {
        // Decay back to normal
        highlightArray[i] = Math.max(
          0,
          highlightArray[i] - delta * HIGHLIGHT_DECAY,
        );
        sizesArray[i] =
          POINT_SIZE + (HIGHLIGHT_SIZE - POINT_SIZE) * highlightArray[i];
      }
    }

    geometry.attributes.aSize.needsUpdate = true;
    geometry.attributes.aHighlight.needsUpdate = true;
  });

  if (!scaledPositions || !geometry) return null;

  return (
    <>
      <points ref={pointsRef} geometry={geometry} material={shaderMaterial} />
      <Trail positions={scaledPositions} />
    </>
  );
}
