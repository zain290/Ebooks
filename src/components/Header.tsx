import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ScrollFloat from './ScrollFloat';

interface HeaderProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Store', path: '/products' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Admin', path: '/admin' } // Keeping Admin for functionality
  ];

  return (
    <header className="w-full bg-[#F9F9F7] py-6 px-8 md:px-16 flex items-center justify-between border-b border-gray-200">
      {/* Logo */}
      <Link to="/" className="text-2xl font-black tracking-widest text-[#1A1A1A] uppercase inline-block">
        <ScrollFloat
          tag="span"
          text="BOOK SHOP"
        />
      </Link>

      {/* Center Links */}
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm font-medium transition-colors ${
              location.pathname === link.path ? 'text-[#1A1A1A] font-bold' : 'text-[#333333] hover:text-[#1A1A1A]'
            }`}
          >
            <ScrollFloat
              tag="span"
              text={link.name}
            />
          </Link>
        ))}
      </nav>

      {/* Right Auth Button */}
      <div className="flex items-center">
        <Link
          to="/login"
          className="px-6 py-2 rounded-full border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold text-sm hover:bg-[#1A1A1A] hover:text-white transition-colors inline-block"
        >
          <ScrollFloat
            tag="span"
            text="Login"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;