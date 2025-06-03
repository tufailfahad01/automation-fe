import React from 'react';

const Loader: React.FC<{ text?: string }> = ({ text }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
    <div className="flex flex-col items-center gap-8">
      <div className="relative flex items-center justify-center h-24 w-24">
        {/* Outer spinner */}
        <span className="absolute h-24 w-24 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-400 animate-spin-slow shadow-2xl glow" style={{ boxShadow: '0 4px 40px 0 rgba(96,165,250,0.3)' }}></span>
        {/* Middle spinner */}
        <span className="absolute h-16 w-16 rounded-full border-4 border-transparent border-b-purple-500 border-l-blue-400 animate-spin-reverse"></span>
        {/* Inner spinner */}
        <span className="absolute h-8 w-8 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-300 animate-spin"></span>
        {/* Center dot */}
        <span className="relative h-4 w-4 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-cyan-400 shadow-lg animate-pulse"></span>
      </div>
      {text && (
        <div className="glass px-6 py-3 rounded-2xl">
          <span className="text-xl text-gray-100 font-semibold font-outfit tracking-wide">{text}</span>
        </div>
      )}
    </div>
    <style jsx global>{`
      @keyframes spin-slow {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 2s linear infinite;
      }
      @keyframes spin-reverse {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
      }
      .animate-spin-reverse {
        animation: spin-reverse 1.5s linear infinite;
      }
    `}</style>
  </div>
);

export default Loader;
