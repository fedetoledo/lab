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
    title: "Particles",
    url: "/three-js-journey/particles",
    description:
      "Interactive 3D particle system with dynamic animations and mouse-driven interactions built with Three.js.",
    gradient: "from-violet-500/20 via-purple-900/10 to-transparent",
    accent: "group-hover:shadow-violet-500/20",
    icon: (
      <svg viewBox="0 0 48 48" className="size-8 text-violet-400/60">
        <circle cx="24" cy="24" r="2" fill="currentColor" />
        <circle cx="14" cy="16" r="1.5" fill="currentColor" opacity="0.7" />
        <circle cx="34" cy="14" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="10" cy="30" r="1" fill="currentColor" opacity="0.4" />
        <circle cx="36" cy="32" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="20" cy="36" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
        <circle cx="18" cy="24" r="1" fill="currentColor" opacity="0.3" />
        <circle cx="38" cy="22" r="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Zoom Parallax",
    url: "/animation/zoom-parallax",
    description:
      "Images that scale and transform at different rates as you scroll, creating a cinematic depth effect.",
    gradient: "from-amber-500/20 via-orange-900/10 to-transparent",
    accent: "group-hover:shadow-amber-500/20",
    icon: (
      <svg viewBox="0 0 48 48" className="size-8 text-amber-400/60">
        <rect
          x="8"
          y="12"
          width="32"
          height="24"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="14"
          y="16"
          width="20"
          height="14"
          rx="1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <rect
          x="20"
          y="20"
          width="8"
          height="6"
          rx="1"
          fill="currentColor"
          opacity="0.3"
        />
      </svg>
    ),
  },
];
