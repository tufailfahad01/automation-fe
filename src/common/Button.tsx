import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:from-blue-700 hover:via-purple-700 hover:to-blue-600 transition-all duration-300 font-semibold text-base tracking-wide disabled:opacity-50 disabled:cursor-not-allowed font-outfit glow-hover transform hover:scale-[1.02] active:scale-[0.98] border border-blue-400/30"
    {...props}
  >
    {children}
  </button>
);

export default Button;
