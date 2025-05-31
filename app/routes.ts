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
    route('basic-scene', 'routes/three/basic/basic-scene.tsx'),
    route('cameras', 'routes/three/cameras/cameras.tsx'),
    route('text', 'routes/three/text/text.tsx'),
  ]),

  // Web Animation
  ...prefix('animation', [
    index('routes/animation/animation.tsx'),
    route('text-rollup', 'routes/animation/text-rollup/text-rollup.tsx'),
    route('sticky-cursor', 'routes/animation/sticky-cursor/sticky-cursor.tsx'),
    route('perspective', 'routes/animation/perspective/perspective.tsx'),
    route(
      'parallax-bento',
      'routes/animation/parallax-bento/parallax-bento.tsx'
    ),
  ]),
] satisfies RouteConfig;
