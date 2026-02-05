
import React, { useState, useRef, useEffect, useCallback } from 'react';
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

  const handleNavClick = useCallback((view: ViewState) => {
    // Tutup UI overlay seketika
    setIsMenuOpen(false);
    setIsPaletteOpen(false);
    // Pindah halaman tanpa jeda
    setView(view);
  }, [setView]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setIsPaletteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDarkMode = themeMode === 'default' || themeMode === 'black';

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] glass-panel border-b border-techno-primary/30 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onPointerDown={() => handleNavClick('home')}>
            <DhammaWheel className="h-8 w-8 text-techno-gold animate-spin-slow" />
            <span className="font-techno font-bold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-techno-gold to-techno-primary">
              DHAMMAPADA
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onPointerDown={() => handleNavClick(item.id as ViewState)}
                  className={`px-3 py-2 rounded-md text-sm font-bold transition-all ${currentView === item.id ? 'text-techno-primary bg-techno-primary/10' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="relative" ref={paletteRef}>
              <button onPointerDown={() => setIsPaletteOpen(!isPaletteOpen)} className="p-2 rounded-full hover:bg-white/10 text-techno-primary">
                <Palette size={20} />
              </button>
              {isPaletteOpen && (
                <div className="absolute top-12 right-0 w-72 glass-panel border border-white/20 rounded-xl p-4 shadow-2xl grid grid-cols-4 gap-3 z-[110]">
                  {themeOptions.map((option) => (
                    <button
                      key={option.id}
                      onPointerDown={() => { setThemeMode(option.id); setIsPaletteOpen(false); }} 
                      className={`relative w-12 h-12 rounded-full ${option.color} border-2 ${themeMode === option.id ? 'border-techno-primary scale-110 shadow-lg' : 'border-slate-500 hover:scale-105'} transition-all flex items-center justify-center`}
                    >
                      {themeMode === option.id && <Check size={20} className={['light', 'yellow', 'gray'].includes(option.id) ? 'text-black' : 'text-white'} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE NAVBAR (Top) */}
      <nav className={`fixed top-0 left-0 w-full z-[100] border-b md:hidden flex items-center justify-between px-4 h-14 ${isDarkMode ? 'bg-slate-900/95 border-techno-primary/30' : 'bg-white/95 border-slate-200'} backdrop-blur-md transition-colors`}>
         <button 
           onPointerDown={() => setIsMenuOpen(!isMenuOpen)} 
           className={`p-2 rounded-lg z-[110] ${isDarkMode ? 'text-techno-primary bg-white/5' : 'text-slate-800 bg-slate-100'}`}
         >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
         
         <div className="flex items-center gap-2" onPointerDown={() => handleNavClick('home')}>
            <DhammaWheel className="h-6 w-6 text-techno-gold animate-spin-slow" />
            <span className="font-techno font-bold text-sm tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-techno-gold to-techno-primary">
              DHAMMAPADA
            </span>
         </div>
         
         <div className="relative" ref={paletteRef}>
           <button onPointerDown={() => setIsPaletteOpen(!isPaletteOpen)} className={`p-2 rounded-lg ${isDarkMode ? 'text-techno-primary' : 'text-slate-800'}`}>
              <Palette size={24} />
            </button>
            {isPaletteOpen && (
              <div className="absolute top-12 right-0 w-64 glass-panel border border-white/20 rounded-xl p-3 shadow-2xl grid grid-cols-4 gap-2 z-[130]">
                 {themeOptions.map((option) => (
                   <button key={option.id} onPointerDown={() => { setThemeMode(option.id); setIsPaletteOpen(false); }} className={`w-10 h-10 rounded-full ${option.color} border ${themeMode === option.id ? 'ring-2 ring-techno-primary' : 'border-slate-500'} flex items-center justify-center`}>
                     {themeMode === option.id && <Check size={16} className={['light', 'yellow', 'gray'].includes(option.id) ? 'text-black' : 'text-white'} />}
                   </button>
                 ))}
              </div>
            )}
         </div>
      </nav>

      {/* MOBILE SIDE DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[120] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onPointerDown={() => setIsMenuOpen(false)}></div>
          <div className={`absolute top-0 left-0 w-72 h-full shadow-2xl border-r ${isDarkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className={`p-6 border-b flex items-center gap-3 ${isDarkMode ? 'border-white/10' : 'border-slate-100'}`}>
              <DhammaWheel className="h-8 w-8 text-techno-gold" />
              <span className={`font-techno font-bold tracking-widest text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>MENU UTAMA</span>
            </div>
            <div className="py-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onPointerDown={() => handleNavClick(item.id as ViewState)}
                    className={`flex items-center gap-4 w-full px-6 py-4 transition-colors ${isActive 
                      ? (isDarkMode ? 'bg-techno-primary/20 text-techno-primary' : 'bg-slate-100 text-techno-primary') 
                      : (isDarkMode ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50')}`}
                  >
                    <Icon size={20} />
                    <span className="font-bold text-base">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION (Optimized with onPointerDown untuk Respon Spontan) */}
      <div className={`fixed bottom-0 left-0 w-full z-50 border-t md:hidden pb-safe ${isDarkMode ? 'bg-slate-900/95 border-white/10' : 'bg-white/95 border-slate-200'} backdrop-blur-md`}>
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button 
                key={item.id} 
                onPointerDown={() => handleNavClick(item.id as ViewState)} 
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-75 active:scale-90 touch-none ${isActive ? 'text-techno-primary' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}
              >
                <Icon size={24} className={isActive ? 'scale-110 text-techno-primary' : 'text-slate-400'} />
                <span className={`text-[10px] font-bold tracking-tight ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
