import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DhammaWheel, LotusIcon } from '../components/Icons';
import { ViewState, ThemeMode } from '../types';
import { BookOpen, Music, Volume2, VolumeX, AlertCircle, Play, Mail } from 'lucide-react';
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Link MP3 yang benar (Diperbarui sesuai instruksi: Triratna_Puja.mp3)
  const musicUrl = "https://josanvin.github.io/josanvin/img/Triratna_Puja.mp3";

  const handlePlay = () => {
    if (audioRef.current) {
      // Teknik warming up untuk mobile
      audioRef.current.muted = false;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
          setNeedsManualPlay(false);
          setIsMuted(false);
        })
        .catch((err) => {
          console.error("Gagal putar manual:", err);
          setAudioError(true);
        });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Deteksi jika browser memblokir autoplay
    const attemptAutoplay = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(false);
          setNeedsManualPlay(false);
        })
        .catch(() => {
          setNeedsManualPlay(true);
        });
    };

    // Listener interaksi global untuk HP Android
    const globalInteraction = () => {
      if (!isPlaying) {
        handlePlay();
        document.removeEventListener('click', globalInteraction);
        document.removeEventListener('touchstart', globalInteraction);
      }
    };

    document.addEventListener('click', globalInteraction);
    document.addEventListener('touchstart', globalInteraction);

    const timer = setTimeout(attemptAutoplay, 1500);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', globalInteraction);
      document.removeEventListener('touchstart', globalInteraction);
      if (audio) audio.pause();
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (!newMuted && !isPlaying) handlePlay();
    }
  };

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

  const isDarkMode = themeMode === 'default' || themeMode === 'black';

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        preload="auto" 
        crossOrigin="anonymous"
        onPlay={() => { setIsPlaying(true); setAudioError(false); }}
        onError={(e) => { 
          console.error("Audio Load Error", e);
          setAudioError(true); 
        }} 
      />

      {/* Floating Audio Controls */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-4 md:bottom-10">
        {needsManualPlay && !audioError && (
          <button 
            onClick={handlePlay} 
            className="p-4 rounded-full bg-techno-gold text-black shadow-[0_0_20px_rgba(251,191,36,0.5)] animate-bounce"
            aria-label="Putar Musik"
          >
            <Play size={24} fill="currentColor" />
          </button>
        )}
        <button 
          onClick={toggleMute} 
          className={`p-3 rounded-full backdrop-blur-md border shadow-lg ${isDarkMode ? 'bg-techno-dark/80 border-techno-primary text-techno-primary' : 'bg-white/80 border-slate-300 text-slate-600'} ${audioError ? 'border-red-500 text-red-500 opacity-50' : ''}`}
        >
          {audioError ? <AlertCircle size={22} /> : (isMuted ? <VolumeX size={22} /> : <Volume2 size={22} className={isPlaying ? "animate-pulse" : ""} />)}
        </button>
      </div>

      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center text-center">
        <div className="relative mb-10 group perspective-1000">
          {isDarkMode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-2 border-techno-primary/30 rounded-full animate-spin-slow"></div>
               <div className="absolute w-[280px] h-[280px] md:w-[430px] md:h-[430px] border border-techno-accent/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
            </div>
          )}
          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float transition-transform duration-700 transform hover:scale-105">
            <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-techno-primary/20 to-techno-accent/20' : 'from-slate-400/20 to-slate-600/20'} rounded-full blur-2xl`}></div>
            <div className={`w-full h-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800 border-techno-primary/50' : 'bg-white border-slate-300'} border-2 shadow-[0_0_30px_rgba(6,182,212,0.5)]`}>
              <img src={imgSrc} alt="Buddha" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" onError={handleImageError} />
            </div>
            <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 ${isDarkMode ? 'bg-techno-dark/90 border-techno-primary' : 'bg-white/90 border-slate-300'} backdrop-blur-md p-3 rounded-full border shadow-[0_0_15px_rgba(6,182,212,0.4)]`}>
                <DhammaWheel className={`w-8 h-8 ${isDarkMode ? 'text-techno-primary' : 'text-slate-800'} animate-spin-slow`} />
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <div className="mb-2 animate-bounce-slow">
            <span className={`px-4 py-1 rounded-full text-xs font-techno font-bold tracking-[0.2em] uppercase border ${isDarkMode ? 'text-techno-gold border-techno-gold/30 bg-techno-gold/5' : 'text-slate-600 border-slate-300 bg-slate-100'}`}>
              {greeting}
            </span>
          </div>
          <h1 className={`text-3xl md:text-5xl font-techno font-bold mb-6 ${isDarkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-techno-primary to-techno-accent' : 'text-slate-800'}`}>SYAIR DHAMMAPADA</h1>
          <div className="relative px-6 py-4">
            <p className={`text-lg md:text-xl font-classic italic leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-slate-600 font-semibold'}`}>{randomVerse.translation}</p>
            <p className={`text-xs md:text-sm font-techno tracking-widest ${isDarkMode ? 'text-techno-primary/70' : 'text-slate-500'}`}>— DHAMMAPADA AYAT {randomVerse.number}</p>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-16 w-full max-w-lg">
          <button onClick={() => setView('parita')} className="px-6 py-4 bg-gradient-to-r from-techno-gold to-orange-500 rounded-xl font-bold text-black shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-3">
            <BookOpen className="w-5 h-5" /> BACA PARITA
          </button>
          <button onClick={() => setView('syair')} className="px-6 py-4 bg-gradient-to-r from-techno-primary to-blue-600 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-3">
            <LotusIcon className="w-5 h-5" /> BACA SYAIR
          </button>
          <button onClick={() => setView('lagu')} className="px-6 py-4 bg-gradient-to-r from-techno-accent to-purple-600 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-3">
            <Music className="w-5 h-5" /> KUMPULAN LAGU
          </button>
          <button onClick={() => setView('kontak')} className="px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-3">
            <Mail className="w-5 h-5" /> KONTAK KAMI
          </button>
        </div>

        {audioError && (
          <p className="mb-10 text-red-400 text-[10px] font-techno uppercase tracking-widest bg-red-500/10 py-2 px-4 rounded border border-red-500/20">
            Audio tidak dapat diputar. Silakan periksa koneksi atau browser Anda.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;