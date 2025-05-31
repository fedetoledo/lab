import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export const Word = ({ paragraph }: { paragraph: string }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  });

  const words = paragraph.split(' ');

  return (
    <p ref={container} className='flex flex-wrap px-5 max-w-4xl text-4xl'>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word_ key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word_>
        );
      })}
    </p>
  );
};

const Word_ = ({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className='relative ml-3 mt-3'>
      <span className='absolute opacity-20'>{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
