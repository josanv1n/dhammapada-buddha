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
  
  // Initialize theme from localStorage or default to 'pattern'
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('dhammapada-theme');
    return (savedTheme as ThemeMode) || 'pattern';
  });

  // Save theme to localStorage whenever it changes
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('dhammapada-theme', mode);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setView={setCurrentView} />;
      case 'syair':
        return <Verses />;
      case 'parita':
        return <Parita />;
      case 'lagu':
        return <Lagu />;
      case 'kontak':
        return <Contact />;
      default:
        return <Home setView={setCurrentView} />;
    }
  };

  // Logic to determine which background to show
  const renderBackground = () => {
    // 1. Home and Contact always use the cool default Techno pattern
    if (currentView === 'home' || currentView === 'kontak') {
      return (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-techno-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-techno-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-techno-primary/5 to-transparent"></div>
        </>
      );
    }

    // 2. Content pages (Syair, Parita, Lagu) use the User Selected Theme
    switch (themeMode) {
      case 'mono':
        // Solid dark color for high contrast reading
        return (
          <div className="absolute inset-0 bg-[#0f172a]"></div>
        );
      case 'gradient':
        // Smooth gradient
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#1e1b4b] to-slate-900"></div>
        );
      case 'pattern':
      default:
        // Original Pattern (less intense than Home)
        return (
          <>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-techno-dark via-transparent to-techno-dark opacity-80"></div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-techno-dark text-white selection:bg-techno-primary selection:text-black font-sans transition-colors duration-500">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />
      
      <main className="relative">
        {renderView()}
      </main>

      {/* Dynamic Background Container */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
         {renderBackground()}
      </div>
    </div>
  );
};

export default App;