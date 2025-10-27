import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, Hospital } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hospitals = [
    { name: 'Apollo Hospital', phone: '+91 98765 43210', location: 'Chennai' },
    { name: 'Fortis Healthcare', phone: '+91 99887 77665', location: 'Bengaluru' },
    { name: 'AIIMS', phone: '+91 98123 45678', location: 'New Delhi' },
    { name: 'Lilavati Hospital', phone: '+91 99234 56789', location: 'Mumbai' },
    { name: 'CMC Vellore', phone: '+91 98765 12345', location: 'Vellore' },
    { name: 'Manipal Hospital', phone: '+91 99888 11223', location: 'Bangalore' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div data-testid="contact-page" className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 data-testid="contact-heading" className="text-5xl font-bold text-white mb-4">
            Get in <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-300">We're here to help and answer any questions</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Nearby Hospitals */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            data-testid="hospitals-section"
          >
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/30 mr-4">
                  <Hospital className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Nearby Hospitals</h2>
              </div>
              <p className="text-gray-300 mb-6">Emergency contact numbers for major hospitals</p>
              
              <div className="space-y-4">
                {hospitals.map((hospital, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    data-testid={`hospital-${index}`}
                    className="bg-[#1E293B] border border-cyan-500/20 rounded-2xl p-4 hover:border-cyan-500/40 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{hospital.name}</h3>
                        <div className="flex items-center text-gray-300 text-sm mb-1">
                          <MapPin className="w-4 h-4 mr-1 text-cyan-400" />
                          {hospital.location}
                        </div>
                        <div className="flex items-center text-cyan-400 font-semibold">
                          <Phone className="w-4 h-4 mr-1" />
                          <a href={`tel:${hospital.phone}`} className="hover:text-cyan-300 transition-colors">
                            {hospital.phone}
                          </a>
                        </div>
                      </div>
                      <a
                        href={`tel:${hospital.phone}`}
                        className="p-2 bg-cyan-500/20 rounded-lg hover:bg-cyan-500/30 transition-colors"
                      >
                        <Phone className="w-5 h-5 text-cyan-400" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            data-testid="contact-form-section"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/30 mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              </div>
              
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  data-testid="success-message"
                  className="flex flex-col items-center justify-center py-12"
                >
                  <CheckCircle2 className="w-20 h-20 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300 text-center">Thank you for reaching out. We'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      data-testid="name-input"
                      required
                      className="w-full px-4 py-3 bg-[#1E293B] border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      data-testid="email-input"
                      required
                      className="w-full px-4 py-3 bg-[#1E293B] border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      data-testid="message-input"
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-[#1E293B] border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none"
                      placeholder="Your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    data-testid="submit-button"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-8 pt-6 border-t border-cyan-500/20">
                <p className="text-gray-300 text-center">
                  Email us directly at: <span className="text-cyan-400 font-semibold">support@apx-ai.com</span>
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Contact;