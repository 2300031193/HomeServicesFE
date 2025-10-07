import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { gsap } from "gsap";

const AnimatedBackground = ({
  variant = "default",
  intensity = "medium",
  className = "",
  children
}) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Dynamic background opacity based on mouse position
  const bgOpacity = useTransform(mouseX, [0, windowSize.width], [0.1, 0.2]);
  const bgGradient = useTransform(mouseY, [0, windowSize.height], [0, 360]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Initialize particles
  useEffect(() => {
    if (intensity === "off") return;

    const particleCount = intensity === "high" ? 8 : intensity === "low" ? 3 : 5;

    const generateParticles = () => {
      return Array.from({ length: particleCount }, (_, i) => ({
        id: `particle-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 300 + 200,
        rotation: Math.random() * 360,
        speed: Math.random() * 20 + 10,
        color: ['orange', 'pink', 'blue', 'purple'][Math.floor(Math.random() * 4)],
        shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
      }));
    };

    setParticles(generateParticles());

    // Animate particles
    const tl = gsap.timeline({ repeat: -1 });

    particles.forEach((particle, i) => {
      tl.fromTo(
        `.particle-${i}`,
        {
          x: particle.x + '%',
          y: particle.y + '%',
          scale: 0,
          opacity: 0,
          rotation: particle.rotation
        },
        {
          x: (particle.x + Math.random() * 20 - 10) + '%',
          y: (particle.y + Math.random() * 20 - 10) + '%',
          scale: 1,
          opacity: 0.3,
          rotation: particle.rotation + 360,
          duration: particle.speed,
          ease: "none"
        },
        i * 0.5
      );
    });

    return () => {
      tl.kill();
    };
  }, [intensity]);

  const Particle = ({ particle, index }) => {
    const colorMap = {
      orange: 'from-orange-400 to-pink-500',
      pink: 'from-pink-400 to-purple-500',
      blue: 'from-blue-400 to-cyan-500',
      purple: 'from-purple-400 to-pink-500'
    };

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-xl',
      triangle: 'transform rotate-45'
    };

    return (
      <motion.div
        className={`absolute pointer-events-none particle-${index}`}
        style={{ zIndex: -1 }}
      >
        <div
          className={`w-4 h-4 ${shapeClasses[particle.shape]} bg-gradient-to-r ${colorMap[particle.color]} opacity-30 blur-sm`}
          style={{
            width: particle.size,
            height: particle.size
          }}
        />
      </motion.div>
    );
  };

  const GeometricShapes = () => {
    if (variant !== "geometric") return null;

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        {/* Large floating circles */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 border border-orange-200/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="absolute top-60 right-32 w-80 h-80 border border-pink-200/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating squares */}
        <motion.div
          className="absolute bottom-40 left-1/3 w-64 h-64 border border-blue-200/20"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 border border-purple-200/20 transform rotate-45"
          animate={{
            rotate: [45, 135, 225, 315, 405],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    );
  };

  const GradientOrbs = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic gradient orbs that follow mouse */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-orange-400/10 to-pink-500/10 rounded-full blur-3xl"
          style={{
            left: mouseX,
            top: mouseY,
            x: '-50%',
            y: '-50%'
          }}
        />

        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/8 to-purple-500/8 rounded-full blur-3xl"
          style={{
            right: mouseX,
            bottom: mouseY,
            x: '50%',
            y: '50%'
          }}
        />

        {/* Static larger orbs */}
        <motion.div
          className="absolute top-10 left-10 w-[600px] h-[600px] bg-gradient-to-br from-orange-300/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-pink-300/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    );
  };

  const GridPattern = () => {
    if (variant !== "grid") return null;

    return (
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(251, 146, 60, 0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    );
  };

  const renderBackground = () => {
    switch (variant) {
      case "particles":
        return (
          <>
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${bgGradient}deg, rgba(251, 146, 60, ${bgOpacity}) 0%, rgba(219, 39, 119, ${bgOpacity}) 50%, rgba(59, 130, 246, ${bgOpacity}) 100%)`,
                opacity: 0.1
              }}
            />
            {particles.map((particle, index) => (
              <Particle key={particle.id} particle={particle} index={index} />
            ))}
          </>
        );

      case "geometric":
        return <GeometricShapes />;

      case "minimal":
        return (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-white to-pink-50/30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );

      case "grid":
        return <GridPattern />;

      default:
        return (
          <>
            <GradientOrbs />
            <AnimatePresence>
              {intensity !== "off" && (
                <motion.div
                  className="absolute inset-0"
                  style={{ zIndex: -1 }}
                  animate={{
                    background: [
                      "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(251, 146, 60, 0.1), transparent 40%)",
                      "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(236, 72, 153, 0.08), transparent 50%)",
                      "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.05), transparent 30%)",
                      "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(251, 146, 60, 0.1), transparent 40%)"
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </AnimatePresence>

            {/* Subtle animated borders */}
            <motion.div
              className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
            />

            <motion.div
              className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-orange-400 via-pink-500 to-blue-500"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: 1.1 }}
            />

            <motion.div
              className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-pink-500 to-orange-400"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: 1.4 }}
            />
          </>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        "--mouse-x": `${(mousePosition.x / windowSize.width) * 100}%`,
        "--mouse-y": `${(mousePosition.y / windowSize.height) * 100}%`
      }}
    >
      {renderBackground()}

      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;