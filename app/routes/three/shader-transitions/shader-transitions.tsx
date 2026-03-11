import { Canvas } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { ExperimentLayout } from "~/components/experiment-layout";
import type { ExperimentMeta } from "~/lib/experiment-meta";
import { ShaderImage } from "./shader-image";

const experimentMeta: ExperimentMeta = {
  title: "Shader Effects",
  subtitle: "GLSL Image Effects on Hover",
  description:
    "A 2×2 grid of images, each with a unique shader effect triggered on mouse hover. The effects — pixelation, barrel distortion, RGB channel splitting, and wave displacement — all run entirely on the GPU via custom fragment shaders.\n\nEach shader receives a progress uniform that smoothly interpolates on hover, plus mouse position for effects that follow the cursor. The result is buttery-smooth, resolution-independent image effects with zero JavaScript per-pixel work.",
  techStack: [
    "Three.js",
    "React Three Fiber",
    "GLSL",
    "Custom Fragment Shaders",
  ],
  keyLearnings: [
    "Fragment shaders let you manipulate every pixel independently on the GPU — ideal for real-time image effects.",
    "Smooth transitions come from lerping a progress uniform each frame rather than snapping values on hover.",
    "UV-space mouse tracking gives shader effects a natural, interactive feel without raycasting complexity.",
  ],
};

const gap = 0.08;

const effects = [
  { image: "/images/ferrari.webp", effect: "pixelate", label: "Pixelate" },
  { image: "/images/redbull.webp", effect: "distortion", label: "Distortion" },
  { image: "/images/alpine.webp", effect: "rgb-shift", label: "RGB Shift" },
  { image: "/images/audi.webp", effect: "wave", label: "Wave" },
];

function Scene() {
  const { viewport } = useThree();

  const cellW = (viewport.width - gap) / 2;
  const cellH = (viewport.height - gap) / 2;

  const positions: [number, number, number][] = [
    [-(cellW + gap) / 2, (cellH + gap) / 2, 0],
    [(cellW + gap) / 2, (cellH + gap) / 2, 0],
    [-(cellW + gap) / 2, -(cellH + gap) / 2, 0],
    [(cellW + gap) / 2, -(cellH + gap) / 2, 0],
  ];

  return (
    <>
      {effects.map((item, i) => (
        <ShaderImage
          key={item.effect}
          imagePath={item.image}
          effect={item.effect}
          position={positions[i]}
          size={[cellW, cellH]}
        />
      ))}
    </>
  );
}

export default function ShaderEffects() {
  return (
    <ExperimentLayout meta={experimentMeta}>
      <div className="w-screen h-screen bg-black relative">
        <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
          <Scene />
        </Canvas>

        {/* Labels */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2">
          {effects.map((item) => (
            <div key={item.effect} className="flex items-end justify-start p-5">
              <span className="text-xs font-medium tracking-wider uppercase text-white/50">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ExperimentLayout>
  );
}
