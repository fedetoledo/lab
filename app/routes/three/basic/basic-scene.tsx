import { useEffect, useRef } from "react";
import { initBasicScene } from "./initBasicScene";

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = initBasicScene(container);
    return cleanup;
  }, []);

  return <div ref={containerRef} className="w-screen h-screen relative"></div>;
};

export default ThreeScene;
