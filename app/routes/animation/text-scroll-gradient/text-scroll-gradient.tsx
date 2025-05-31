import { Paragraph } from './Paragraph';
import { Character } from './Character';
import { Word } from './Word';
import { useSmoothScroll } from '~/utils/useSmoothScroll';

const paragraph = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`;

const Page = () => {
  useSmoothScroll();
  return (
    <>
      <div className='h-screen'></div>
      <Paragraph paragraph={paragraph} />
      <div className='h-screen'></div>
      <Word paragraph={paragraph} />
      <div className='h-screen'></div>
      <Character paragraph={paragraph} />
      <div className='h-screen'></div>
    </>
  );
};

export default Page;
