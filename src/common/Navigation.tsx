import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Summarizer', active: pathname === '/' },
    { href: '/responses', label: 'View Responses', active: pathname === '/responses' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 glass backdrop-blur-xl border-b border-gray-700/50 shadow-2xl z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-8 py-3 rounded-2xl font-semibold text-base transition-all duration-300 font-outfit glow-hover ${
                item.active
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 text-white shadow-2xl animate-pulse-glow border border-blue-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
