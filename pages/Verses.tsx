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
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-techno font-bold text-techno-gold mb-4">Kumpulan Syair</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-techno-primary to-transparent mx-auto mb-8"></div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Cari kata-kata kebijaksanaan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-full py-3 px-6 text-white focus:outline-none focus:border-techno-primary focus:ring-1 focus:ring-techno-primary transition-all placeholder-slate-400"
            />
            <div className="absolute right-4 top-3 text-slate-400">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="space-y-12">
          {filteredData.length > 0 ? filteredData.map((chapter) => (
            <div key={chapter.id} className="animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-2 bg-techno-primary/10 rounded-lg border border-techno-primary/30">
                    <LotusIcon className="w-6 h-6 text-techno-primary" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white">{chapter.translation}</h3>
                    <p className="text-techno-primary text-sm font-techno">{chapter.title}</p>
                 </div>
              </div>

              <div className="grid gap-6">
                {chapter.verses.map((verse) => (
                  <div 
                    key={verse.number} 
                    className="glass-panel p-6 rounded-xl hover:border-techno-gold/50 transition-all duration-300 group hover:transform hover:scale-[1.01]"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-techno-gold/10 text-techno-gold px-3 py-1 rounded-full text-xs font-bold border border-techno-gold/20">
                        Ayat {verse.number}
                      </span>
                    </div>
                    
                    <p className="font-classic text-lg text-slate-300 italic mb-4 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                      "{verse.pali}"
                    </p>
                    
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4"></div>
                    
                    <p className="text-white text-lg leading-relaxed font-sans">
                      {verse.translation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )) : (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl">Tidak ada syair yang ditemukan.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Verses;