import { motion, MotionValue } from 'motion/react';

interface Props {
  index: number;
  scale: MotionValue<number>;
  src: string;
  width: number;
  height: number;
  top?: number;
  left?: number;
}

export const ZoomImage = ({ scale, src, width, height, top, left }: Props) => {
  const styles = {
    width: `${width}vw`,
    height: `${height}vh`,
    top: top ? `${top}vh` : undefined,
    left: left ? `${left}vw` : undefined,
  };

  return (
    <motion.div
      className='w-full h-full top-0 absolute flex items-center justify-center'
      style={{ scale }}
    >
      <div className='relative' style={styles}>
        <img src={src} alt='picture' className='w-full h-full rounded-lg' />
      </div>
    </motion.div>
  );
};
