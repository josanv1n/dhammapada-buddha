
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Verses from './pages/Verses';
import Parita from './pages/Parita';
import Lagu from './pages/Lagu';
import Contact from './pages/Contact';
import { ViewState, ThemeMode } from './types';

// Gaya statis dipisahkan untuk performa maksimal
const LIGHT_MODE_STYLES = `
  .theme-light-active .text-white { color: #1e293b !important; }
  .theme-light-active .text-slate-200 { color: #334155 !important; }
  .theme-light-active .text-slate-300 { color: #475569 !important; }
  .theme-light-active .text-slate-400 { color: #475569 !important; }
  .theme-light-active .text-gray-300 { color: #334155 !important; }
  .theme-light-active .text-gray-400 { color: #475569 !important; }
  .theme-light-active .text-cyan-400 { color: #0891b2 !important; } 
  .theme-light-active .glass-panel {
    background: rgba(255, 255, 255, 0.7) !important;
    border-color: rgba(0,0,0,0.1) !important;
  }
  .theme-light-active nav.glass-panel, 
  .theme-light-active .glass-panel.fixed {
    background: rgba(30, 41, 59, 0.95) !important; 
    border-color: rgba(255, 255, 255, 0.1) !important;
  }
  .theme-light-active nav .nav-link, 
  .theme-light-active nav span, 
  .theme-light-active nav button { color: white !important; }
  .theme-light-active input { background-color: white !important; color: black !important; }
`;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('dhammapada-theme');
    return (savedTheme as ThemeMode) || 'default';
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioStarted = useRef(false);

  // Link yang lebih stabil untuk Audio Streaming
  const musicUrl = "https://josanvin.github.io/josanvin/img/Triratna_Puja.mp3";

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('dhammapada-theme', mode);
  };

  const handleSetView = useCallback((view: ViewState) => {
    setCurrentView(view);
    // Langsung arahkan scroll ke atas saat navigasi
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const startMusic = useCallback(() => {
    if (audioRef.current && !audioStarted.current) {
      audioRef.current.play()
        .then(() => {
          audioStarted.current = true;
        })
        .catch(() => {
          // Gagal autoplay, akan dicoba lagi pada interaksi berikutnya
        });
    }
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      startMusic();
      if (audioStarted.current) {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [startMusic]);

  const isLightMode = ['light', 'gray', 'green', 'blue', 'pink', 'yellow'].includes(themeMode);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home setView={handleSetView} themeMode={themeMode} />;
      case 'syair': return <Verses />;
      case 'parita': return <Parita />;
      case 'lagu': return <Lagu />;
      case 'kontak': return <Contact />;
      default: return <Home setView={handleSetView} themeMode={themeMode} />;
    }
  };

  const renderBackground = () => {
    if (themeMode === 'light') return <div className="absolute inset-0 bg-white"></div>;
    if (themeMode === 'black') return <div className="absolute inset-0 bg-black"></div>;
    if (themeMode === 'gray') return <div className="absolute inset-0 bg-gray-100"></div>;
    if (themeMode === 'green') return <div className="absolute inset-0 bg-green-100"></div>;
    if (themeMode === 'blue') return <div className="absolute inset-0 bg-blue-100"></div>;
    if (themeMode === 'pink') return <div className="absolute inset-0 bg-pink-100"></div>;
    if (themeMode === 'yellow') return <div className="absolute inset-0 bg-yellow-100"></div>;
    
    return (
      <>
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-techno-primary/10 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-techno-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      </>
    );
  };

  return (
    <div className={`relative min-h-screen font-sans transition-colors duration-300 overflow-x-hidden ${isLightMode ? 'theme-light-active' : ''}`}>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" crossOrigin="anonymous" />
      
      <style>{LIGHT_MODE_STYLES}</style>

      <div className={`fixed inset-0 z-0 overflow-hidden ${themeMode === 'default' || themeMode === 'black' ? 'bg-techno-dark' : 'bg-white'}`}>
         {renderBackground()}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar currentView={currentView} setView={handleSetView} themeMode={themeMode} setThemeMode={setThemeMode} />
        <main className={`flex-grow relative pb-20 md:pb-0 ${themeMode === 'default' || themeMode === 'black' ? 'text-white' : 'text-slate-900'}`}>
          {renderView()}
          
          <footer className="w-full text-center py-6 opacity-40 font-techno text-[10px] tracking-[0.2em] mb-16 md:mb-4">
             Copyright©2026 Johan - 081341300100
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
