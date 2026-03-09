import { forwardRef } from 'react';
import { Magnetic } from './magnetic';

export const Header = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="flex relative w-full justify-end p-2 cursor-pointer mix-blend-difference z-10">
      <Magnetic>
        <div
          className="relative flex gap-2 flex-col p-7 pointer-events-none before:block before:w-7 before:pointer-events-none before:h-1 before:mix-blend-difference before:bg-white
      after:block after:w-7 after:pointer-events-none after:h-1 after:mix-blend-difference after:bg-white
      "
        >
          <div
            ref={ref}
            className="absolute left-0 top-0 w-full h-full hover:scale-[3] pointer-events-auto"
          ></div>
        </div>
      </Magnetic>
    </div>
  );
});

Header.displayName = 'Header';
