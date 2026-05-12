"use client";

import { motion } from "framer-motion";

export function RotatingPlayButton() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center cursor-pointer group">
      <div className="w-32 h-32 bg-black rounded-full shadow-2xl transition-transform duration-500 group-hover:scale-105" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-32 h-32 overflow-visible">
          <path
            id="circlePath"
            d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
            fill="transparent"
          />
          <text className="text-[6.5px] font-medium uppercase tracking-[0.25em] fill-white/90">
            <textPath xlinkHref="#circlePath" startOffset="0%">
              FLOW IN TIC • FLOW IN TIC • FLOW IN TIC •
            </textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
