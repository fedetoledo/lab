import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stats } from "@react-three/drei";
import { GrassBlades } from "./components/grass-blade";
import { WindLines } from "./components/wind-line";

const Grass = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <color attach="background" args={["#141414"]} />
        <ambientLight intensity={1} />

        <mesh rotation-x={-Math.PI / 2}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#48bf53" />
        </mesh>

        <GrassBlades count={50000} radius={5} />

        <WindLines count={4} radius={5} />

        <OrbitControls />
        <Sky />
        <Stats showPanel={0} />
      </Canvas>
    </div>
  );
};

export default Grass;
