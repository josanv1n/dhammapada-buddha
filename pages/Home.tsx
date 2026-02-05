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
  // Menggunakan link GitHub Pages yang baru
  const initialImage = "https://josanvin.github.io/josanvin/img/buddha.jpg";
  
  // Gambar Cadangan (Fallback)
  const fallbackImage = "https://images.pexels.com/photos/3642337/pexels-photo-3642337.jpeg?auto=compress&cs=tinysrgb&w=800";
  
  const [imgSrc, setImgSrc] = useState(initialImage);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setImgSrc(fallbackImage);
      setHasError(true);
      console.log("Gambar utama gagal dimuat, mengalihkan ke gambar cadangan...");
    }
  };

  // Logika Ucapan Salam Berbasis Waktu
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return "Selamat Pagi";
    if (hour >= 10 && hour < 15) return "Selamat Siang";
    if (hour >= 15 && hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  }, []);

  // Logika Mengambil Ayat Secara Random
  const randomVerse = useMemo(() => {
    const allVerses = DHAMMAPADA_DATA.flatMap(vagga => vagga.verses);
    const randomIndex = Math.floor(Math.random() * allVerses.length);
    return allVerses[randomIndex];
  }, []);

  // Cek apakah mode gelap (Default atau Black) untuk menentukan style teks
  const isDarkMode = themeMode === 'default' || themeMode === 'black';

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      
      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center text-center">
        
        {/* Main 3D Visual - Buddha/Wheel Composition */}
        <div className="relative mb-10 group perspective-1000">
          {/* Rotating Halo - hanya tampil jika mode gelap agar tidak mengganggu di background terang */}
          {isDarkMode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-2 border-techno-primary/30 rounded-full animate-spin-slow"></div>
               <div className="absolute w-[280px] h-[280px] md:w-[430px] md:h-[430px] border border-techno-accent/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
            </div>
          )}

          {/* Buddha Image (Techno Style) */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float transition-transform duration-700 transform hover:scale-105">
            {/* Glow effect behind the image - Rounded Full */}
            <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-techno-primary/20 to-techno-accent/20' : 'from-slate-400/20 to-slate-600/20'} rounded-full blur-2xl`}></div>
            
            {/* The Image Wrapper - Rounded Full for circle shape */}
            <div className={`w-full h-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800 border-techno-primary/50' : 'bg-white border-slate-300'} border-2 shadow-[0_0_30px_rgba(6,182,212,0.5)]`}>
              <img 
                src={imgSrc}
                alt="Techno Buddha Meditation" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                onError={handleImageError}
              />
            </div>
            
            {/* Overlay Icon */}
            <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-techno-dark/90 border-techno-primary' : 'bg-white/90 border-slate-300'} backdrop-blur-md p-3 rounded-full border shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-110 transition-transform`}>
                <DhammaWheel className={`w-8 h-8 ${isDarkMode ? 'text-techno-primary' : 'text-slate-800'} animate-spin-slow`} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-3xl">
          {/* Greeting Text */}
          <p className={`text-sm md:text-base font-techno font-bold tracking-[0.2em] uppercase mb-1 ${isDarkMode ? 'text-techno-gold' : 'text-slate-500'}`}>
            {greeting}
          </p>

          <h1 className={`text-3xl md:text-5xl font-techno font-bold mb-6 ${isDarkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-techno-primary to-techno-accent' : 'text-slate-800'}`}>
            SYAIR DHAMMAPADA
          </h1>
          
          <div className="relative px-6">
            {/* Quote Mark Decoration */}
            <div className={`absolute top-0 left-0 text-6xl opacity-20 font-serif ${isDarkMode ? 'text-techno-primary' : 'text-slate-400'}`}>“</div>
            
            <p className={`text-lg md:text-xl font-classic italic leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-slate-600 font-semibold'}`}>
              {randomVerse.translation}
            </p>
            
            <p className={`text-xs md:text-sm font-techno tracking-widest ${isDarkMode ? 'text-techno-primary/70' : 'text-slate-500'}`}>
              — DHAMMAPADA AYAT {randomVerse.number}
            </p>

            <div className={`absolute bottom-0 right-0 text-6xl opacity-20 font-serif ${isDarkMode ? 'text-techno-primary' : 'text-slate-400'}`}>”</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-10">
          <button 
            onClick={() => setView('parita')}
            className="px-8 py-3 bg-gradient-to-r from-techno-gold to-orange-500 rounded-full font-bold text-black shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            BACA PARITA
          </button>

          <button 
            onClick={() => setView('syair')}
            className="px-8 py-3 bg-gradient-to-r from-techno-primary to-blue-600 rounded-full font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <LotusIcon className="w-5 h-5" />
            BACA SYAIR
          </button>

          <button 
            onClick={() => setView('lagu')}
            className="px-8 py-3 bg-gradient-to-r from-techno-accent to-purple-600 rounded-full font-bold text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Music className="w-5 h-5" />
            KUMPULAN LAGU
          </button>
          
          <button 
            onClick={() => setView('kontak')}
            className="px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full font-bold text-white shadow-[0_0_15px_rgba(71,85,105,0.3)] hover:shadow-[0_0_25px_rgba(71,85,105,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            HUBUNGI KAMI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;