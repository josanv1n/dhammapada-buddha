import React, { useState } from 'react';
import { ViewState, ThemeMode } from '../types';
import { DhammaWheel } from './Icons';
import { Menu, X, Palette } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, themeMode, setThemeMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { id: ViewState; label: string }[] = [
    { id: 'home', label: 'Utama' },
    { id: 'parita', label: 'Parita' },
    { id: 'syair', label: 'Syair' },
    { id: 'lagu', label: 'Lagu' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMenuOpen(false);
  };

  const cycleTheme = () => {
    if (themeMode === 'pattern') setThemeMode('mono');
    else if (themeMode === 'mono') setThemeMode('gradient');
    else setThemeMode('pattern');
  };

  const getThemeIconColor = () => {
    switch(themeMode) {
      case 'mono': return 'text-gray-400';
      case 'gradient': return 'text-techno-accent';
      default: return 'text-techno-primary';
    }
  };

  // Hanya tampilkan tombol tema jika berada di halaman bacaan (bukan home/kontak)
  const showThemeButton = ['parita', 'syair', 'lagu'].includes(currentView);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-techno-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <DhammaWheel className="h-8 w-8 text-techno-gold animate-spin-slow group-hover:text-techno-primary transition-colors" />
            <span className="font-techno font-bold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-techno-gold to-techno-primary">
              DHAMMAPADA
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
             {/* Desktop Theme Button */}
             {showThemeButton && (
                <button 
                  onClick={cycleTheme}
                  className={`mr-6 p-2 rounded-full hover:bg-white/10 transition-colors ${getThemeIconColor()}`}
                  title="Ganti Latar Belakang"
                >
                  <Palette className="w-5 h-5" />
                </button>
             )}

            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    currentView === item.id
                      ? 'text-techno-primary bg-techno-primary/10 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="md:hidden flex items-center gap-2">
            
            {/* Mobile Theme Button (Only visible on content pages) */}
            {showThemeButton && (
              <button
                onClick={cycleTheme}
                className={`p-2 rounded-md hover:bg-white/10 focus:outline-none ${getThemeIconColor()}`}
                title="Ganti Background"
              >
                <Palette className="h-6 w-6" />
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-techno-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
                  currentView === item.id
                    ? 'text-techno-primary bg-techno-primary/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;