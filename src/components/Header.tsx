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
    <header 
      className="w-full py-6 px-8 md:px-16 flex items-center justify-between border-b sticky top-0 z-50 transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-nav-border)' }}
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-widest capitalize inline-block transition-colors duration-700 ease-in-out" style={{ color: 'var(--color-text)' }}>
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
            className="text-sm font-medium transition-colors duration-700 ease-in-out hover:opacity-100"
            style={{ 
              color: location.pathname === link.path ? 'var(--color-text)' : 'var(--color-muted)',
              fontWeight: location.pathname === link.path ? '600' : '500'
            }}
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
          className="px-6 py-2 rounded-full border-2 font-bold text-sm transition-all duration-700 ease-in-out inline-block hover:scale-105"
          style={{ 
            borderColor: 'var(--color-text)', 
            color: 'var(--color-background)',
            backgroundColor: 'var(--color-text)'
          }}
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