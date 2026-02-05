import React, { useState, useRef, useEffect } from 'react';
import { ViewState, ThemeMode } from '../types';
import { DhammaWheel, LotusIcon } from './Icons';
import { Palette, Check, Home, BookOpen, Music, Mail, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, themeMode, setThemeMode }) => {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'Utama', icon: Home },
    { id: 'parita', label: 'Parita', icon: BookOpen },
    { id: 'syair', label: 'Syair', icon: LotusIcon },
    { id: 'lagu', label: 'Lagu', icon: Music },
    { id: 'kontak', label: 'Kontak', icon: Mail },
  ];

  const themeOptions: { id: ThemeMode; label: string; color: string }[] = [
    { id: 'default', label: 'Awal', color: 'bg-slate-950' },
    { id: 'light', label: 'Terang', color: 'bg-white' },
    { id: 'gray', label: 'Abu', color: 'bg-gray-400' },
    { id: 'green', label: 'Hijau', color: 'bg-green-500' }, 
    { id: 'blue', label: 'Biru', color: 'bg-blue-500' }, 
    { id: 'pink', label: 'Pink', color: 'bg-pink-500' }, 
    { id: 'black', label: 'Hitam', color: 'bg-black' },
    { id: 'yellow', label: 'Kuning', color: 'bg-yellow-400' }, 
  ];

  const getCheckColor = (id: ThemeMode) => {
    if (['light', 'yellow', 'gray'].includes(id)) return '!text-black';
    return '!text-white';
  };

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsPaletteOpen(false);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-techno-primary/30 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
              <DhammaWheel className="h-8 w-8 text-techno-gold animate-spin-slow group-hover:text-techno-primary transition-colors" />
              <span className="font-techno font-bold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-techno-gold to-techno-primary">
                DHAMMAPADA
              </span>
            </div>

            <div className="flex items-center">
              <div className="relative mr-6" ref={paletteRef}>
                <button onClick={() => setIsPaletteOpen(!isPaletteOpen)} className="p-2 rounded-full hover:bg-white/10 transition-colors text-techno-primary">
                  <Palette className="w-5 h-5" />
                </button>
                {isPaletteOpen && (
                  <div className="absolute top-12 right-0 w-72 glass-panel border border-white/20 rounded-xl p-4 shadow-2xl grid grid-cols-4 gap-3 z-50">
                    {themeOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setThemeMode(option.id)} 
                        className={`relative w-12 h-12 rounded-full ${option.color} border-2 ${themeMode === option.id ? 'border-techno-primary scale-110 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-slate-500 hover:scale-105'} transition-all flex items-center justify-center`}
                      >
                        {themeMode === option.id && <Check className={`w-5 h-5 ${getCheckColor(option.id)}`} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as ViewState)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${currentView === item.id ? 'text-techno-primary bg-techno-primary/10' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE NAVBAR (Top) --- */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-techno-primary/30 md:hidden flex items-center justify-between px-4 h-14">
         <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
         
         <div className="flex items-center gap-2">
            <DhammaWheel className="h-6 w-6 text-techno-gold animate-spin-slow" />
            <span className="font-techno font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-techno-gold to-techno-primary">
              DHAMMAPADA
            </span>
         </div>
         
         <div className="relative" ref={paletteRef}>
           <button onClick={() => setIsPaletteOpen(!isPaletteOpen)} className="p-2 text-white">
              <Palette className="h-5 w-5" />
            </button>
            {isPaletteOpen && (
              <div className="absolute top-12 right-0 w-64 glass-panel border border-white/20 rounded-xl p-3 shadow-2xl grid grid-cols-4 gap-2 z-50 animate-fade-in">
                 {themeOptions.map((option) => (
                   <button key={option.id} onClick={() => { setThemeMode(option.id); setIsPaletteOpen(false); }} className={`w-10 h-10 rounded-full ${option.color} border ${themeMode === option.id ? 'border-white ring-1 ring-techno-primary' : 'border-slate-500'} flex items-center justify-center`}>
                     {themeMode === option.id && <Check className={`w-4 h-4 ${getCheckColor(option.id)}`} />}
                   </button>
                 ))}
              </div>
            )}
         </div>
      </nav>

      {/* --- MOBILE SIDE DRAWER --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 w-64 h-full bg-slate-900 shadow-2xl animate-slide-in-left border-r border-white/10">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <DhammaWheel className="h-8 w-8 text-techno-gold" />
              <span className="font-techno font-bold text-white tracking-widest text-sm">MENU</span>
            </div>
            <div className="py-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as ViewState)}
                    className={`flex items-center gap-4 w-full px-6 py-4 transition-colors ${currentView === item.id ? 'bg-techno-primary/20 text-techno-primary border-r-4 border-techno-primary' : 'text-slate-300'}`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="fixed bottom-0 left-0 w-full z-50 glass-panel border-t border-white/10 md:hidden pb-safe">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button key={item.id} onClick={() => handleNavClick(item.id as ViewState)} className={`flex flex-col items-center justify-center space-y-1 ${isActive ? 'text-techno-primary' : 'text-slate-400'}`}>
                <div className={`p-1 rounded-full ${isActive ? 'bg-techno-primary/20' : ''}`}><Icon className="w-5 h-5" /></div>
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;