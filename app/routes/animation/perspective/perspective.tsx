import { Section1 } from './components/section-1';
import { useScroll } from 'motion/react';
import { useRef } from 'react';
import { useSmoothScroll } from '~/utils/useSmoothScroll';
import { Section2 } from './components/section-2';

const Perspective = () => {
  useSmoothScroll();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });
  return (
    <main ref={container} className='relative h-[200vh]'>
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
      <div className='h-screen' />
    </main>
  );
};

export default Perspective;
