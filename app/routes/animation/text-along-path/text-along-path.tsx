import { useSmoothScroll } from '~/utils/useSmoothScroll';
import { MotionValue, motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import Logo1 from '/images/1.jpg';
import Logo2 from '/images/2.jpg';
import Logo3 from '/images/3.jpg';
import Logo4 from '/images/4.jpg';
import Logo5 from '/images/5.jpg';

const TextAlongPath = () => {
  useSmoothScroll();

  return (
    <main>
      <div className='h-[100vh] flex items-center justify-center text-4xl'>
        Scroll down
      </div>
      <Footer />
    </main>
  );
};

export default TextAlongPath;

const logos = [Logo1, Logo2, Logo3, Logo4, Logo5];

export const Footer = () => {
  const container = useRef(null);
  const paths = useRef<Array<SVGTextPathElement | null>>([null, null, null]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    scrollYProgress.on('change', (e) => {
      paths.current.forEach((path, i) => {
        path?.setAttribute('startOffset', -40 + i * 40 + e * 40 + '%');
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={container}>
      <svg className='w-full mb-40' viewBox='0 0 250 90'>
        <path
          id='curve'
          fill='none'
          d='m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68'
        />
        <text className='text-[6px] uppercase' style={{ fill: 'green' }}>
          {[...Array(3)].map((_, i) => {
            return (
              <textPath
                ref={(ref) => {
                  paths.current[i] = ref;
                }}
                key={i}
                startOffset={i * 40 + '%'}
                href='#curve'
              >
                Curabitur mattis efficitur velit
              </textPath>
            );
          })}
        </text>
      </svg>
      <Logos scrollProgress={scrollYProgress} />
    </div>
  );
};

const Logos = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  const y = useTransform(scrollProgress, [0, 1], [-225, 0]);

  return (
    <div className='h-[250px] bg-black overflow-hidden'>
      <motion.div
        style={{ y }}
        className={
          'h-full bg-black flex justify-center gap-10 items-center p-10'
        }
      >
        {logos.map((logo, i) => (
          <img
            alt='image'
            key={`img_${i}`}
            className='w-[80px] h-[80px]'
            src={logo}
          />
        ))}
      </motion.div>
    </div>
  );
};
