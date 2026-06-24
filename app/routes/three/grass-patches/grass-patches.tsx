import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { ExperimentLayout } from "~/components/experiment-layout";
import type { ExperimentMeta } from "~/lib/experiment-meta";
import * as THREE from "three";
import { useCallback, useMemo } from "react";

const experimentMeta: ExperimentMeta = {
  title: "Grass Patches",
  subtitle: "",
  description: "",
  techStack: ["Three.js", "React Three Fiber", "Drei"],
  keyLearnings: [],
};

const FLOOR_SIZE = 10;
const GRASS_COUNT = 10000;
const DENSITY_THRESHOLD = 0.5;

const GrassPatches = () => {
  return (
    <ExperimentLayout meta={experimentMeta}>
      <div className="w-screen h-screen">
        <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
          <color attach="background" args={["#141414"]} />
          <ambientLight intensity={1} />
          <OrbitControls />

          <Scene />
        </Canvas>
      </div>
    </ExperimentLayout>
  );
};

export default GrassPatches;

function Scene() {
  const texture = useTexture("/masks/test-3.png");
  const terrainData = useMemo(() => getTerrainData(texture.image), [texture]);

  return (
    <>
      <Floor texture={texture} />
      {terrainData && <GrassField terrainData={terrainData} />}
    </>
  );
}

function Floor({ texture }: { texture: THREE.Texture }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[FLOOR_SIZE, FLOOR_SIZE]} />
      <meshStandardMaterial map={texture} side={2} />
    </mesh>
  );
}

function GrassField({ terrainData }: { terrainData: ImageData }) {
  const { matrices, count } = useMemo(() => {
    const mats: THREE.Matrix4[] = [];
    const half = FLOOR_SIZE / 2;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < GRASS_COUNT; i++) {
      const x = Math.random() * FLOOR_SIZE - half;
      const z = Math.random() * FLOOR_SIZE - half;
      const density = getGrassDensity(terrainData, x, z);

      if (density > DENSITY_THRESHOLD) {
        dummy.position.set(x, 0.25, z);
        dummy.rotation.y = Math.random() * Math.PI;
        dummy.updateMatrix();
        mats.push(dummy.matrix.clone());
      }
    }

    return { matrices: mats, count: mats.length };
  }, [terrainData]);

  const meshRef = useCallback(
    (mesh: THREE.InstancedMesh | null) => {
      if (!mesh) return;
      for (let i = 0; i < matrices.length; i++) {
        mesh.setMatrixAt(i, matrices[i]);
      }
      mesh.instanceMatrix.needsUpdate = true;
    },
    [matrices],
  );
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.1, 0.5]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uCameraPos: new THREE.Uniform({ x: 0, y: 0 }),
        }}
      />
    </instancedMesh>
  );
}

const vertex = `
  varying vec2 vUv;
  void main() {
    // Get instance world position
    vec4 worldPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);

    // Add Y in world space (stays vertical)
    worldPos.y += position.y;

    // Transform to view space
    vec4 viewPos = modelViewMatrix * worldPos;

    // Add X in view space (faces camera)
    viewPos.x += position.x;

    gl_Position = projectionMatrix * viewPos;
    vUv = uv;
  }
`;

const fragment = `
  varying vec2 vUv;
  void main() {
    vec3 root = vec3(0.3, 0.8, 0.5);
    vec3 tip = vec3(0.1, 0.4, 0.1);

    vec3 finalColor = mix(tip, root, vUv.y);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function getTerrainData(image: HTMLImageElement): ImageData | null {
  if (!image || image.naturalWidth === 0) {
    console.log("Image not loaded yet");
    return null;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get canvas context");
    return null;
  }
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function getGrassDensity(
  terrainData: ImageData,
  worldX: number,
  worldZ: number,
): number {
  const u = worldX / FLOOR_SIZE + 0.5;
  const v = worldZ / FLOOR_SIZE + 0.5;

  const pixelX = Math.floor(u * terrainData.width);
  const pixelY = Math.floor(v * terrainData.height);

  const clampedX = Math.max(0, Math.min(terrainData.width - 1, pixelX));
  const clampedY = Math.max(0, Math.min(terrainData.height - 1, pixelY));

  const index = (clampedY * terrainData.width + clampedX) * 4;
  const greenChannelValue = terrainData.data[index + 1];

  return greenChannelValue / 255;
}
