import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { Pane } from "tweakpane";
import { ExperimentLayout } from "~/components/experiment-layout";
import * as THREE from "three/webgpu";
import {
  hash,
  instanceIndex,
  mix,
  mx_noise_float,
  positionLocal,
  texture,
  time,
  uv,
  vec3,
} from "three/tsl";
import { mergeBufferGeometries } from "three-stdlib";
import { useEffect, useMemo, useRef } from "react";
import { color, uniform } from "three/tsl";

extend(THREE as any);

const generateBushPlanes = (count = 40) => {
  const planes = [];

  for (let i = 0; i < count; i++) {
    const plane = new THREE.PlaneGeometry(0.8, 0.8);

    const spherical = new THREE.Spherical(
      0.35 + Math.random() * 0.15,
      Math.PI * 2 * Math.random(),
      Math.PI * Math.random(),
    );
    const position = new THREE.Vector3().setFromSpherical(spherical);

    plane.rotateY(Math.random() * Math.PI * 2);
    plane.rotateX((Math.random() - 0.5) * Math.PI * 0.6);
    plane.rotateZ((Math.random() - 0.5) * Math.PI * 0.6);
    plane.translate(position.x, position.y, position.z);

    // Creates the normals
    const normal = position.clone().normalize();
    const normalArray = new Float32Array(12);
    for (let i = 0; i < 4; i++) {
      const i3 = i * 3;
      const position = new THREE.Vector3(
        plane.attributes.position.array[i3],
        plane.attributes.position.array[i3 + 1],
        plane.attributes.position.array[i3 + 2],
      );
      const mixedNormal = position.lerp(normal, 0.85);
      normalArray[i3] = mixedNormal.x;
      normalArray[i3 + 1] = mixedNormal.y;
      normalArray[i3 + 2] = mixedNormal.z;
    }

    plane.setAttribute("normal", new THREE.BufferAttribute(normalArray, 3));
    planes.push(plane);
  }

  return mergeBufferGeometries(planes);
};

const Bush = () => {
  return (
    <ExperimentLayout
      meta={{
        title: "Bush",
        subtitle: "Instanced Meshes + Custom Shaders",
        description:
          "A procedurally generated bush rendered with instanced planes. Each plane sways independently using vertex shader displacement driven by a wind noise function, creating an organic and immersive effect.\n\nThe scene uses instanced rendering to keep draw calls minimal despite the high plane count. Wind is visualised with animated line particles that sweep across the bush, reinforcing the sense of direction and flow.",
        techStack: [
          "Three.js",
          "React Three Fiber",
          "Drei",
          "TSL",
          "Instanced Meshes",
        ],
        keyLearnings: [
          "InstancedMesh lets you render tens of thousands of objects in a single draw call by varying per-instance attributes like position and rotation.",
          "Vertex shader displacement is ideal for organic motion — you can animate geometry on the GPU without touching JavaScript each frame.",
          "Wind visualisation lines help sell the environment; small ambient details make 3D scenes feel alive.",
        ],
      }}
    >
      <div className="w-screen h-screen">
        <Canvas
          camera={{ position: [0, 2, 8], fov: 60 }}
          shadows
          gl={async (props) => {
            const renderer = new THREE.WebGPURenderer(props as any);
            await renderer.init();
            return renderer;
          }}
        >
          <OrbitControls />
          <SkyDome />
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-12}
            shadow-camera-right={12}
            shadow-camera-top={12}
            shadow-camera-bottom={-12}
            shadow-camera-near={0.5}
            shadow-camera-far={40}
            shadow-bias={-0.0005}
          />
          <axesHelper />
          <Content />
        </Canvas>
      </div>
    </ExperimentLayout>
  );
};

const SkyDome = () => {
  const dir = positionLocal.normalize();
  const skyColor = mix(
    vec3(0.7, 0.85, 1.0),
    vec3(0.1, 0.3, 0.75),
    dir.y.clamp(0, 1),
  );

  return (
    <mesh>
      <sphereGeometry args={[400, 32, 16]} />
      <meshBasicNodeMaterial colorNode={skyColor} side={THREE.BackSide} />
    </mesh>
  );
};

const Content = () => {
  const map = useTexture("/masks/bush-texture.png");
  const opacityNode = texture(map, uv()).r;

  const colorAUniform = useMemo(() => uniform(color("#3a6b2a")), []);
  const colorBUniform = useMemo(() => uniform(color("#6da84f")), []);

  useEffect(() => {
    const params = { dark: "#3a6b2a", light: "#6da84f" };
    const pane = new Pane({ title: "Bush" });
    pane
      .addBinding(params, "dark", { label: "Dark" })
      .on("change", ({ value }) => {
        colorAUniform.value.set(value);
      });
    pane
      .addBinding(params, "light", { label: "Light" })
      .on("change", ({ value }) => {
        colorBUniform.value.set(value);
      });
    return () => pane.dispose();
  }, [colorAUniform, colorBUniform]);

  const instanceOffset = hash(instanceIndex).mul(100.0);
  const colorNoise = mx_noise_float(positionLocal.mul(2.0).add(instanceOffset))
    .mul(0.5)
    .add(0.5);
  const colorNode = mix(colorAUniform, colorBUniform, colorNoise);

  const instancePhase = hash(instanceIndex).mul(Math.PI * 2);
  const windInput = positionLocal.xz
    .mul(0.5)
    .add(time.mul(0.3).add(instancePhase));
  const wind = mx_noise_float(windInput).mul(positionLocal.y.max(0));

  const bushGeometry = useMemo(() => generateBushPlanes(), []);

  const bushPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const count = 24;
    const minRadius = 1.5;
    const maxRadius = 9;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      positions.push(
        new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius),
      );
    }
    return positions;
  }, []);

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    bushPositions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.position.y += 0.5;
      dummy.rotation.y = Math.random() * Math.PI * 2;
      const scale = 0.7 + Math.random() * 0.6;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [bushPositions, dummy]);

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4a7c3f" roughness={0.9} metalness={0} />
      </mesh>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, bushPositions.length]}
        castShadow
        receiveShadow
      >
        <bufferGeometry attach="geometry" {...bushGeometry} />
        <meshBasicNodeMaterial
          alphaTest={0.5}
          colorNode={colorNode}
          opacityNode={opacityNode}
          side={THREE.DoubleSide}
          positionNode={positionLocal.add(vec3(wind, 0, wind))}
        />
      </instancedMesh>
    </>
  );
};

export default Bush;
