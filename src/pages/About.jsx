import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const impactRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // GSAP Animations
    const tl = gsap.timeline();

    // Hero Section Animation
    tl.to(".hero-glow", {
      opacity: 1,
      scale: 1.2,
      duration: 2,
      ease: "power2.out"
    })
    .from(".hero-title .char", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, "-=1")
    .from(".hero-subtitle", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5")
    .from(".hero-stats", {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.3");

    // Story Section Scroll Animations
    gsap.utils.toArray(".story-card").forEach((card, i) => {
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reset"
        }
      });
    });

    // Rotating Elements
    gsap.to(".rotate-slow", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".rotate-fast", {
      rotation: -360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    // Counter Animation
    const counters = gsap.utils.toArray(".counter");
    counters.forEach(counter => {
      const endValue = parseInt(counter.getAttribute("data-count"));
      gsap.fromTo(counter, {
        innerText: 0
      }, {
        innerText: endValue,
        duration: 3,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
          toggleActions: "play none none reset"
        }
      });
    });

    // Morphing Shapes
    gsap.to(".morph-shape", {
      borderRadius: "50%",
      scale: 1.5,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });

    // Pulsing Elements
    gsap.to(".pulse-element", {
      scale: 1.1,
      opacity: 0.7,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
      stagger: 0.5
    });

    // Floating Animation
    gsap.utils.toArray(".float").forEach((element, i) => {
      gsap.to(element, {
        y: "-20px",
        duration: 3 + i,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        delay: i * 0.5
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const storySteps = [
    {
      title: "The Dream",
      content: "In 2023, we saw homeowners struggling to find reliable service providers. Long waits, hidden fees, and questionable quality were the norm.",
      icon: "💡"
    },
    {
      title: "The Solution",
      content: "We built a platform that connects certified professionals directly with homeowners, creating trust, transparency, and reliability.",
      icon: "🎯"
    },
    {
      title: "The Impact",
      content: "Today, thousands of families trust us for their home services. We're not just a platform - we're a movement for better home care.",
      icon: "🏠"
    }
  ];

  const values = [
    {
      title: "Trust First",
      description: "Every professional is thoroughly vetted, insured, and background-checked before joining our platform.",
      icon: "🛡️",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Transparency Always",
      description: "No hidden fees, upfront pricing, and real-time updates throughout your service journey.",
      icon: "👁️",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Quality Guaranteed",
      description: "We stand behind every service with our quality guarantee and satisfaction promise.",
      icon: "✅",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Innovation Driven",
      description: "We continuously improve our technology to make booking and managing home services effortless.",
      icon: "🚀",
      color: "from-orange-500 to-red-500"
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      expertise: "Platform Architecture"
    },
    {
      name: "Sarah Martinez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108755-2616c6b92b92?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      expertise: "Service Management"
    },
    {
      name: "David Kumar",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      expertise: "Technology Innovation"
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-light-cream via-white to-light-yellow">

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-light-yellow to-transparent">
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-charcoal">
              <span className="text-teal-dark">Our</span>{" "}
              <span className="text-charcoal">Story</span>
            </h1>

            <motion.p
              className="text-xl md:text-2xl text-charcoal max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Born from a simple idea: every home deserves exceptional care.
              We've revolutionized how homeowners connect with trusted professionals,
              creating a platform built on trust, transparency, and unwavering quality.
            </motion.p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { label: "Happy Homes", value: "50K+" },
              { label: "Trusted Pros", value: "1,200+" },
              { label: "Cities Served", value: "200+" },
              { label: "5-Star Reviews", value: "98%" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-light-cream rounded-xl p-6 shadow-lg border border-light-yellow"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-teal-dark mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-charcoal">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-dark to-light-yellow mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storySteps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-light-yellow h-full"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-light-yellow rounded-xl flex items-center justify-center text-2xl mb-6 text-teal-dark">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-bold text-charcoal mb-4">{step.title}</h3>
                <p className="text-charcoal leading-relaxed">{step.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section ref={valuesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-light-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">Our Core Values</h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              These principles guide everything we do, from how we select our professionals to how we serve our customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 h-full shadow-lg border border-light-yellow group hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-light-yellow rounded-xl flex items-center justify-center text-3xl mb-6 text-teal-dark">
                  {value.icon}
                </div>

                <h3 className="text-xl font-bold text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">Meet Our Team</h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              The passionate individuals behind HomeServices, dedicated to revolutionizing home care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-light-yellow">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-charcoal mb-1">
                  {member.name}
                </h3>
                <p className="text-teal-dark font-medium mb-2">{member.role}</p>
                <p className="text-charcoal">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={impactRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-dark to-charcoal text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join Our Mission
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "For Homeowners", content: "Get quality service from trusted professionals with complete peace of mind." },
              { title: "For Professionals", content: "Grow your business with our platform while we handle all the complicated parts." },
              { title: "For Communities", content: "We're building stronger communities through better home care services." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-8 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/90">{item.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/register">
              <button className="bg-light-yellow text-charcoal px-12 py-4 rounded-xl font-bold text-xl shadow-lg hover:bg-opacity-80 transition-colors duration-300">
                Start Your Journey Today
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}