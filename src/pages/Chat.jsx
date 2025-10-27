import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, Volume2, VolumeX, Loader2, Bot } from 'lucide-react';
import axios from 'axios';
import { saveConversation } from '../lib/firebase';

const BACKEND_URL = 'https://apx-ai-backend.onrender.com';
const API = `${BACKEND_URL}/api`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId] = useState(() => `conv-${Date.now()}`);
  const [showWelcome, setShowWelcome] = useState(true);

  const recognitionRef = useRef(null);
  const synthesisRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;      // stop automatically after pause
    recognition.interimResults = false;  // only final transcript
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log(transcript);
      if (!transcript) return;
      setInputMessage(transcript);
      handleSendMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => recognition.stop();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setShowWelcome(false);
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.6;   // faster
    utterance.pitch = 0.8;  // slightly higher for clarity
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    synthesisRef.current = utterance;
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() || isLoading) return;

    setShowWelcome(false);
    setIsLoading(true);

    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const { data } = await axios.post(`${API}/chat`, {
        message: messageText,
        conversation_id: conversationId,
      });

      const aiMessage = { role: 'assistant', content: data.response || 'Please call emergency services.' };
      setMessages(prev => [...prev, aiMessage]);
      speakText(aiMessage.content);

      // Save asynchronously to Firebase
      saveConversation(messageText, aiMessage.content, conversationId).catch(console.error);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg = { role: 'assistant', content: 'Connection error. Call emergency services if urgent.' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-8">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Emergency AI Assistant</h1>
          <p className="text-gray-300">Voice or text - We're here to help</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1E293B]/50 backdrop-blur-xl border border-cyan-500/20 rounded-3xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
          
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {showWelcome && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/40">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Welcome to APX AI</h2>
                  <p className="text-gray-300 mb-6 max-w-md">
                    I'm your emergency assistant. Click the microphone to speak or type your emergency below.
                  </p>
                  <button onClick={toggleListening}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                    <Mic className="w-5 h-5 inline mr-2" />Start Voice Call
                  </button>
                </motion.div>
              )}

              {messages.map((msg, i) => <MessageBubble key={i} message={msg} isUser={msg.role === 'user'} />)}

              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-cyan-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AI is thinking...</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-cyan-500/20 p-4 bg-[#0F172A]/50 flex items-center gap-3">
            <button onClick={toggleListening} disabled={isLoading}
              className={`p-4 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-r from-cyan-500 to-blue-600'}`}>
              {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
            </button>

            <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress} placeholder="Type your emergency or use voice..."
              disabled={isListening || isLoading}
              className="flex-1 px-4 py-3 bg-[#1E293B] border border-cyan-500/30 rounded-full text-white placeholder-gray-400" />

            <button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}
              className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
              <Send className="w-6 h-6 text-white" />
            </button>

            <button onClick={isSpeaking ? stopSpeaking : null} disabled={!isSpeaking}
              className={`p-4 rounded-full ${isSpeaking ? 'bg-green-500' : 'bg-gray-600'}`}>
              {isSpeaking ? <Volume2 className="w-6 h-6 text-white" /> : <VolumeX className="w-6 h-6 text-white" />}
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-center">
          <p className="text-red-400 font-semibold">⚠️ Always call emergency services for life-threatening situations</p>
        </motion.div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message, isUser }) => (
  <motion.div initial={{ opacity: 0, x: isUser ? 20 : -20 }} animate={{ opacity: 1, x: 0 }}
    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${isUser
      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none'
      : 'bg-[#1E293B] text-gray-100 border border-cyan-500/20 rounded-bl-none'}`}>
      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
    </div>
  </motion.div>
);

export default Chat;
