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
  
  // Initialize theme from localStorage or default to 'default'
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('dhammapada-theme');
    return (savedTheme as ThemeMode) || 'default';
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('dhammapada-theme', mode);
  };

  // Check if current theme requires light mode text (dark text color)
  const isLightMode = () => {
    return ['light', 'gray', 'green', 'blue', 'pink', 'yellow'].includes(themeMode);
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

  const renderBackground = () => {
    // Logika Background: Berlaku untuk SEMUA halaman (termasuk Home)
    switch (themeMode) {
      case 'light': return <div className="absolute inset-0 bg-[#ffffff]"></div>;
      case 'gray': return <div className="absolute inset-0 bg-[#f3f4f6]"></div>;
      case 'green': return <div className="absolute inset-0 bg-[#ecfccb]"></div>;
      case 'blue': return <div className="absolute inset-0 bg-[#dbeafe]"></div>;
      case 'pink': return <div className="absolute inset-0 bg-[#fce7f3]"></div>;
      case 'black': return <div className="absolute inset-0 bg-[#000000]"></div>;
      case 'yellow': return <div className="absolute inset-0 bg-[#fef9c3]"></div>;
      case 'default':
      default:
        // Background Techno Asli (Biru Tua dengan Orbs)
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

  // Inject CSS untuk mengubah warna teks di halaman konten jika mode terang dipilih
  const shouldApplyLightModeStyles = isLightMode();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${themeMode === 'default' || themeMode === 'black' ? 'bg-techno-dark text-white' : 'text-slate-900'}`}>
      
      {/* Style Injection: Memaksa warna teks menjadi gelap jika background terang dipilih, 
          agar tulisan tetap terbaca di semua halaman */}
      {shouldApplyLightModeStyles && (
        <style>{`
          /* Override text colors to dark for readability on light backgrounds */
          .text-white { color: #1e293b !important; }
          .text-slate-200 { color: #334155 !important; }
          .text-slate-300 { color: #475569 !important; }
          .text-slate-400 { color: #475569 !important; }
          .text-gray-300 { color: #334155 !important; }
          .text-gray-400 { color: #475569 !important; }
          
          /* Override glass panel background to be lighter on light themes */
          .glass-panel {
            background: rgba(255, 255, 255, 0.8) !important;
            border-color: rgba(0,0,0,0.1) !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          /* KECUALI Navbar: Navbar harus tetap gelap/transparan sesuai request */
          nav.glass-panel {
            background: rgba(30, 41, 59, 0.9) !important; 
            border-color: rgba(255, 255, 255, 0.1) !important;
          }
          /* Navbar text adjustments to keep it visible on dark navbar */
          nav .text-slate-900 { color: white !important; }
          nav button { color: white !important; }
          
          /* Change search input fields */
          input {
            background-color: white !important;
            color: black !important;
            border-color: #cbd5e1 !important;
          }
          input::placeholder {
            color: #94a3b8 !important;
          }
          
          /* Adjust headings */
          h2, h3 {
            text-shadow: none !important;
          }
        `}</style>
      )}

      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        themeMode={themeMode}
        setThemeMode={setThemeMode}
      />
      
      <main className="relative">
        {renderView()}
      </main>

      {/* Dynamic Background Container - Berada di layer paling bawah (z-[-1]) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
         {renderBackground()}
      </div>
    </div>
  );
};

export default App;