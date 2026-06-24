import { Canvas } from "@react-three/fiber";
import { ExperimentLayout } from "~/components/experiment-layout";
import type { ExperimentMeta } from "~/lib/experiment-meta";
import { SpainMap } from "./spain-map";

const experimentMeta: ExperimentMeta = {
  title: "Spain Trails",
  subtitle: "Interactive Map with Animated Trails",
  description:
    "An interactive visualization of Spain's map drawn with points, featuring animated trails connecting random points across the map. The map is rendered programmatically and trails are drawn between randomly generated locations to create a dynamic network of connections.",
  techStack: ["React Three Fiber", "Three.js", "Canvas API"],
  keyLearnings: [],
};

const SpainTrails = () => {
  return (
    <ExperimentLayout meta={experimentMeta}>
      <div className="h-screen w-full bg-slate-900">
        <Canvas
          orthographic
          camera={{ zoom: 1, position: [0, 0, 1] }}
        >
          <color attach="background" args={["#0f172a"]} />
          <SpainMap />
        </Canvas>
      </div>
    </ExperimentLayout>
  );
};

export default SpainTrails;
