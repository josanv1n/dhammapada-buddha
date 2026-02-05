import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Verses from './pages/Verses';
import Parita from './pages/Parita';
import Lagu from './pages/Lagu';
import Contact from './pages/Contact';
import { ViewState, ThemeMode } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('dhammapada-theme');
    return (savedTheme as ThemeMode) || 'default';
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('dhammapada-theme', mode);
  };

  const isLightMode = () => ['light', 'gray', 'green', 'blue', 'pink', 'yellow'].includes(themeMode);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <Home setView={setCurrentView} themeMode={themeMode} />;
      case 'syair': return <Verses />;
      case 'parita': return <Parita />;
      case 'lagu': return <Lagu />;
      case 'kontak': return <Contact />;
      default: return <Home setView={setCurrentView} themeMode={themeMode} />;
    }
  };

  const renderBackground = () => {
    switch (themeMode) {
      case 'light': return <div className="absolute inset-0 bg-white"></div>;
      case 'gray': return <div className="absolute inset-0 bg-gray-100"></div>;
      case 'green': return <div className="absolute inset-0 bg-green-100"></div>;
      case 'blue': return <div className="absolute inset-0 bg-blue-100"></div>;
      case 'pink': return <div className="absolute inset-0 bg-pink-100"></div>;
      case 'black': return <div className="absolute inset-0 bg-black"></div>;
      case 'yellow': return <div className="absolute inset-0 bg-yellow-100"></div>;
      case 'default':
      default:
        return (
          <>
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-techno-primary/20 rounded-full blur-3xl animate-pulse"></div>
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-techno-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-techno-primary/5 to-transparent"></div>
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-techno-dark via-transparent to-techno-dark opacity-80"></div>
          </>
        );
    }
  };

  const shouldApplyLightModeStyles = isLightMode();

  return (
    <div className="relative min-h-screen font-sans transition-colors duration-500">
      <div className={`fixed inset-0 z-0 overflow-hidden ${themeMode === 'default' || themeMode === 'black' ? 'bg-techno-dark' : 'bg-transparent'}`}>
         {renderBackground()}
      </div>

      {shouldApplyLightModeStyles && (
        <style>{`
          .text-white { color: #1e293b !important; }
          .text-slate-200 { color: #334155 !important; }
          .text-slate-300 { color: #475569 !important; }
          .text-slate-400 { color: #475569 !important; }
          .text-gray-300 { color: #334155 !important; }
          .text-gray-400 { color: #475569 !important; }
          .text-cyan-400 { color: #0891b2 !important; } 
          .glass-panel {
            background: rgba(255, 255, 255, 0.7) !important;
            border-color: rgba(0,0,0,0.1) !important;
          }
          nav.glass-panel, .glass-panel.fixed {
            background: rgba(30, 41, 59, 0.95) !important; 
            border-color: rgba(255, 255, 255, 0.1) !important;
          }
          nav .nav-link, nav span, nav button { color: white !important; }
          input { background-color: white !important; color: black !important; }
        `}</style>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar currentView={currentView} setView={setCurrentView} themeMode={themeMode} setThemeMode={setThemeMode} />
        <main className={`flex-grow relative pb-20 md:pb-0 ${themeMode === 'default' || themeMode === 'black' ? 'text-white' : 'text-slate-900'}`}>
          {renderView()}
          
          <footer className="w-full text-center py-8 opacity-50 font-techno text-[10px] md:text-xs tracking-[0.2em] mb-16 md:mb-4">
             Copyright©2026 Johan - 081341300100
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;