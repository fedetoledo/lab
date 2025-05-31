import { useSmoothScroll } from '~/utils/useSmoothScroll';

const StickyFooter = () => {
  useSmoothScroll();

  return (
    <main>
      <div className='h-screen flex items-center justify-center text-4xl'>
        Intro
      </div>
      <Footer />
    </main>
  );
};

export default StickyFooter;

export const Footer = () => {
  return (
    <div
      className='relative h-[800px] bg-slate-600'
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className='fixed flex flex-col justify-between p-10 bottom-0 h-[800px] w-full'>
        <ul className='flex flex-col gap-4'>
          <li className='cursor-pointer hover:underline hover:translate-x-4 transition duration-300'>
            About
          </li>
          <li className='cursor-pointer hover:underline hover:translate-x-4 transition duration-300'>
            Blog
          </li>
          <li className='cursor-pointer hover:underline hover:translate-x-4 transition duration-300'>
            Portfolio
          </li>
          <li className='cursor-pointer hover:underline hover:translate-x-4 transition duration-300'>
            Contact
          </li>
        </ul>

        <div className='text-center'>
          <p>© 2021</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </div>
  );
};
