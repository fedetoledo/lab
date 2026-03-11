import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import displacementFragment from "./shaders/displacement.glsl";
import dissolveFragment from "./shaders/dissolve.glsl";
import morphFragment from "./shaders/morph.glsl";
import glitchFragment from "./shaders/glitch.glsl";

const transitionShaders: Record<string, string> = {
  displacement: displacementFragment,
  dissolve: dissolveFragment,
  morph: morphFragment,
  glitch: glitchFragment,
};

export const transitionNames = Object.keys(transitionShaders);

interface TransitionPlaneProps {
  images: string[];
  currentIndex: number;
  nextIndex: number;
  transitioning: boolean;
  transitionType: string;
  onTransitionComplete: () => void;
}

export function TransitionPlane({
  images,
  currentIndex,
  nextIndex,
  transitioning,
  transitionType,
  onTransitionComplete,
}: TransitionPlaneProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const progressRef = useRef(0);
  const completedRef = useRef(false);
  const { viewport } = useThree();

  const textures = useTexture(images);

  const uniforms = useMemo(
    () => ({
      uTexture1: { value: textures[0] },
      uTexture2: { value: textures[0] },
      uProgress: { value: 0 },
      uTime: { value: 0 },
    }),
    [textures],
  );

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTexture1.value = textures[currentIndex];
    if (transitioning) {
      materialRef.current.uniforms.uTexture2.value = textures[nextIndex];
      materialRef.current.fragmentShader =
        transitionShaders[transitionType] || displacementFragment;
      materialRef.current.needsUpdate = true;
      progressRef.current = 0;
      completedRef.current = false;
    }
  }, [currentIndex, nextIndex, transitioning, transitionType, textures]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    if (transitioning && !completedRef.current) {
      progressRef.current += delta * 0.8;
      if (progressRef.current >= 1) {
        progressRef.current = 1;
        completedRef.current = true;
        onTransitionComplete();
      }
    }

    materialRef.current.uniforms.uProgress.value = progressRef.current;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width * 0.6, viewport.height * 0.6]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={displacementFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}
