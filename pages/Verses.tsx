
import React, { useState } from 'react';
import { DHAMMAPADA_DATA } from '../data/dhammapada';
import { LotusIcon } from '../components/Icons';

const Verses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = DHAMMAPADA_DATA.map(chapter => ({
    ...chapter,
    verses: chapter.verses.filter(verse => 
      verse.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verse.pali.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(chapter => chapter.verses.length > 0);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-techno font-bold text-techno-gold mb-4 tracking-tight">
            Kumpulan Syair
          </h2>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-techno-primary"></div>
            <LotusIcon className="w-5 h-5 text-techno-primary animate-pulse" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-techno-primary"></div>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="relative max-w-lg mx-auto group">
            <input 
              type="text" 
              placeholder="Cari syair atau kata kunci..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-700 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-techno-primary focus:ring-2 focus:ring-techno-primary/20 transition-all placeholder-slate-500 shadow-xl"
            />
            <div className="absolute right-5 top-4 text-slate-500 group-focus-within:text-techno-primary transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
          </div>
        </div>

        {/* Chapters and Verses List */}
        <div className="space-y-20">
          {filteredData.length > 0 ? filteredData.map((chapter) => (
            <div key={chapter.id} className="animate-fade-in-up">
              {/* Chapter Title Badge */}
              <div className="flex flex-col items-center mb-10">
                 <div className="px-6 py-2 bg-techno-primary/10 rounded-full border border-techno-primary/30 mb-3">
                    <p className="text-techno-primary text-xs font-techno tracking-[0.3em] uppercase">{chapter.title}</p>
                 </div>
                 <h3 className="text-3xl font-bold text-white text-center">{chapter.translation}</h3>
              </div>

              <div className="grid gap-10">
                {chapter.verses.map((verse) => (
                  <div 
                    key={verse.number} 
                    className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-techno-gold/30 transition-all duration-500 shadow-2xl relative group overflow-hidden"
                  >
                    {/* Subtle Background Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-techno-primary/5 rounded-full blur-[80px] group-hover:bg-techno-gold/10 transition-colors"></div>

                    <div className="flex flex-col items-center text-center relative z-10">
                      {/* Verse Number Seal */}
                      <div className="mb-8">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-techno-gold/40 bg-techno-gold/5 text-techno-gold font-techno text-sm font-bold shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                          {verse.number}
                        </div>
                      </div>
                      
                      {/* Pali Text - Primary Focus */}
                      <div className="max-w-2xl mb-8">
                        <span className="text-techno-primary/30 text-5xl font-classic leading-none block h-4 -mb-2">“</span>
                        <p className="font-classic text-xl md:text-2xl text-cyan-400 font-bold italic leading-relaxed tracking-wide drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                          {verse.pali}
                        </p>
                        <span className="text-techno-primary/30 text-5xl font-classic leading-none block h-4 mt-2 text-right">”</span>
                      </div>
                      
                      {/* Decorative Divider */}
                      <div className="flex items-center justify-center gap-3 w-full max-w-xs mb-8">
                        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-slate-700"></div>
                        <LotusIcon className="w-4 h-4 text-slate-600" />
                        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-slate-700"></div>
                      </div>
                      
                      {/* Indonesian Translation - High Readability */}
                      <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-sans max-w-2xl">
                        {verse.translation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )) : (
            <div className="text-center py-20 glass-panel rounded-3xl">
              <p className="text-slate-400 text-xl font-techno">Maaf, syair tidak ditemukan.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-techno-primary hover:underline font-bold"
              >
                Tampilkan Semua
              </button>
            </div>
          )}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-24 flex flex-col items-center opacity-20">
           <div className="h-20 w-px bg-gradient-to-b from-techno-gold to-transparent"></div>
           <LotusIcon className="w-10 h-10 text-techno-gold mt-4" />
        </div>

      </div>
    </div>
  );
};

export default Verses;
