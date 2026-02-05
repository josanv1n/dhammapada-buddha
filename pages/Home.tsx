
import React, { useState, useMemo } from 'react';
import { DhammaWheel, LotusIcon } from '../components/Icons';
import { ViewState, ThemeMode } from '../types';
import { BookOpen, Music, Mail } from 'lucide-react';
import { DHAMMAPADA_DATA } from '../data/dhammapada';

interface HomeProps {
  setView: (view: ViewState) => void;
  themeMode: ThemeMode;
}

const Home: React.FC<HomeProps> = ({ setView, themeMode }) => {
  const initialImage = "https://josanvin.github.io/josanvin/img/buddha.jpg";
  const fallbackImage = "https://images.pexels.com/photos/3642337/pexels-photo-3642337.jpeg?auto=compress&cs=tinysrgb&w=800";
  
  const [imgSrc, setImgSrc] = useState(initialImage);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setImgSrc(fallbackImage);
      setHasError(true);
    }
  };

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return "Selamat Pagi";
    if (hour >= 10 && hour < 15) return "Selamat Siang";
    if (hour >= 15 && hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  }, []);

  const randomVerse = useMemo(() => {
    const allVerses = DHAMMAPADA_DATA.flatMap(vagga => vagga.verses);
    const randomIndex = Math.floor(Math.random() * allVerses.length);
    return allVerses[randomIndex];
  }, []);

  const isLightMode = ['light', 'gray', 'green', 'blue', 'pink', 'yellow'].includes(themeMode);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center text-center">
        {/* Profile/Image Section */}
        <div className="relative mb-10 group perspective-1000">
          {!isLightMode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-2 border-techno-primary/30 rounded-full animate-spin-slow"></div>
               <div className="absolute w-[280px] h-[280px] md:w-[430px] md:h-[430px] border border-techno-accent/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
            </div>
          )}
          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float transition-transform duration-700 transform hover:scale-105">
            <div className={`absolute inset-0 bg-gradient-to-b ${!isLightMode ? 'from-techno-primary/20 to-techno-accent/20' : 'from-slate-200 to-slate-300'} rounded-full blur-2xl opacity-50`}></div>
            <div className={`w-full h-full rounded-full overflow-hidden border-2 ${!isLightMode ? 'bg-slate-800 border-techno-primary/50 shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'bg-white border-slate-200 shadow-xl'}`}>
              <img src={imgSrc} alt="Buddha" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" onError={handleImageError} loading="lazy" />
            </div>
            <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 p-3 rounded-full border shadow-lg backdrop-blur-md ${!isLightMode ? 'bg-slate-900 border-techno-primary' : 'bg-white border-slate-200'}`}>
                <DhammaWheel className={`w-8 h-8 ${!isLightMode ? 'text-techno-primary' : 'text-slate-800'} animate-spin-slow`} />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="max-w-3xl">
          <div className="mb-2 animate-bounce-slow">
            <span className={`px-4 py-1 rounded-full text-xs font-techno font-bold tracking-[0.2em] uppercase border ${!isLightMode ? 'text-techno-gold border-techno-gold/30 bg-techno-gold/5' : 'text-slate-600 border-slate-300 bg-slate-100'}`}>
              {greeting}
            </span>
          </div>
          <h1 className={`text-3xl md:text-5xl font-techno font-bold mb-6 ${!isLightMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-techno-primary to-techno-accent' : 'text-slate-800'}`}>
            SYAIR DHAMMAPADA
          </h1>
          <div className="relative px-6 py-4">
            <p className={`text-lg md:text-xl font-classic italic leading-relaxed mb-4 ${!isLightMode ? 'text-gray-300' : 'text-slate-700'}`}>
              "{randomVerse.translation}"
            </p>
            <p className={`text-xs md:text-sm font-techno tracking-widest ${!isLightMode ? 'text-techno-primary/70' : 'text-cyan-700'}`}>
              — DHAMMAPADA AYAT {randomVerse.number}
            </p>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-16 w-full max-w-lg">
          <button onClick={() => setView('parita')} className="px-6 py-4 bg-gradient-to-r from-techno-gold to-orange-500 rounded-xl font-bold text-black shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
            <BookOpen className="w-5 h-5" /> BACA PARITA
          </button>
          <button onClick={() => setView('syair')} className="px-6 py-4 bg-gradient-to-r from-techno-primary to-blue-600 rounded-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
            <LotusIcon className="w-5 h-5" /> BACA SYAIR
          </button>
          <button onClick={() => setView('lagu')} className="px-6 py-4 bg-gradient-to-r from-techno-accent to-purple-600 rounded-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
            <Music className="w-5 h-5" /> KUMPULAN LAGU
          </button>
          <button onClick={() => setView('kontak')} className="px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
            <Mail className="w-5 h-5" /> KONTAK KAMI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
