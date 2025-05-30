import { useRef, useState, type ReactNode } from 'react';
import { Header } from './components/header';
import { StickyCursor } from './components/cursor';

const Page = () => {
  const stickyElement = useRef<HTMLDivElement>(null);
  return (
    <div className='h-screen]'>
      <Header ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
    </div>
  );
};

export default Page;
