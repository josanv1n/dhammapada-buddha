import React, { useState, useRef, useEffect } from 'react';
import { ViewState, ThemeMode } from '../types';
import { DhammaWheel } from './Icons';
import { Menu, X, Palette, Check } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, themeMode, setThemeMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  const navItems: { id: ViewState; label: string }[] = [
    { id: 'home', label: 'Utama' },
    { id: 'parita', label: 'Parita' },
    { id: 'syair', label: 'Syair' },
    { id: 'lagu', label: 'Lagu' },
    { id: 'kontak', label: 'Kontak' },
  ];

  // Definisi 8 Pilihan Warna
  // Menggunakan warna tombol yang lebih kontras (500/400 series) agar terlihat jelas di UI
  const themeOptions: { id: ThemeMode; label: string; color: string }[] = [
    { id: 'default', label: 'Awal', color: 'bg-slate-950' }, // Dark
    { id: 'light', label: 'Terang', color: 'bg-white' },
    { id: 'gray', label: 'Abu', color: 'bg-gray-400' },
    { id: 'green', label: 'Hijau', color: 'bg-green-500' }, 
    { id: 'blue', label: 'Biru', color: 'bg-blue-500' }, 
    { id: 'pink', label: 'Pink', color: 'bg-pink-500' }, 
    { id: 'black', label: 'Hitam', color: 'bg-black' },
    { id: 'yellow', label: 'Kuning', color: 'bg-yellow-400' }, 
  ];

  // Helper untuk menentukan warna checkmark agar kontras dengan tombol
  // Menggunakan !important (!text-...) untuk memastikan warna ini menang dari override global di App.tsx
  const getCheckColor = (id: ThemeMode) => {
    if (['light', 'yellow', 'gray'].includes(id)) return '!text-black';
    return '!text-white';
  };

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMenuOpen(false);
    setIsPaletteOpen(false);
  };

  // Menutup menu palette jika klik di luar area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Tombol tema hanya muncul di halaman bacaan (Parita, Syair, Lagu)
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
            {showThemeButton && (
               <div className="relative mr-6" ref={paletteRef}>
                 <button 
                   onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                   className="p-2 rounded-full hover:bg-white/10 transition-colors text-techno-primary"
                   title="Ganti Warna Latar"
                 >
                   <Palette className="w-5 h-5" />
                 </button>
                 
                 {/* Palette Popup Desktop */}
                 {isPaletteOpen && (
                   <div className="absolute top-10 right-0 w-72 glass-panel border border-white/20 rounded-xl p-4 shadow-2xl grid grid-cols-4 gap-3 z-50">
                     {themeOptions.map((option) => (
                       <button
                         key={option.id}
                         onClick={() => { setThemeMode(option.id); }} 
                         className={`relative w-12 h-12 rounded-full ${option.color} border-2 ${themeMode === option.id ? 'border-techno-primary scale-110 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-slate-500 hover:scale-105'} transition-all flex items-center justify-center`}
                         title={option.label}
                       >
                         {themeMode === option.id && <Check className={`w-5 h-5 ${getCheckColor(option.id)}`} />}
                       </button>
                     ))}
                   </div>
                 )}
               </div>
            )}

            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
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
            
            {showThemeButton && (
              <div className="relative">
                 <button
                    onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                    className={`p-2 rounded-md hover:bg-white/10 focus:outline-none ${isPaletteOpen ? 'text-techno-gold' : 'text-techno-primary'}`}
                    title="Ganti Background"
                  >
                    <Palette className="h-6 w-6" />
                  </button>
              </div>
            )}

            <button
              onClick={() => { setIsMenuOpen(!isMenuOpen); setIsPaletteOpen(false); }}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-techno-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Palette Dropdown (Full width underneath navbar) */}
      {showThemeButton && isPaletteOpen && (
        <div className="md:hidden glass-panel border-t border-b border-white/10 animate-fade-in">
          <div className="px-4 py-4">
            <p className="text-xs text-gray-400 mb-3 text-center uppercase tracking-widest">Pilih Warna Latar</p>
            <div className="grid grid-cols-4 gap-4 justify-items-center">
               {themeOptions.map((option) => (
                 <div key={option.id} className="flex flex-col items-center gap-1">
                   <button
                     onClick={() => { setThemeMode(option.id); }}
                     className={`w-12 h-12 rounded-full ${option.color} border-2 ${themeMode === option.id ? 'border-white ring-2 ring-offset-2 ring-offset-slate-900 ring-techno-primary' : 'border-slate-600'} transition-all flex items-center justify-center shadow-lg`}
                   >
                     {themeMode === option.id && <Check className={`w-6 h-6 ${getCheckColor(option.id)}`} />}
                   </button>
                   <span className="text-[10px] text-gray-400 font-medium">{option.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
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