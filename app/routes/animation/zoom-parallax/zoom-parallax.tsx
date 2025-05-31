import { useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ZoomImage } from './zoom-image';
import { useSmoothScroll } from '~/utils/useSmoothScroll';
import neonImage from '/images/neon.webp';

const ZoomParallax = () => {
  useSmoothScroll();

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: neonImage,
      scale: scale4,
      width: 25,
      height: 25,
    },
    {
      src: neonImage,
      scale: scale5,
      top: -30,
      left: 5,
      width: 35,
      height: 30,
    },
    {
      src: neonImage,
      scale: scale6,
      top: -10,
      left: -25,
      width: 20,
      height: 45,
    },
    {
      src: neonImage,
      scale: scale5,
      left: 27.5,
      width: 25,
      height: 25,
    },
    {
      src: neonImage,
      scale: scale6,
      top: 27.5,
      left: 5,
      width: 20,
      height: 25,
    },
    {
      src: neonImage,
      scale: scale8,
      top: 27.5,
      left: -22.5,
      width: 30,
      height: 25,
    },
    {
      src: neonImage,
      scale: scale9,
      top: 22.5,
      left: 25,
      width: 15,
      height: 15,
    },
  ];

  return (
    <>
      <div ref={container} className='h-[300vh] relative bg-slate-900'>
        <div className='sticky overflow-hidden top-0 h-[100vh]'>
          {pictures.map((picture, index) => (
            <ZoomImage index={index} key={index} {...picture} />
          ))}
        </div>
      </div>
      <div className='h-[100vh]'></div>
    </>
  );
};

export default ZoomParallax;
