export const highlights = [
  {
    title: "Grass Field",
    url: "/three-js-journey/grass",
    description:
      "A 3D grass field with 50,000 animated blades swaying in the wind, rendered with Three.js and custom shaders.",
    gradient: "from-emerald-500/20 via-green-900/10 to-transparent",
    accent: "group-hover:shadow-emerald-500/20",
    icon: (
      <svg viewBox="0 0 48 48" className="size-8 text-emerald-400/60">
        <path
          d="M12 36c0-8 2-16 6-22M20 36c0-10 3-18 8-24M28 36c0-6 2-14 7-20M36 36c0-8-1-14-3-18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Shader Effects",
    url: "/three-js-journey/shader-effects",
    description:
      "A 2×2 grid of images with unique GLSL shader effects on hover — pixelation, distortion, RGB splitting, and wave displacement.",
    gradient: "from-violet-500/20 via-purple-900/10 to-transparent",
    accent: "group-hover:shadow-violet-500/20",
    icon: (
      <svg viewBox="0 0 48 48" className="size-8 text-violet-400/60">
        <rect x="8" y="8" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="26" y="8" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
        <rect x="8" y="26" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <rect x="26" y="26" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Shader Transitions",
    url: "/three-js-journey/shader-transitions",
    description:
      "A fullscreen image carousel with GPU-powered transitions — displacement, noise dissolve, morph, and glitch effects.",
    gradient: "from-amber-500/20 via-orange-900/10 to-transparent",
    accent: "group-hover:shadow-amber-500/20",
    icon: (
      <svg viewBox="0 0 48 48" className="size-8 text-amber-400/60">
        <rect x="6" y="12" width="16" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="26" y="12" width="16" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <path d="M22 24l4-3v6z" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
];
