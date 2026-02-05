
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Verses from './pages/Verses';
import Parita from './pages/Parita';
import Lagu from './pages/Lagu';
import Contact from './pages/Contact';
import { ViewState, ThemeMode } from './types';

const THEME_STYLES = `
  /* Global Transition */
  .theme-transition * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
  }

  /* Logic for Light Themes (Light, Gray, Green, Blue, Pink, Yellow) */
  .theme-is-light .text-white { color: #0f172a !important; } /* Slate-900 */
  .theme-is-light .text-slate-200 { color: #1e293b !important; } /* Slate-800 */
  .theme-is-light .text-slate-300 { color: #334155 !important; } /* Slate-700 */
  .theme-is-light .text-slate-400 { color: #475569 !important; } /* Slate-600 */
  .theme-is-light .text-gray-300 { color: #334155 !important; }
  .theme-is-light .text-cyan-400 { color: #0e7490 !important; } /* Cyan-700 */
  
  .theme-is-light .glass-panel {
    background: rgba(255, 255, 255, 0.8) !important;
    border-color: rgba(15, 23, 42, 0.1) !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05) !important;
  }

  /* Navbar specific for light themes to keep it readable */
  .theme-is-light nav.glass-panel {
    background: #0f172a !important; /* Keep navbar dark for contrast */
    border-color: rgba(255, 255, 255, 0.1) !important;
  }
  .theme-is-light nav .text-white, 
  .theme-is-light nav span, 
  .theme-is-light nav button { 
    color: white !important; 
  }

  /* Theme Specific Backgrounds */
  .bg-theme-default { background-color: #020617; }
  .bg-theme-light { background-color: #ffffff; }
  .bg-theme-gray { background-color: #f1f5f9; }
  .bg-theme-green { background-color: #ecfdf5; }
  .bg-theme-blue { background-color: #f0f9ff; }
  .bg-theme-pink { background-color: #fff1f2; }
  .bg-theme-black { background-color: #000000; }
  .bg-theme-yellow { background-color: #fffbeb; }

  /* Adjust inputs for light themes */
  .theme-is-light input {
    background-color: rgba(255, 255, 255, 0.9) !important;
    color: #0f172a !important;
    border-color: #cbd5e1 !important;
  }
`;

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('dhammapada-theme');
    return (savedTheme as ThemeMode) || 'default';
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isUnlocked = useRef(false);

  const musicUrl = "https://josanvin.github.io/josanvin/img/Triratna_Puja.mp3";

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('dhammapada-theme', mode);
  };

  const handleSetView = useCallback((view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

  const updateAudioState = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.2;
    if (currentView === 'home' && isUnlocked.current) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [currentView]);

  useEffect(() => {
    updateAudioState();
  }, [currentView, updateAudioState]);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (isUnlocked.current) return;
      isUnlocked.current = true;
      updateAudioState();
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchend', handleUserInteraction);
    };
    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('touchend', handleUserInteraction, { passive: true });
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchend', handleUserInteraction);
    };
  }, [updateAudioState]);

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

  const renderBackgroundElements = () => {
    if (themeMode === 'default') {
      return (
        <>
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-techno-primary/10 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-techno-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </>
      );
    }
    return null;
  };

  return (
    <div className={`relative min-h-screen font-sans theme-transition overflow-x-hidden ${isLightMode ? 'theme-is-light' : 'theme-is-dark'}`}>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" crossOrigin="anonymous" />
      
      <style>{THEME_STYLES}</style>

      {/* Dynamic Background Layer */}
      <div className={`fixed inset-0 z-0 bg-theme-${themeMode} transition-colors duration-500`}>
         {renderBackgroundElements()}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar currentView={currentView} setView={handleSetView} themeMode={themeMode} setThemeMode={setThemeMode} />
        <main className={`flex-grow relative pb-20 md:pb-0 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
          {renderView()}
          
          <footer className={`w-full text-center py-6 opacity-40 font-techno text-[10px] tracking-[0.2em] mb-16 md:mb-4 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
             Copyright©2026 Johan - 081341300100
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
