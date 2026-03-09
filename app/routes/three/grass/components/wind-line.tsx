import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import vertexShader from "../shaders/wind-line-vertex.glsl";
import fragmentShader from "../shaders/wind-line-fragment.glsl";

const randomPosition = (radius: number): [number, number, number] => {
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.sqrt(Math.random()) * radius;
  return [
    Math.cos(angle) * distance,
    0.5 + Math.random() * 0.3,
    Math.sin(angle) * distance,
  ];
};

const randomScale = (): [number, number, number] => [
  0.5 + Math.random() * 1.5,
  0.3 + Math.random() * 0.4,
  1,
];

const WindLine = ({ radius, offset }: {
  radius: number;
  offset: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const prevCycleRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOffset: { value: offset },
    }),
    [offset],
  );

  useFrame((_state, delta) => {
    uniforms.uTime.value += delta;

    const cycle = Math.floor((uniforms.uTime.value * 0.25 + offset) % 1 === 0
      ? uniforms.uTime.value * 0.25 + offset
      : uniforms.uTime.value * 0.25 + offset);
    const currentCycle = Math.floor(cycle);

    if (currentCycle !== prevCycleRef.current && meshRef.current) {
      prevCycleRef.current = currentCycle;
      const pos = randomPosition(radius);
      const scl = randomScale();
      meshRef.current.position.set(pos[0], pos[1], pos[2]);
      meshRef.current.scale.set(scl[0], scl[1], scl[2]);
    }
  });

  return (
    <mesh ref={meshRef} position={randomPosition(radius)} scale={randomScale()}>
      <planeGeometry args={[3, 1, 32, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const WindLines = ({
  count = 8,
  radius = 5,
}: {
  count?: number;
  radius?: number;
}) => {
  const offsets = useMemo(
    () => Array.from({ length: count }, () => Math.random()),
    [count],
  );

  return (
    <>
      {offsets.map((offset, i) => (
        <WindLine key={i} radius={radius} offset={offset} />
      ))}
    </>
  );
};
