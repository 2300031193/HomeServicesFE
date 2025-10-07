import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export default function ServiceCard({ service, index = 0, variant = "default" }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const cardY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // 3D rotation based on mouse
  const rotateX = useTransform(cardY, [-100, 100], [10, -10]);
  const rotateY = useTransform(cardX, [-100, 100], [-10, 10]);

  // Dynamic shadow based on hover
  const shadowY = useTransform(cardY, [-100, 100], [0, 20]);
  const shadowOpacity = useSpring(isHovered ? 1 : 0, { stiffness: 400, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;

      mouseX.set(deltaX);
      mouseY.set(deltaY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    if (cardRef.current) {
      cardRef.current.addEventListener('mousemove', handleMouseMove);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('mousemove', handleMouseMove);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY]);

  let cardClasses = "relative group overflow-hidden cursor-pointer";
  let wrapperClasses = "relative h-full";

  if (variant === "featured") {
    cardClasses += " bg-gradient-to-br from-white via-orange-50/30 to-white border border-orange-100/50";
    wrapperClasses += " p-8";
  } else if (variant === "minimal") {
    cardClasses += " bg-white border border-gray-100";
    wrapperClasses += " p-6";
  } else {
    cardClasses += " bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100/50 transition-all duration-500";
    wrapperClasses += " p-6";
  }

  const cardVariants = {
    default: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 }
    },
    featured: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, delay: index * 0.15 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cardClasses}
      style={{
        x: cardX,
        y: cardY,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000
      }}
      variants={cardVariants[variant] || cardVariants.default}
      initial="initial"
      animate="animate"
      whileHover={{
        rotateX: [0, 5, 0],
        rotateY: [0, 5, 0],
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-pink-500/5"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Hover particles */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-orange-400/30"
                initial={{
                  x: mousePosition.x - (cardRef.current?.getBoundingClientRect()?.left || 0),
                  y: mousePosition.y - (cardRef.current?.getBoundingClientRect()?.top || 0),
                  scale: 0,
                  opacity: 0
                }}
                animate={{
                  x: mousePosition.x - (cardRef.current?.getBoundingClientRect()?.left || 0) + Math.random() * 40 - 20,
                  y: mousePosition.y - (cardRef.current?.getBoundingClientRect()?.top || 0) + Math.random() * 40 - 20,
                  scale: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className={wrapperClasses}>
        <div className="relative z-10">

          {/* Service Icon */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Icon container with glow */}
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-red-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />

                {/* Icon glow effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-20' : ''
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-pink-300 blur-lg"></div>
                </div>

                {/* Main icon */}
                <motion.span
                  className="relative text-3xl font-bold text-white drop-shadow-lg z-10"
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                    rotate: isHovered ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.span>
              </div>

              {/* Floating ring effect */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-orange-400/30"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Price badge */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg">
                ₹{service.price}
              </div>

              {/* Price glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 blur-sm opacity-0"
                animate={{ opacity: isHovered ? 0.6 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* Service content */}
          <div className="space-y-4">
            <motion.h3
              className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300"
              animate={{ scale: isHovered ? 1.02 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {service.title}
            </motion.h3>

            <motion.p
              className="text-gray-600 leading-relaxed text-sm"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {service.short}
            </motion.p>

            {/* Included features preview */}
            {service.includes && service.includes.length > 0 && (
              <motion.div
                className="mt-4 pt-4 border-t border-gray-100/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-wrap gap-2">
                  {service.includes.slice(0, 2).map((feature, featureIndex) => (
                    <motion.span
                      key={featureIndex}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <span className="text-green-500">✓</span>
                      {feature.replace(/^- /, '').substring(0, 15)}...
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Call to action */}
          <div className="mt-6 pt-6 border-t border-gray-100/50">
            <Link to={`/service/${service.id}`} className="block">
              <motion.button
                className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(251, 146, 60, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: isHovered ? ['-100%', '100%'] : '-100%'
                  }}
                  transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
                />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Book Now</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: isHovered ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </span>
              </motion.button>
            </Link>

            {/* View details link */}
            <motion.div
              className="mt-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to={`/service/${service.id}`}
                className="inline-flex items-center gap-1 text-gray-600 hover:text-orange-600 text-sm font-medium transition-colors duration-200"
              >
                <span>View Details</span>
                <motion.svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: isHovered ? 2 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-black/5 pointer-events-none"
        style={{
          y: shadowY,
          opacity: shadowOpacity,
          filter: "blur(20px)"
        }}
      />
    </motion.div>
  );
}