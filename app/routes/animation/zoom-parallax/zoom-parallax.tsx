import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ZoomImage } from "./zoom-image";
import { useSmoothScroll } from "~/utils/useSmoothScroll";
import neonImage from "/images/neon.webp";
import { ExperimentLayout } from "~/components/experiment-layout";
import type { ExperimentMeta } from "~/lib/experiment-meta";

const experimentMeta: ExperimentMeta = {
  title: "Zoom Parallax",
  subtitle: "Scroll-driven Scale Transforms",
  description:
    'A scroll-driven zoom effect where multiple images scale at different rates as the user scrolls, creating a dramatic parallax zoom into the scene. The images are layered with CSS and each one is bound to a Framer Motion useTransform hook that maps scroll progress to a unique scale value.\n\nThe result is a cinematic "zooming in" transition that feels three-dimensional despite being built entirely with 2D transforms.',
  techStack: [
    "Framer Motion",
    "React",
    "CSS Transforms",
    "Lenis Smooth Scroll",
  ],
  keyLearnings: [
    "useScroll + useTransform from Framer Motion make scroll-linked animations declarative — no manual scroll listeners needed.",
    "Layering elements with different scale multipliers creates convincing depth from flat 2D content.",
    "Lenis smooth scroll adds inertia and polish that makes scroll-based animations feel native and fluid.",
  ],
};

const ZoomParallax = () => {
  useSmoothScroll();

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: neonImage,
      scale: scale4,
      width: 25,
      height: 25,
    },
    {
      src: neonImage,
      scale: scale5,
      top: -30,
      left: 5,
      width: 35,
      height: 30,
    },
    {
      src: neonImage,
      scale: scale6,
      top: -10,
      left: -25,
      width: 20,
      height: 45,
    },
    {
      src: neonImage,
      scale: scale5,
      left: 27.5,
      width: 25,
      height: 25,
    },
    {
      src: neonImage,
      scale: scale6,
      top: 27.5,
      left: 5,
      width: 20,
      height: 25,
    },
    {
      src: neonImage,
      scale: scale8,
      top: 27.5,
      left: -22.5,
      width: 30,
      height: 25,
    },
    {
      src: neonImage,
      scale: scale9,
      top: 22.5,
      left: 25,
      width: 15,
      height: 15,
    },
  ];

  return (
    <ExperimentLayout meta={experimentMeta}>
      <div className="h-[50vh] bg-slate-900" />
      <div ref={container} className="h-[300vh] relative bg-slate-900">
        <div className="sticky overflow-hidden top-0 h-[100vh]">
          {pictures.map((picture, index) => (
            <ZoomImage index={index} key={index} {...picture} />
          ))}
        </div>
      </div>

      {/* Section after zoom completes */}
      <div className="relative z-10 bg-slate-900">
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-8 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light text-white/90">
            Every pixel, in motion.
          </h2>
          <p className="text-lg leading-relaxed text-white/40">
            Scroll-driven animations transform static layouts into cinematic
            experiences. By mapping scroll progress to scale transforms, flat 2D
            images gain a sense of depth and momentum.
          </p>
        </div>
      </div>
    </ExperimentLayout>
  );
};

export default ZoomParallax;
