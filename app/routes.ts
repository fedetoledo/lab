import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),

  // Three JS Journey
  ...prefix('three-js-journey', [
    index('routes/three/three-js-journey.tsx'),
    route('shaders', 'routes/three/shaders/shaders.tsx'),
  ]),

  // Web Animation
  ...prefix('animation', [
    index('routes/animation/animation.tsx'),
    route('text-rollup', 'routes/animation/text-rollup/text-rollup.tsx'),
    route('sticky-cursor', 'routes/animation/sticky-cursor/sticky-cursor.tsx'),
    route('perspective', 'routes/animation/perspective/perspective.tsx'),
  ]),
] satisfies RouteConfig;
