'use client';

import { Progress } from '@/components/ui/progress';
import { Logo } from '@/components/ui/logo';
import { FiLoader } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-800 to-blue-800" />
      
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl" />
      
      {/* Loading Content */}
      <div className="relative z-10 max-w-md mx-auto text-center">
        {/* Glassmorphism Container */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center p-2">
                <Logo size="lg" showText={false} className="animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                <FiLoader className="w-3 h-3 text-white animate-spin" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading...
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/80 mb-6 text-sm">
            Preparing your perfect experience
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <Progress 
              value={progress} 
              className="h-2 bg-white/20 border border-white/30"
            />
          </div>

          {/* Progress Text */}
          <div className="flex justify-between text-xs text-white/60 mb-4">
            <span>Starting...</span>
            <span>{Math.round(progress)}%</span>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Bottom Badge */}
        <div className="mt-6 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-white text-sm font-medium">Developed by Dafon</span>
        </div>
      </div>
    </div>
  );
}