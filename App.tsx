import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Verses from './pages/Verses';
import Parita from './pages/Parita';
import Contact from './pages/Contact';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setView={setCurrentView} />;
      case 'syair':
        return <Verses />;
      case 'parita':
        return <Parita />;
      case 'kontak':
        return <Contact />;
      default:
        return <Home setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-techno-dark text-white selection:bg-techno-primary selection:text-black font-sans">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="relative">
        {renderView()}
      </main>

      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
         <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-techno-primary/5 to-transparent"></div>
      </div>
    </div>
  );
};

export default App;