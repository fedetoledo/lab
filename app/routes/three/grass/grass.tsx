import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import { GrassBlades } from "./components/grass-blade";
import { WindLines } from "./components/wind-line";
import { ExperimentLayout } from "~/components/experiment-layout";
import type { ExperimentMeta } from "~/lib/experiment-meta";

const experimentMeta: ExperimentMeta = {
  title: "Grass Field",
  subtitle: "Instanced Meshes + Custom Shaders",
  description:
    "A procedurally generated grass field rendered with 50,000 instanced blades. Each blade sways independently using vertex shader displacement driven by a wind noise function, creating an organic and immersive landscape effect.\n\nThe scene uses instanced rendering to keep draw calls minimal despite the high blade count. Wind is visualised with animated line particles that sweep across the field, reinforcing the sense of direction and flow.",
  techStack: [
    "Three.js",
    "React Three Fiber",
    "Drei",
    "GLSL",
    "Instanced Meshes",
  ],
  keyLearnings: [
    "InstancedMesh lets you render tens of thousands of objects in a single draw call by varying per-instance attributes like position and rotation.",
    "Vertex shader displacement is ideal for organic motion — you can animate geometry on the GPU without touching JavaScript each frame.",
    "Wind visualisation lines help sell the environment; small ambient details make 3D scenes feel alive.",
  ],
};

const Grass = () => {
  return (
    <ExperimentLayout meta={experimentMeta}>
      <div className="w-screen h-screen">
        <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
          <color attach="background" args={["#141414"]} />
          <ambientLight intensity={1} />

          <mesh rotation-x={-Math.PI / 2}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#48bf53" />
          </mesh>

          <GrassBlades count={50000} size={10} />

          <WindLines count={4} radius={5} />

          <OrbitControls />
          <Sky />
        </Canvas>
      </div>
    </ExperimentLayout>
  );
};

export default Grass;
