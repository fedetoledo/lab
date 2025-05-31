import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export const Paragraph = ({ paragraph }: { paragraph: string }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.p className='px-10 text-4xl' ref={container} style={{ opacity }}>
      {paragraph}
    </motion.p>
  );
};
