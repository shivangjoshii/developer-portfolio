"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeLine = ({ delay, duration }) => (
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: "100%", opacity: 1 }}
    transition={{ delay, duration }}
    className="h-4 w-full rounded-full bg-gradient-to-r from-violet-500/20 to-transparent mb-2"
  />
);

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [text, setText] = useState("");
  const fullText = "Portfolio Loading...";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    let currentIndex = 0;
    const textInterval = setInterval(() => {
      setText(fullText.slice(0, currentIndex));
      currentIndex++;
      if (currentIndex > fullText.length) {
        clearInterval(textInterval);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d1224]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative w-full max-w-md mx-auto">
        {/* 3D Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-4 w-8 h-8 bg-violet-500/20 rounded-full animate-float-slow" />
          <div className="absolute top-1/3 -right-4 w-6 h-6 bg-pink-500/20 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-violet-500/20 rounded-full animate-float-slow" style={{ animationDelay: "2s" }} />
          <motion.div
            className="absolute top-1/2 right-1/3 w-10 h-10 border-2 border-pink-500/20 rounded"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-[#1a1b23]/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-violet-500/10"
          style={{
            transform: "perspective(1000px) rotateX(10deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-1 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>

          {/* Code-like Animation */}
          <div className="space-y-2 mb-6">
            <CodeLine delay={0.2} duration={0.5} />
            <CodeLine delay={0.4} duration={0.6} />
            <CodeLine delay={0.6} duration={0.4} />
          </div>

          {/* Logo Container with 3D effect */}
          <div 
            className="relative w-24 h-24 mx-auto mb-6 transform-gpu transition-transform duration-500 hover:scale-110"
            style={{
              transform: "translateZ(20px)",
            }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 animate-pulse transform-gpu" 
                 style={{ transform: "translateZ(-10px)" }} />
            <div className="absolute inset-[2px] rounded-xl bg-[#0d1224] flex items-center justify-center backdrop-blur-sm">
              <span className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-pink-500 text-transparent bg-clip-text">
                PK
              </span>
            </div>
          </div>

          {/* Typing Effect */}
          <div className="text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500 text-lg font-mono">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                _
              </motion.span>
            </span>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full mt-6"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};


export default SplashScreen;