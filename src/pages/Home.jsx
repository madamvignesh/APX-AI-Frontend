import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Clock, Globe, Headphones, Activity, TrendingUp, Brain, Zap } from 'lucide-react';

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.08),transparent_50%)]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <Activity className="w-4 h-4 mr-2 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Pre-Ambulance Emergency Assistant</span>
            </div>
            
            <h1 data-testid="hero-heading" className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 bg-clip-text text-transparent">
                AI That Cares
              </span>
              <br />
              <span className="text-white">Before the Ambulance Arrives</span>
            </h1>
            
            <p data-testid="hero-description" className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Instant AI-powered emergency guidance when every second counts. Get life-saving first aid instructions through voice or text until help arrives.
            </p>
            
            <Link to="/chat" data-testid="try-ai-button">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
              >
                Try AI Now →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Summary */}
      <section data-testid="about-summary-section" className="py-20 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 data-testid="about-heading" className="text-4xl font-bold text-white mb-4">About APX AI</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              APX AI is your emergency companion powered by advanced AI technology. We provide real-time, voice-activated first aid guidance to help save lives in critical moments before professional help arrives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section data-testid="advantages-section" className="py-20 bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            Why Choose APX AI?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AdvantageCard
              icon={<Clock className="w-8 h-8" />}
              title="Lightning Fast"
              description="Instant AI response in under 2 seconds"
              testId="advantage-fast"
            />
            <AdvantageCard
              icon={<Heart className="w-8 h-8" />}
              title="Always Reliable"
              description="24/7 availability, never offline"
              testId="advantage-reliable"
            />
            <AdvantageCard
              icon={<Globe className="w-8 h-8" />}
              title="Multilingual"
              description="Support for multiple languages"
              testId="advantage-multilingual"
            />
            <AdvantageCard
              icon={<Headphones className="w-8 h-8" />}
              title="Voice-Enabled"
              description="Hands-free voice interaction"
              testId="advantage-voice"
            />
          </div>
        </div>
      </section>

      {/* Benefits - 67% Stat */}
      <section data-testid="benefits-section" className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 p-12 backdrop-blur-sm"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block"
              >
                <TrendingUp className="w-20 h-20 mx-auto mb-6 text-cyan-400" />
              </motion.div>
              <h3 data-testid="stat-heading" className="text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-4">
                67%
              </h3>
              <p className="text-2xl text-white font-semibold mb-4">
                Survival Chance Improvement
              </p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Studies show that timely first aid guidance can improve survival chances by up to 67% in critical emergencies before professional help arrives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section data-testid="how-it-works-section" className="py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            How APX AI Works
          </motion.h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <WorkflowStep
              step="1"
              icon={<Headphones className="w-8 h-8" />}
              title="Voice/Text Input"
              description="Speak or type your emergency"
              testId="workflow-input"
            />
            <WorkflowStep
              step="2"
              icon={<Brain className="w-8 h-8" />}
              title="AI Analysis"
              description="Gemini Flash 2.5 processes instantly"
              testId="workflow-ai"
            />
            <WorkflowStep
              step="3"
              icon={<Zap className="w-8 h-8" />}
              title="Clear Response"
              description="Step-by-step instructions"
              testId="workflow-response"
            />
            <WorkflowStep
              step="4"
              icon={<Activity className="w-8 h-8" />}
              title="Take Action"
              description="Follow guidance until help arrives"
              testId="workflow-action"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section  className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A]" >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 data-testid="cta-heading" className="text-4xl font-bold text-white mb-6">
              Ready to Save Lives?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Try APX AI now and experience instant emergency guidance powered by advanced AI.
            </p>
            <Link to="/chat" data-testid="cta-button">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold rounded-full shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300"
              >
                Start Chat Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const AdvantageCard = ({ icon, title, description, testId }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -8 }}
    data-testid={testId}
    className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300"
  >
    <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const WorkflowStep = ({ step, icon, title, description, testId }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
    transition={{ duration: 0.5, delay: parseInt(step) * 0.1 }}
    data-testid={testId}
    className="relative text-center"
  >
    <div className="relative inline-block mb-4">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-xl opacity-50" />
      <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
        {icon}
      </div>
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-cyan-600 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
        {step}
      </div>
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </motion.div>
);

export default Home;