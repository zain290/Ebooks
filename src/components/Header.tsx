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
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Explore', path: '/products' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className="w-full bg-[#BDB5D5] py-6 px-8 md:px-16 flex items-center justify-between border-b border-black/5 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-widest text-[#2E1065] capitalize inline-block">
        <ScrollFloat
          tag="span"
          text="Book Shop"
        />
      </Link>

      {/* Center Links */}
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm transition-colors ${
              location.pathname === link.path ? 'text-[#2E1065] font-semibold' : 'text-[#333333] font-medium hover:text-[#2E1065]'
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
          className="px-6 py-2 rounded-full border-2 border-[#2E1065] text-[#2E1065] font-bold text-sm hover:bg-[#2E1065] hover:text-white transition-colors inline-block"
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