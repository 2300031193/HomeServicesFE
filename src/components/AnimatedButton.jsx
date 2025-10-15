import React from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({ children, onClick, className = "", disabled = false, type = "button", ariaLabel }) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.button
      whileHover={reduceMotion ? undefined : { scale: 1.03, rotate: [0, -5, 5, -5, 5, 0], transition: { duration: 0.5 } }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}