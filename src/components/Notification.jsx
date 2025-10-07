import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationType = {
  success: { bg: 'bg-green-500', icon: '✓' },
  error: { bg: 'bg-red-500', icon: '✕' },
  info: { bg: 'bg-blue-500', icon: 'ℹ' },
  warning: { bg: 'bg-yellow-500', icon: '⚠' }
};

export default function Notification({ type = 'info', message, duration = 5000, onClose }) {
  const [visible, setVisible] = useState(true);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (duration && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, visible, onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose && onClose();
  };

  const config = NotificationType[type] || NotificationType.info;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -20, scale: 0.95 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 text-white rounded-lg shadow-lg max-w-sm ${config.bg}`}
          role="alert"
          aria-live="polite"
        >
          <span className="text-lg font-bold" aria-hidden="true">
            {config.icon}
          </span>
          <p className="flex-1 text-sm">{message}</p>
          <button
            onClick={handleClose}
            className="ml-2 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded"
            aria-label="Close notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}