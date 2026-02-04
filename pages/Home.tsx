import React from 'react';
import { DhammaWheel, LotusIcon } from '../components/Icons';
import { ViewState } from '../types';

interface HomeProps {
  setView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
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
             <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border-2 border-techno-gold/30 rounded-full animate-spin-slow"></div>
             <div className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] border border-techno-primary/30 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
          </div>

          {/* Buddha Image (Simulated 3D) */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float transition-transform duration-700 transform style-preserve-3d">
            <div className="absolute inset-0 bg-gradient-to-b from-techno-gold/20 to-transparent rounded-full blur-2xl"></div>
            <img 
              src="https://picsum.photos/seed/buddha/600/600" 
              alt="Buddha" 
              className="w-full h-full object-cover rounded-full border-4 border-techno-gold/50 shadow-[0_0_50px_rgba(251,191,36,0.4)] mask-image-gradient"
              style={{ clipPath: 'circle(50%)' }}
            />
            
            {/* Overlay Icon */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-techno-dark p-3 rounded-full border border-techno-gold shadow-lg">
                <DhammaWheel className="w-8 h-8 text-techno-gold animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-6xl font-techno font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-techno-primary to-techno-primary">
          SYAIR DHAMMAPADA
        </h1>
        
        <p className="text-lg md:text-xl font-classic text-gray-300 max-w-2xl mb-8 leading-relaxed">
          "Pikiran adalah pelopor dari segala sesuatu. <br/>
          Pikiran adalah pemimpin, pikiran adalah pembentuk."
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setView('syair')}
            className="px-8 py-4 bg-gradient-to-r from-techno-primary to-blue-600 rounded-full font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <LotusIcon className="w-5 h-5" />
            BACA SYAIR
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