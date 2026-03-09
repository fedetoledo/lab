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
    <>
      <div ref={containerRef} className='w-full h-full relative' />
    </>
  );
};
export default Text;
