import { useState } from "react";
import { useMousePosition } from "./useMousePosition";
import { motion } from "motion/react";

const MaskCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <div className="h-screen">
      <motion.div
        className="w-full h-full flex items-center justify-center text-6xl font-semibold absolute bg-[#ec4e39] cursor-default text-black"
        style={{
          maskSize: "40px",
          maskImage: "url(/masks/mask.svg)",
          WebkitMaskImage: "url(/masks/mask.svg)",
          maskRepeat: "no-repeat",
        }}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <p
          className="w-[1000px] p-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          A software engineer - with skills that haven&apos;t been replaced by
          A.I (yet) - making good shit only if the paycheck is equally good.
        </p>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center text-[#afa18f] font-semibold text-6xl">
        <p className="w-[1000px] p-10">
          I&apos;m a <span className="text-[#ec4e39]">selectively skilled</span>{" "}
          software engineer with strong focus on producing high quality &
          impactful digital experience.
        </p>
      </div>
    </div>
  );
};

export default MaskCursor;
