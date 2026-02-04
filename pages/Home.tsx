import React, { useState } from 'react';
import { DhammaWheel, LotusIcon } from '../components/Icons';
import { ViewState } from '../types';
import { BookOpen, Music } from 'lucide-react';

interface HomeProps {
  setView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
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

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-techno-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-techno-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative flex flex-col items-center text-center">
        
        {/* Main 3D Visual - Buddha/Wheel Composition */}
        <div className="relative mb-12 group perspective-1000">
          {/* Rotating Halo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[320px] h-[320px] md:w-[500px] md:h-[500px] border-2 border-techno-primary/30 rounded-full animate-spin-slow"></div>
             <div className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] border border-techno-accent/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
          </div>

          {/* Buddha Image (Techno Style) */}
          <div className="relative w-72 h-72 md:w-96 md:h-96 animate-float transition-transform duration-700 transform hover:scale-105">
            {/* Glow effect behind the image - Rounded Full */}
            <div className="absolute inset-0 bg-gradient-to-b from-techno-primary/20 to-techno-accent/20 rounded-full blur-2xl"></div>
            
            {/* The Image Wrapper - Rounded Full for circle shape */}
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 border-2 border-techno-primary/50 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              <img 
                src={imgSrc}
                alt="Techno Buddha Meditation" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                onError={handleImageError}
              />
            </div>
            
            {/* Overlay Icon */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-techno-dark/90 backdrop-blur-md p-3 rounded-full border border-techno-primary shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-110 transition-transform">
                <DhammaWheel className="w-8 h-8 text-techno-primary animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-6xl font-techno font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-techno-primary to-techno-accent">
          SYAIR DHAMMAPADA
        </h1>
        
        <p className="text-lg md:text-xl font-classic text-gray-300 max-w-2xl mb-8 leading-relaxed">
          "Pikiran adalah pelopor dari segala sesuatu. <br/>
          Pikiran adalah pemimpin, pikiran adalah pembentuk."
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <button 
            onClick={() => setView('parita')}
            className="px-8 py-4 bg-gradient-to-r from-techno-gold to-orange-500 rounded-full font-bold text-black shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            BACA PARITA
          </button>

          <button 
            onClick={() => setView('syair')}
            className="px-8 py-4 bg-gradient-to-r from-techno-primary to-blue-600 rounded-full font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <LotusIcon className="w-5 h-5" />
            BACA SYAIR
          </button>

          <button 
            onClick={() => setView('lagu')}
            className="px-8 py-4 bg-gradient-to-r from-techno-accent to-purple-600 rounded-full font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Music className="w-5 h-5" />
            KUMPULAN LAGU
          </button>
          
          <button 
            onClick={() => setView('kontak')}
            className="px-8 py-4 bg-transparent border border-techno-primary/50 text-techno-primary rounded-full font-bold hover:bg-techno-primary/10 transition-all duration-300"
          >
            HUBUNGI KAMI
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;