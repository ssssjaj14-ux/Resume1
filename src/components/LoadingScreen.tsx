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
  const [showContent, setShowContent] = useState(false);

  const loadingMessages = [
    "🐼 Initializing CareerPanda...",
    "🚀 Loading AI-powered features...",
    "📄 Preparing resume templates...",
    "💼 Setting up career portal...",
    "🎨 Configuring portfolio generator...",
    "✨ Finalizing your experience..."
  ];

  useEffect(() => {
    if (!isLoading) return;

    // Show content after initial delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Slower, more natural message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 3000);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(messageInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0
              }}
              animate={{
                y: [null, -200],
                scale: [0, Math.random() * 2 + 0.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                repeatType: 'loop',
                delay: Math.random() * 5,
                ease: 'easeInOut'
              }}
            />
          ))}
          
          {/* Gradient orbs */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl"
              style={{
                width: 200 + Math.random() * 300,
                height: 200 + Math.random() * 300,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%'
              }}
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Main Loading Content */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.8 } }}
              className="relative z-10 text-center px-4"
            >
              {/* Enhanced CareerPanda Logo Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ 
                  duration: 2,
                  ease: [0.16, 1, 0.3, 1],
                  rotate: { 
                    type: 'spring',
                    damping: 12,
                    stiffness: 50
                  }
                }}
                className="mb-12"
              >
                <div className="relative">
                  {/* Main Panda Logo */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                      y: [0, -8, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-7xl"
                    >
                      🐼
                    </motion.div>
                  </motion.div>
                  
                  {/* Animated Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-40 h-40 mx-auto border-4 border-transparent border-t-white/40 border-r-blue-400/40 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 w-36 h-36 mx-auto border-2 border-transparent border-b-purple-400/30 border-l-pink-400/30 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Enhanced Brand Name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="mb-8"
              >
                <h1 className="text-6xl sm:text-7xl font-bold text-white mb-4 tracking-tight">
                  Career<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Panda</span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-2xl text-white/90 font-medium"
                >
                  AI-Powered Career Success Platform
                </motion.p>
              </motion.div>

              {/* Enhanced Loading Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mb-12"
              >
                <motion.p
                  key={currentMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8 }}
                  className="text-xl text-white/90 mb-4 font-medium"
                >
                  {currentMessage}
                </motion.p>
              </motion.div>

              {/* Enhanced Progress Bar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
                className="w-96 max-w-full mx-auto mb-8"
              >
                <div className="bg-white/20 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/30 shadow-lg">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-white/80 text-sm font-medium">{Math.round(progress)}% Complete</p>
                  <p className="text-white/60 text-xs">Please wait...</p>
                </div>
              </motion.div>

              {/* Enhanced Loading Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="flex justify-center space-x-3 mb-12"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 bg-white/80 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>

              {/* Enhanced Features Preview */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { icon: "🤖", text: "AI Resume Analysis", desc: "Smart feedback & optimization" },
                  { icon: "💼", text: "Smart Job Matching", desc: "Personalized opportunities" },
                  { icon: "📊", text: "Career Insights", desc: "Data-driven guidance" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 4 + index * 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-xl"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="text-4xl mb-3"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-white font-bold text-lg mb-2">{feature.text}</h3>
                    <p className="text-white/80 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                rotate: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
                rotate: [0, 360, 720]
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              {['📄', '💼', '🎯', '⭐', '🚀', '💡', '🏆', '📊', '🌟', '💻', '🎨', '📈'][i]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;