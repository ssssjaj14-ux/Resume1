import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading, 
  progress = 0, 
  message = "Loading CareerPanda..." 
}) => {
  const [currentMessage, setCurrentMessage] = useState(message);

  const loadingMessages = [
    "🐼 Initializing CareerPanda...",
    "🚀 Preparing AI-powered features...",
    "📄 Loading resume templates...",
    "💼 Initializing career portal...",
    "🎨 Setting up portfolio generator...",
    "✨ Finalizing your experience..."
  ];

  useEffect(() => {
    if (!isLoading) return;

    // Slower message rotation for smoother experience
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        const otherMessages = loadingMessages.filter(m => m !== prev);
        return otherMessages[Math.floor(Math.random() * otherMessages.length)] || prev;
      });
    }, 4000);

    // Delayed message change for smoother experience
    const initialDelay = setTimeout(() => {
      setCurrentMessage(loadingMessages[1]);
    }, 3000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(initialDelay);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                y: [null, -100],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 3,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 text-center">
          {/* CareerPanda Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ 
              duration: 2.5, 
              ease: [0.16, 1, 0.3, 1],
              rotate: { 
                type: 'spring',
                damping: 10,
                stiffness: 60,
                mass: 1.5
              }
            }}
            className="mb-8"
          >
            <div className="relative">
              {/* Panda Logo */}
              <motion.div
                animate={{ 
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.08, 1],
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-white to-gray-100 rounded-full flex items-center justify-center shadow-2xl"
              >
                <div className="text-6xl">🐼</div>
              </motion.div>
              
              {/* Glowing Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-32 h-32 mx-auto border-4 border-transparent border-t-white/50 border-r-blue-400/50 rounded-full"
              />
            </div>
          </motion.div>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Career<span className="text-blue-400">Panda</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-white/80 mb-8"
          >
            AI-Powered Career Success Platform
          </motion.p>

          {/* Loading Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mb-8"
          >
            <p className="text-lg text-white/90 mb-2">
              {currentMessage}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            className="w-80 max-w-full mx-auto"
          >
            <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <p className="text-white/70 text-sm mt-2">{Math.round(progress)}% Complete</p>
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="flex justify-center space-x-2 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-white/60 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { icon: "🤖", text: "AI Resume Analysis" },
              { icon: "💼", text: "Smart Job Matching" },
              { icon: "📊", text: "Career Insights" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2 + index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <p className="text-white/80 text-sm">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {['📄', '💼', '🎯', '⭐', '🚀', '💡', '🏆', '📊'][i]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;