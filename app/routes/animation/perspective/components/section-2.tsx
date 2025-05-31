import { MotionValue, motion, useTransform } from 'motion/react';
import pic1 from '/images/neon.webp';

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const Section2 = ({ scrollYProgress }: Props) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);
  return (
    <motion.div
      style={{ scale, rotate }}
      className='relative h-screen bg-black'
    >
      <img src={pic1} alt='img' />
    </motion.div>
  );
};
