import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import { useEffect, useMemo, useRef } from "react";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
  };
};

export function GrassBlades({
  count,
  radius,
}: {
  count: number;
  radius: number;
}) {
  const { nodes } = useGLTF("/assets/grass-blade.glb") as unknown as GLTFResult;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groundPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouseWorldPos = useMemo(() => new THREE.Vector3(), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWindStrength: { value: 0.15 },
      uWindSpeed: { value: 0.6 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.sqrt(Math.random()) * radius;
      dummy.position.set(
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance,
      );
      dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
      dummy.scale.setScalar(0.8 + Math.random() * 0.4);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, radius]);

  useFrame(({ pointer, camera }, delta) => {
    uniforms.uTime.value += delta;
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(groundPlane, mouseWorldPos)) {
      uniforms.uMouse.value.set(mouseWorldPos.x, mouseWorldPos.z);
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[nodes.Plane.geometry, undefined, count]}
    >
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

useGLTF.preload("/assets/grass-blade.glb");
