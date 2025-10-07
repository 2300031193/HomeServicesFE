import React from "react";
import { motion } from "framer-motion";

export default function LoadingPlaceholder({ rows = 3, className = "" }) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <motion.div
          key={i}
          className="bg-gray-200 rounded-lg h-4"
          animate={reduceMotion ? {} : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}