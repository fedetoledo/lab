import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // Three JS Journey
  ...prefix("three-js-journey", [
    index("routes/three/three-js-journey.tsx"),
route("particles", "routes/three/particles/particles.tsx"),
    route("grass", "routes/three/grass/grass.tsx"),
    route(
      "shader-effects",
      "routes/three/shader-transitions/shader-transitions.tsx",
    ),
    route(
      "shader-transitions",
      "routes/three/shader-carousel/shader-carousel.tsx",
    ),
  ]),

  // Web Animation
  ...prefix("animation", [
    index("routes/animation/animation.tsx"),
route("sticky-cursor", "routes/animation/sticky-cursor/sticky-cursor.tsx"),
    route("perspective", "routes/animation/perspective/perspective.tsx"),
    route(
      "parallax-bento",
      "routes/animation/parallax-bento/parallax-bento.tsx",
    ),
    route("mask-cursor", "routes/animation/mask-cursor/mask-cursor.tsx"),
route("zoom-parallax", "routes/animation/zoom-parallax/zoom-parallax.tsx"),
route(
      "text-scroll-gradient",
      "routes/animation/text-scroll-gradient/text-scroll-gradient.tsx",
    ),
  ]),
] satisfies RouteConfig;
