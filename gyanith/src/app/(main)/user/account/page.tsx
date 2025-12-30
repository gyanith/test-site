"use client";
import { motion } from "framer-motion";
import FloatingLines from "@/components/FloatingLines";
import Dither from "@/components/Dither";

const page = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "circInOut" }}
      className="w-screen h-screen flex items-center justify-center "
    >
      <div className="absolute inset-0 w-screen h-screen -z-10">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      <div className="w-120 flex h-120 rounded-2xl bg-black"></div>
    </motion.div>
  );
};

export default page;
