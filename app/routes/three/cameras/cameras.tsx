import { useEffect, useRef } from "react";
import { initCamerasScene } from "./initCamerasScene";

const Cameras = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = initCamerasScene(container);
    return cleanup;
  }, []);

  return <div ref={containerRef} className="w-screen h-screen relative"></div>;
};
export default Cameras;
