"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-black text-white rounded-full hover:bg-black/80 text-[13px] tracking-tight",
    secondary: "border border-black text-black rounded-full hover:bg-black hover:text-white text-[13px] tracking-tight",
    outline: "border border-black/10 hover:border-black text-black rounded-full text-[13px] tracking-tight",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "px-6 py-2.5 font-heading font-medium transition-all duration-500 flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
