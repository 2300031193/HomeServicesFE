import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon. (Mock)");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10"
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have questions? We're here to help.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
          animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none"
                required
              />
            </div>
            <AnimatedButton type="submit">Send Message</AnimatedButton>
          </form>
        </motion.div>

        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: 20 }}
          animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl text-accent">📍</span>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">123 Service Street<br />Tech City, TC 12345</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl text-accent">📞</span>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl text-accent">✉️</span>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">hello@homeservices.com</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <span>📘</span>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <span>🐦</span>
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <span>📷</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}