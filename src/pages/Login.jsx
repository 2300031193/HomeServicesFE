
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimatedButton";

import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const isAdmin = formData.email.toLowerCase().includes("admin");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock validation
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Mock login delay
    setTimeout(() => {
      const isAdminUser = formData.email === "admin@example.com" && formData.password === "admin";
      login(isAdminUser);

      if (isAdminUser) {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <motion.div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
        isAdmin ? "bg-charcoal" : "bg-gradient-to-br from-yellow-500/10 to-green-50"
      }`}
      initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            key={isAdmin ? "admin-title" : "user-title"}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {isAdmin ? "Admin Portal" : "Welcome Back"}
          </motion.h1>
          <p className="text-gray-600">
            {isAdmin ? "Please sign in to manage the platform" : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-300 ${
                isAdmin
                  ? "border-gray-400 focus:ring-teal-dark focus:border-teal-dark"
                  : "border-gray-300 focus:ring-accent focus:border-accent"
              }`}
              placeholder="your@email.com"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-300 ${
                isAdmin
                  ? "border-gray-400 focus:ring-teal-dark focus:border-teal-dark"
                  : "border-gray-300 focus:ring-accent focus:border-accent"
              }`}
              placeholder="••••••••"
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className={`rounded transition-colors duration-300 ${isAdmin ? "text-teal-dark focus:ring-teal-dark" : "text-yellow-500 focus:ring-yellow-500"}`} />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className={`hover:underline transition-colors duration-300 ${isAdmin ? "text-teal-dark" : "text-yellow-500"}`}>Forgot password?</a>
          </div>

          <AnimatedButton 
            type="submit" 
            className={`w-full font-bold py-3 transition-all duration-500 ${isAdmin ? "bg-charcoal text-white hover:bg-teal-dark" : ""}`}
            isSubmitting={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </AnimatedButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className={`font-medium hover:underline transition-colors duration-300 ${isAdmin ? "text-teal-dark" : "text-yellow-500"}`}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
