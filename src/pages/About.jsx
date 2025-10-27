import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Users, Target, Code, Database, Server } from 'lucide-react';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div data-testid="about-page" className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 data-testid="about-heading" className="text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">APX AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing emergency response with AI-powered pre-ambulance assistance
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          data-testid="mission-section"
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-12 backdrop-blur-sm">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/30">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To guide, comfort, and protect lives until help arrives. APX AI bridges the critical gap between emergency occurrence and ambulance arrival, providing instant, AI-powered first aid guidance that can mean the difference between life and death.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          data-testid="tech-stack-section"
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Powered by Cutting-Edge Technology</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TechCard
              icon={<Brain className="w-8 h-8" />}
              title="Gemini Flash 2.5"
              description="Google's latest AI model for rapid, accurate emergency response generation"
              testId="tech-gemini"
            />
            <TechCard
              icon={<Server className="w-8 h-8" />}
              title="n8n Automation"
              description="Workflow automation for seamless backend processing and integration"
              testId="tech-n8n"
            />
            <TechCard
              icon={<Database className="w-8 h-8" />}
              title="Firebase"
              description="Real-time conversation storage and anonymous authentication"
              testId="tech-firebase"
            />
            <TechCard
              icon={<Code className="w-8 h-8" />}
              title="React + FastAPI"
              description="Modern web framework for responsive, real-time user experience"
              testId="tech-framework"
            />
            <TechCard
              icon={<Zap className="w-8 h-8" />}
              title="Web Speech API"
              description="Native browser voice recognition and text-to-speech capabilities"
              testId="tech-speech"
            />
            <TechCard
              icon={<Server className="w-8 h-8" />}
              title="Cloud Infrastructure"
              description="Scalable, reliable hosting ensuring 24/7 availability"
              testId="tech-cloud"
            />
          </div>
        </motion.section>

        {/* Problem & Solution */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          data-testid="problem-solution-section"
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-red-400 mb-4">⚠️ The Problem</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Average ambulance response time: 10-15 minutes
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Brain damage begins after 4-6 minutes without oxygen
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Panic and lack of knowledge lead to incorrect actions
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  Language barriers in emergency situations
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">✅ Our Solution</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Instant AI response in under 2 seconds
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Step-by-step first aid guidance
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Calm, reassuring voice to reduce panic
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Multilingual support for global accessibility
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Impact Statistics */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          data-testid="impact-section"
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Real-World Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ImpactCard
              number="67%"
              title="Survival Improvement"
              description="With timely first aid guidance"
              testId="impact-survival"
            />
            <ImpactCard
              number="<2s"
              title="Response Time"
              description="Instant AI assistance"
              testId="impact-response"
            />
            <ImpactCard
              number="24/7"
              title="Availability"
              description="Never offline, always ready"
              testId="impact-availability"
            />
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          data-testid="team-section"
          className="mb-20"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Team APX</h2>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <Users className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
              <p className="text-xl text-gray-300 mb-6">
                A dedicated team of developers, designers, and healthcare professionals working together to save lives through technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 font-medium">Innovation</span>
                <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 font-medium">Compassion</span>
                <span className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-full text-teal-400 font-medium">Excellence</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Buildathon Context */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          data-testid="buildathon-section"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">🏆 Built for Impact</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              APX AI was created as part of a healthcare innovation buildathon, driven by the vision to make emergency assistance accessible to everyone, everywhere, instantly.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

const TechCard = ({ icon, title, description, testId }) => (
  <motion.div
    whileHover={{ y: -8 }}
    data-testid={testId}
    className="bg-[#1E293B] border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all"
  >
    <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const ImpactCard = ({ number, title, description, testId }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    data-testid={testId}
    className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-8 text-center"
  >
    <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-2">
      {number}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default About;