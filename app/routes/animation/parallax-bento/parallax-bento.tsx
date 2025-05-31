import { useScroll, useTransform, MotionValue, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from '~/utils/useSmoothScroll';

const images = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-amber-500',
  'bg-gray-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-lime-500',
];

const Page = () => {
  useSmoothScroll();

  const container = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      if (window) {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
      }
    };
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div ref={container}>
      <div className='h-screen bg-[rbg(45,45,45)] flex justify-center items-center'>
        Scroll down
      </div>
      <div className='h-[175vh] overflow-hidden bg-[rgb(45,45,45)]'>
        <div className='relative top-[-12.5vh] h-[200vh] flex gap-[2vw] p-[2vw]'>
          <Column
            images={[images[0], images[1], images[2]]}
            y={y}
            initial={'-45%'}
          />
          <Column
            images={[images[3], images[4], images[5]]}
            y={y2}
            initial={'-95%'}
          />
          <Column
            images={[images[6], images[7], images[8]]}
            y={y3}
            initial={'-45%'}
          />
          <Column
            images={[images[9], images[10], images[11]]}
            y={y4}
            initial={'-75%'}
          />
        </div>
      </div>
      <div className='h-screen bg-[rbg(45,45,45)] flex justify-center items-center'>
        Scroll up
      </div>
    </div>
  );
};

export default Page;

const Column = ({
  images,
  y,
  initial,
}: {
  images: string[];
  y: MotionValue<number>;
  initial: string;
}) => (
  <motion.div
    style={{ y }}
    className='relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw] whitespace-nowrap'
  >
    {images.map((src, i) => {
      return (
        <div
          key={i}
          style={{ top: initial }}
          className={`relative h-1/3 w-full rounded-[1vw] overflow-hidden`}
        >
          <div className={`w-full h-full ${src}`}></div>
          {/* <Image objectFit='cover' src={src} alt='image' fill /> */}
        </div>
      );
    })}
  </motion.div>
);
