import { useEffect, useRef } from "react";
import { initParticlesScene } from "./initParticlesScene";
import { ExperimentLayout } from "~/components/experiment-layout";
import type { ExperimentMeta } from "~/lib/experiment-meta";

const experimentMeta: ExperimentMeta = {
  title: "Particles",
  subtitle: "Vanilla Three.js Particle System",
  description:
    "A GPU-friendly particle system built with vanilla Three.js. Thousands of point sprites are positioned in 3D space and animated each frame, producing a dynamic and mesmerising visual.\n\nThe setup bypasses React Three Fiber intentionally — sometimes working directly with the Three.js API gives finer control over the render loop, disposal, and resize handling.",
  techStack: ["Three.js", "WebGL", "JavaScript"],
  keyLearnings: [
    "Points geometry with BufferAttributes is the most efficient way to render large particle sets — each particle is a single vertex.",
    "Managing your own animation loop with requestAnimationFrame gives precise control over timing and cleanup.",
    "Proper cleanup (disposing geometries, materials, and the renderer) prevents GPU memory leaks in single-page apps.",
  ],
};

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = initParticlesScene(container);
    return cleanup;
  }, []);

  return (
    <ExperimentLayout meta={experimentMeta}>
      <div ref={containerRef} className="w-screen h-screen relative"></div>
    </ExperimentLayout>
  );
};

export default Particles;
