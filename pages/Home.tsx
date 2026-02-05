import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DhammaWheel, LotusIcon } from '../components/Icons';
import { ViewState, ThemeMode } from '../types';
import { BookOpen, Music, Volume2, VolumeX } from 'lucide-react';
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
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const interactionBound = useRef(false);

  const musicUrl = "https://josanvin.github.io/josanvin/img/tri_ratna.mp3";

  /* =========================
     AUDIO ENGINE (STABIL)
     ========================= */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = musicUrl;
    audio.loop = true;
    audio.preload = "auto";
    audio.muted = isMuted;

    const tryPlay = () => {
      audio.play()
        .then(() => {
          setAudioError(false);
          removeInteractionListeners();
        })
        .catch(() => {
          setAudioError(true);
          bindInteractionListeners();
        });
    };

    const bindInteractionListeners = () => {
      if (interactionBound.current) return;
      interactionBound.current = true;

      document.addEventListener("click", tryPlay, { once: true });
      document.addEventListener("keydown", tryPlay, { once: true });
      document.addEventListener("touchstart", tryPlay, { once: true });
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("keydown", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      interactionBound.current = false;
    };

    // coba autoplay sekali
    const timer = setTimeout(tryPlay, 300);

    return () => {
      clearTimeout(timer);
      removeInteractionListeners();
      audio.pause();
    };
  }, [musicUrl, isMuted]);

  const toggleMute = () => {
    if (!audioRef.current) return;

    const next = !isMuted;
    audioRef.current.muted = next;
    setIsMuted(next);

    if (!next && audioRef.current.paused) {
      audioRef.current.play().catch(() => setAudioError(true));
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
    const allVerses = DHAMMAPADA_DATA.flatMap(v => v.verses);
    return allVerses[Math.floor(Math.random() * allVerses.length)];
  }, []);

  const isDarkMode = themeMode === 'default' || themeMode === 'black';

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">

      {/* AUDIO */}
      <audio ref={audioRef} onError={() => setAudioError(true)} />

      {/* MUSIC BUTTON */}
      <button
        onClick={toggleMute}
        className={`fixed bottom-24 right-6 z-50 p-3 rounded-full backdrop-blur-md border shadow-lg transition-all hover:scale-110 md:bottom-10 ${
          isDarkMode
            ? 'bg-techno-dark/80 border-techno-primary text-techno-primary'
            : 'bg-white/80 border-slate-300 text-slate-600'
        } ${audioError ? 'border-red-500 text-red-500' : ''}`}
        title={isMuted ? "Aktifkan Suara" : "Matikan Suara"}
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} className="animate-pulse" />}
      </button>

      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center text-center">

        {/* VISUAL */}
        <div className="relative mb-10 group perspective-1000">
          {isDarkMode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-2 border-techno-primary/30 rounded-full animate-spin-slow"></div>
              <div
                className="absolute w-[280px] h-[280px] md:w-[430px] md:h-[430px] border border-techno-accent/30 rounded-full animate-spin-slow"
                style={{ animationDirection: 'reverse', animationDuration: '25s' }}
              />
            </div>
          )}

          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
            <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-techno-primary/20 to-techno-accent/20' : 'from-slate-400/20 to-slate-600/20'} rounded-full blur-2xl`} />
            <div className={`w-full h-full rounded-full overflow-hidden border-2 shadow-[0_0_30px_rgba(6,182,212,0.5)]`}>
              <img
                src={imgSrc}
                alt="Buddha"
                className="w-full h-full object-cover hover:scale-110 transition-transform"
                onError={handleImageError}
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 p-3 rounded-full border shadow">
              <DhammaWheel className="w-8 h-8 animate-spin-slow text-techno-primary" />
            </div>
          </div>
        </div>

        {/* TEXT */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          {greeting} 🙏
        </h1>

        <p className="italic text-lg md:text-xl mb-2">
          {randomVerse.translation}
        </p>
        <p className="text-sm opacity-70">
          — DHAMMAPADA AYAT {randomVerse.number}
        </p>

        {audioError && (
          <p className="mt-4 text-red-500 text-xs animate-pulse">
            Klik layar untuk memulai musik
          </p>
        )}

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button onClick={() => setView('parita')} className="px-6 py-3 rounded-full bg-orange-400 font-bold flex gap-2">
            <BookOpen /> BACA PARITA
          </button>
          <button onClick={() => setView('syair')} className="px-6 py-3 rounded-full bg-blue-500 text-white font-bold flex gap-2">
            <LotusIcon /> BACA SYAIR
          </button>
          <button onClick={() => setView('lagu')} className="px-6 py-3 rounded-full bg-purple-500 text-white font-bold flex gap-2">
            <Music /> KUMPULAN LAGU
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
