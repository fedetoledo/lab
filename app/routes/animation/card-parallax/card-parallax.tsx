import { useRef } from 'react';
import { Card } from './Card';
import { projects } from './mock-data';
import { useScroll } from 'motion/react';
import { useSmoothScroll } from '~/utils/useSmoothScroll';

const Page = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useSmoothScroll();
  return (
    <>
      <div ref={container} className='my-[50vh]'>
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={project.title}
              {...project}
              progress={scrollYProgress}
              range={[i / projects.length, 1]}
              targetScale={targetScale}
              i={i}
            />
          );
        })}
      </div>
      <div className='h-screen' />
    </>
  );
};

export default Page;
