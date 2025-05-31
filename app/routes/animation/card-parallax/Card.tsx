import { motion, MotionValue, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

interface Props {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  i: number;
  progress: MotionValue<number>;
  targetScale: number;
  range: number[];
}

export const Card = ({
  title,
  description,
  link,
  color,
  i,
  progress,
  targetScale,
  range,
}: Props) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        className='flex flex-col relative w-[1000px] h-[500px] rounded-[25px] p-12 origin-top'
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <h2 className='text-center m-0 text-2xl'>{title}</h2>
        <div className='flex h-full mt-12 gap-12'>
          <div className='w-[40%] relative top-[10%]'>
            <p>{description}</p>
            <span className='flex items-center gap-2'>
              <a
                className='text-xs underline cursor-pointer'
                href={link}
                target='_blank'
              >
                See more
              </a>
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>

          <div className='relative w-[60%] h-[100%] rounded-[25px] overflow-hidden'>
            <motion.div style={{ scale: imageScale }} className='w-full h-full'>
              {/* Image */}
              <img src={link} alt='image' />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
