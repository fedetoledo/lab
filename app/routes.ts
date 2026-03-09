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
    route("shaders", "routes/three/shaders/shaders.tsx"),
    route("basic-scene", "routes/three/basic/basic-scene.tsx"),
    route("cameras", "routes/three/cameras/cameras.tsx"),
    route("text", "routes/three/text/text.tsx"),
    route("particles", "routes/three/particles/particles.tsx"),
    route("grass", "routes/three/grass/grass.tsx"),
  ]),

  // Web Animation
  ...prefix("animation", [
    index("routes/animation/animation.tsx"),
    route("text-rollup", "routes/animation/text-rollup/text-rollup.tsx"),
    route("sticky-cursor", "routes/animation/sticky-cursor/sticky-cursor.tsx"),
    route("perspective", "routes/animation/perspective/perspective.tsx"),
    route(
      "parallax-bento",
      "routes/animation/parallax-bento/parallax-bento.tsx",
    ),
    route("mask-cursor", "routes/animation/mask-cursor/mask-cursor.tsx"),
    route(
      "text-along-path",
      "routes/animation/text-along-path/text-along-path.tsx",
    ),
    route("card-parallax", "routes/animation/card-parallax/card-parallax.tsx"),
    route("zoom-parallax", "routes/animation/zoom-parallax/zoom-parallax.tsx"),
    route("sticky-footer", "routes/animation/sticky-footer/sticky-footer.tsx"),
    route(
      "text-scroll-gradient",
      "routes/animation/text-scroll-gradient/text-scroll-gradient.tsx",
    ),
  ]),
] satisfies RouteConfig;
