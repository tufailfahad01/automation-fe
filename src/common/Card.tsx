import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`glass backdrop-blur-xl border border-gray-700/50 shadow-2xl min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] rounded-3xl p-8 glow hover:shadow-blue-500/10 transition-all duration-500 ${className} font-outfit`}> 
    {children}
  </div>
);

export default Card;
