import { useEffect, useRef } from 'react';
import { initParticlesScene } from './initParticlesScene';

const Particles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = initParticlesScene(container);
    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className='w-screen h-screen relative'>
      <h1 className='absolute top-0 left-0'>Particles</h1>
    </div>
  );
};

export default Particles;
