import { MotionValue, useTransform, motion } from 'motion/react';
import pic1 from 'app/assets/images/neon.webp';

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const Section1 = ({ scrollYProgress }: Props) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div
      style={{ scale, rotate }}
      className='sticky top-0 h-screen bg-[#C72626] text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]'
    >
      <p>Scroll Perspective</p>
      <div className='flex gap-4'>
        <p>Section</p>
        <div className='relative w-[12.5vw]'>
          <img src={pic1} alt='img' />
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
};
