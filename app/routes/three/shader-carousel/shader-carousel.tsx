import { useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ExperimentLayout } from "~/components/experiment-layout";
import type { ExperimentMeta } from "~/lib/experiment-meta";
import { TransitionPlane, transitionNames } from "./transition-plane";

const experimentMeta: ExperimentMeta = {
  title: "Shader Transitions",
  subtitle: "GLSL Image-to-Image Transitions",
  description:
    "A fullscreen image carousel where each transition between images uses a different GLSL shader effect. The four transitions — displacement, noise dissolve, morph distortion, and glitch — all run on the GPU, blending two textures simultaneously through a progress uniform.\n\nNavigation via click or arrow keys triggers the next transition, cycling through the effects. Each shader receives both the current and next image as textures, giving it full control over how pixels blend.",
  techStack: [
    "Three.js",
    "React Three Fiber",
    "GLSL",
    "Multi-texture Blending",
  ],
  keyLearnings: [
    "Passing two textures to a fragment shader lets you create transitions impossible with CSS — the shader controls every pixel's blend independently.",
    "Simplex noise is the backbone of organic-looking effects — displacement maps, dissolve patterns, and edge detection all derive from it.",
    "Recompiling shaders at runtime (swapping fragmentShader + needsUpdate) lets you cycle through effects without multiple materials.",
  ],
};

// Placeholder images — replace with real ones
const images = [
  "/images/buenos-aires.webp",
  "/images/london.webp",
  "/images/madrid.webp",
  "/images/new-york.webp",
  "/images/paris.webp",
];

export default function ShaderCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionIndex, setTransitionIndex] = useState(0);

  const transitionType = transitionNames[transitionIndex % transitionNames.length];

  const goToNext = useCallback(() => {
    if (transitioning) return;
    const next = (currentIndex + 1) % images.length;
    setNextIndex(next);
    setTransitioning(true);
  }, [currentIndex, transitioning]);

  const goToPrev = useCallback(() => {
    if (transitioning) return;
    const prev = (currentIndex - 1 + images.length) % images.length;
    setNextIndex(prev);
    setTransitioning(true);
  }, [currentIndex, transitioning]);

  const handleTransitionComplete = useCallback(() => {
    setCurrentIndex(nextIndex);
    setTransitioning(false);
    setTransitionIndex((i) => i + 1);
  }, [nextIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToNext, goToPrev]);

  return (
    <ExperimentLayout meta={experimentMeta}>
      <div
        className="w-screen h-screen bg-black relative cursor-pointer select-none"
        onClick={goToNext}
      >
        <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
          <TransitionPlane
            images={images}
            currentIndex={currentIndex}
            nextIndex={nextIndex}
            transitioning={transitioning}
            transitionType={transitionType}
            onTransitionComplete={handleTransitionComplete}
          />
        </Canvas>

        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">
          {/* Top: transition type */}
          <div className="flex justify-center">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">
              {transitionType}
            </span>
          </div>

          {/* Bottom: image counter + nav hint */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-light tabular-nums text-white/80">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-white/30">
                / {String(images.length).padStart(2, "0")}
              </span>
            </div>

            <span className="text-xs text-white/30">
              Click or press arrows
            </span>
          </div>
        </div>

        {/* Side navigation arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Previous"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Next"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </ExperimentLayout>
  );
}
