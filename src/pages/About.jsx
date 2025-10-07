import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10"
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About HomeServices</h1>
        <p className="text-xl text-gray-600">
          Connecting homeowners with trusted service professionals since 2023.
        </p>
      </header>

      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4"
            initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To make home services accessible, reliable, and high-quality for everyone. We believe
              that finding trusted professionals shouldn't be difficult, and that's why we've built
              a platform that puts customers first.
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={reduceMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold">Why Choose Us</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Vetted and background-checked professionals</li>
              <li>• Transparent pricing with no hidden fees</li>
              <li>• Real-time tracking and updates</li>
              <li>• Secure payments and insurance coverage</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="bg-accent text-white rounded-xl p-8 text-center"
          initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={reduceMotion ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
          <p className="text-lg mb-6">
            Thousands of homeowners have already found their perfect service provider.
          </p>
          <a href="/register" className="inline-block bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Today
          </a>
        </motion.div>
      </section>
    </motion.div>
  );
}