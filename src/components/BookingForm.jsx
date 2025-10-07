import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";

export default function BookingForm({ service, onSubmit, onCancel }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    notes: ""
  });

  const totalSteps = 3;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(totalSteps, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const stepContent = {
    1: (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Select Date</h4>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => updateForm("date", e.target.value)}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
          min={new Date().toISOString().split('T')[0]}
          required
          aria-label="Select booking date"
        />
        {formData.date && <p className="text-sm text-gray-600">Selected: {new Date(formData.date).toLocaleDateString()}</p>}
      </div>
    ),
    2: (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Service Details</h4>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
          <input
            type="time"
            id="time"
            value={formData.time}
            onChange={(e) => updateForm("time", e.target.value)}
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
            required
            aria-label="Select preferred time"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Service Address</label>
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => updateForm("address", e.target.value)}
            rows={3}
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
            placeholder="Enter your full address"
            required
            aria-label="Enter service address"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Additional Notes (Optional)</label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => updateForm("notes", e.target.value)}
            rows={2}
            className="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-accent focus:outline-none"
            placeholder="Any special instructions or details"
            aria-label="Additional service notes"
          />
        </div>
      </div>
    ),
    3: (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Confirm & Pay</h4>
        <div className="bg-gray-50 p-4 rounded-md space-y-2">
          <p><strong>Service:</strong> {service.title}</p>
          <p><strong>Date:</strong> {formData.date ? new Date(formData.date).toLocaleDateString() : 'Not selected'}</p>
          <p><strong>Time:</strong> {formData.time || 'Not selected'}</p>
          <p><strong>Address:</strong> {formData.address || 'Not provided'}</p>
          {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
        </div>
        <div className="bg-yellow-50 p-3 rounded-md text-sm">
          <strong>Payment Notice:</strong> This is a demo app. In a real application, secure payment processing would be implemented here.
        </div>
      </div>
    )
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-2 w-12 rounded-full ${i + 1 <= step ? 'bg-accent' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={reduceMotion ? {} : { opacity: 0, x: 20 }}
        animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
        exit={reduceMotion ? {} : { opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {stepContent[step]}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        {step > 1 ? (
          <AnimatedButton onClick={prevStep} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            Back
          </AnimatedButton>
        ) : (
          <div />
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            aria-label="Cancel booking"
          >
            Cancel
          </button>
          {step < totalSteps ? (
            <AnimatedButton onClick={nextStep}>Next</AnimatedButton>
          ) : (
            <AnimatedButton onClick={handleSubmit} ariaLabel="Confirm booking">
              Confirm Booking
            </AnimatedButton>
          )}
        </div>
      </div>
    </div>
  );
}