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

const effects = [
  { image: "/images/ferrari.webp", effect: "pixelate", label: "Pixelate" },
  {
    image: "/images/redbull.webp",
    effect: "distortion",
    label: "Distortion",
  },
  { image: "/images/audi.webp", effect: "rgb-shift", label: "RGB Shift" },
  { image: "/images/alpine.webp", effect: "wave", label: "Wave" },
];

export default function ShaderEffects() {
  return (
    <ExperimentLayout meta={experimentMeta}>
      <div className="w-screen h-screen bg-black p-6 flex items-center justify-center">
        <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-full max-w-[1400px]">
          {effects.map((item) => (
            <ShaderImage
              key={item.effect}
              imagePath={item.image}
              effect={item.effect}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </ExperimentLayout>
  );
}
