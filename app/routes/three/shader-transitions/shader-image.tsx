import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import pixelateFragment from "./shaders/pixelate.glsl";
import distortionFragment from "./shaders/distortion.glsl";
import rgbShiftFragment from "./shaders/rgb-shift.glsl";
import waveFragment from "./shaders/wave.glsl";

const fragmentShaders: Record<string, string> = {
  pixelate: pixelateFragment,
  distortion: distortionFragment,
  "rgb-shift": rgbShiftFragment,
  wave: waveFragment,
};

interface ShaderImageProps {
  imagePath: string;
  effect: string;
  position: [number, number, number];
  size: [number, number];
}

export function ShaderImage({
  imagePath,
  effect,
  position,
  size,
}: ShaderImageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const progressRef = useRef(0);
  const mouseUv = useRef(new THREE.Vector2(0.5, 0.5));

  const texture = useTexture(imagePath);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uProgress: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(viewport.width * 100, viewport.height * 100),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    }),
    [texture, viewport.width, viewport.height],
  );

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const target = hovered ? 1 : 0;
    progressRef.current = THREE.MathUtils.lerp(
      progressRef.current,
      target,
      delta * 4,
    );
    materialRef.current.uniforms.uProgress.value = progressRef.current;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.lerp(mouseUv.current, delta * 6);
  });

  const handlePointerMove = (e: { uv?: THREE.Vector2 }) => {
    if (e.uv) {
      mouseUv.current.set(e.uv.x, e.uv.y);
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <planeGeometry args={[size[0], size[1]]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShaders[effect]}
        uniforms={uniforms}
      />
    </mesh>
  );
}
