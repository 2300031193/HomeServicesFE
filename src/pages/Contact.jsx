import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Contact() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // Hero section animation
    tl.fromTo(".hero-title .char",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: "back.out(1.7)"
      }
    )
    .fromTo(".hero-subtitle",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.5"
    )
    // Form section slide in from left
    .fromTo(".contact-form",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.3"
    )
    // Contact info slide in from right
    .fromTo(".contact-info",
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      },
      "-=1"
    )
    // Form elements stagger
    .fromTo(".form-group",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      },
      "-=0.5"
    )
    // Contact cards stagger
    .fromTo(".contact-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out"
      },
      "-=0.8"
    )
    // Social buttons
    .fromTo(".social-buttons",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    gsap.to(".submit-button", {
      scale: 1.05,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    alert("Thank you for your message! We'll get back to you soon. (Mock)");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-light-cream via-white to-light-yellow">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="hero-title text-5xl md:text-6xl font-bold text-charcoal mb-6">
              <span className="char bg-gradient-to-r from-teal-dark to-charcoal bg-clip-text text-transparent">Get</span>{" "}
              <span className="char bg-gradient-to-r from-charcoal to-teal-dark bg-clip-text text-transparent">in</span>{" "}
              <span className="char bg-gradient-to-r from-teal-dark to-charcoal bg-clip-text text-transparent">Touch</span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-charcoal max-w-3xl mx-auto">
              Ready to transform your home? Have questions about our services? We're here to help you every step of the way.
            </p>
          </div>

          <div className="flex justify-center space-x-8 text-sm text-charcoal">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-teal-dark rounded-full mr-2"></span>
              Response within 24 hours
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-teal-dark rounded-full mr-2"></span>
              Free consultation
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-light-yellow rounded-full mr-2"></span>
              Expert support
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div ref={formRef} className="contact-form bg-white rounded-2xl p-8 shadow-lg border border-light-yellow">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-charcoal mb-2">Send us a message</h2>
                <p className="text-charcoal">We'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-light-yellow rounded-lg focus:ring-2 focus:ring-teal-dark focus:border-teal-dark focus:outline-none transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-light-yellow rounded-lg focus:ring-2 focus:ring-teal-dark focus:border-teal-dark focus:outline-none transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-4 py-3 border border-light-yellow rounded-lg focus:ring-2 focus:ring-teal-dark focus:border-teal-dark focus:outline-none transition-colors"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 border border-light-yellow rounded-lg focus:ring-2 focus:ring-teal-dark focus:border-teal-dark focus:outline-none transition-colors"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-button w-full bg-teal-dark text-white py-4 px-6 rounded-lg font-semibold hover:bg-opacity-80 focus:ring-2 focus:ring-teal-dark focus:ring-offset-2 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div ref={contactInfoRef} className="contact-info space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-light-yellow">
                <h2 className="text-2xl font-bold text-charcoal mb-8">Contact Information</h2>

                <div className="space-y-6">
                  <div className="contact-card flex items-start gap-4 p-4 rounded-xl hover:bg-light-cream transition-colors">
                    <div className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center text-2xl">
                      📍
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Address</h3>
                      <p className="text-charcoal">
                        123 Service Lane<br />
                        Tech Valley, CA 94025<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="contact-card flex items-start gap-4 p-4 rounded-xl hover:bg-light-cream transition-colors">
                    <div className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center text-2xl">
                      📞
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                      <p className="text-charcoal">+1 (555) 123-HOME</p>
                      <p className="text-sm text-charcoal">Mon-Fri, 8AM-6PM PST</p>
                    </div>
                  </div>

                  <div className="contact-card flex items-start gap-4 p-4 rounded-xl hover:bg-light-cream transition-colors">
                    <div className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center text-2xl">
                      ✉️
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                      <p className="text-charcoal">hello@homeservices.com</p>
                      <p className="text-sm text-charcoal">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="contact-card flex items-start gap-4 p-4 rounded-xl hover:bg-light-cream transition-colors">
                    <div className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center text-2xl">
                      📋
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">Business Hours</h3>
                      <div className="text-charcoal text-sm">
                        <div className="flex justify-between py-1">
                          <span>Monday - Friday</span>
                          <span>8:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Saturday</span>
                          <span>9:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span>Sunday</span>
                          <span>Emergency Only</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-buttons bg-white rounded-2xl p-8 shadow-lg border border-light-yellow">
                <h3 className="text-xl font-bold text-charcoal mb-6">Follow Us</h3>
                <p className="text-charcoal mb-6">Stay updated with our latest services and tips.</p>

                <div className="flex gap-4">
                  <button className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center hover:bg-teal-dark hover:text-white transition-all duration-300 hover:scale-110">
                    <span className="text-lg">📘</span>
                  </button>
                  <button className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center hover:bg-teal-dark hover:text-white transition-all duration-300 hover:scale-110">
                    <span className="text-lg">🐦</span>
                  </button>
                  <button className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center hover:bg-teal-dark hover:text-white transition-all duration-300 hover:scale-110">
                    <span className="text-lg">📷</span>
                  </button>
                  <button className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center hover:bg-teal-dark hover:text-white transition-all duration-300 hover:scale-110">
                    <span className="text-lg">💼</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}