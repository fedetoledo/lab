import { useEffect, useRef } from 'react';
import { initTextScene } from './initTextScene';

const Text = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = initTextScene(container);
    return cleanup;
  }, []);

  return (
    <div ref={containerRef} className='w-screen h-screen relative'>
      <h1 className='absolute top-0 left-0'>3D Text</h1>
    </div>
  );
};
export default Text;
