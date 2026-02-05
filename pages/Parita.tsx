
import React, { useState } from 'react';
import { PARITA_DATA } from '../data/parita';
import { LotusIcon } from '../components/Icons';

const Parita: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = PARITA_DATA.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-techno font-bold text-techno-gold mb-4 tracking-tight">
            Parita & Mantra
          </h2>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-techno-primary"></div>
            <LotusIcon className="w-5 h-5 text-techno-primary animate-pulse" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-techno-primary"></div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto group">
            <input 
              type="text" 
              placeholder="Cari parita atau doa tertentu..." 
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

        {/* Content List */}
        <div className="space-y-16">
          {filteredData.length > 0 ? filteredData.map((item, index) => (
            <div key={item.id} className="animate-fade-in-up">
              <div className="glass-panel p-8 md:p-14 rounded-[2.5rem] border border-white/5 hover:border-techno-primary/30 transition-all duration-500 shadow-2xl relative group overflow-hidden">
                
                {/* Subtle Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-techno-primary/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="flex flex-col items-center text-center relative z-10">
                  
                  {/* Step/Number Badge */}
                  <div className="mb-6">
                    <div className="px-5 py-1 rounded-full border border-techno-gold/30 bg-techno-gold/5 text-techno-gold text-[10px] font-techno tracking-[0.2em] uppercase">
                      Bagian {index + 1}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                    {item.title}
                  </h3>

                  {/* Instructions / Notes (If any) */}
                  {item.note && (
                    <div className="mb-10 w-full max-w-2xl px-6 py-4 rounded-2xl bg-slate-900/40 border-l-4 border-techno-gold/50 text-left">
                      <p className="text-techno-gold/80 text-sm md:text-base italic font-sans leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  )}

                  {/* Main Content (Pali/Mantra) */}
                  {item.content && (
                    <div className="w-full mb-10">
                      <div className="relative inline-block py-2">
                        <span className="text-techno-primary/20 text-6xl font-classic absolute -top-4 -left-8">“</span>
                        <p className="font-classic text-xl md:text-2xl text-cyan-400 font-bold leading-[2.2] whitespace-pre-wrap drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                          {item.content}
                        </p>
                        <span className="text-techno-primary/20 text-6xl font-classic absolute -bottom-8 -right-8">”</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative Divider - Only if both content and translation exist */}
                  {item.content && item.translation && (
                    <div className="flex items-center justify-center gap-4 w-full max-w-xs mb-10">
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-slate-700"></div>
                      <LotusIcon className="w-4 h-4 text-slate-600" />
                      <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-slate-700"></div>
                    </div>
                  )}
                  
                  {/* Translation */}
                  {item.translation && (
                    <div className="max-w-2xl">
                      <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-sans whitespace-pre-wrap">
                        {item.translation}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-24 glass-panel rounded-3xl border-dashed border-slate-700">
              <p className="text-slate-500 text-xl font-techno">Tidak menemukan apa yang Anda cari.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-6 px-8 py-3 bg-techno-primary/10 text-techno-primary rounded-full font-bold hover:bg-techno-primary/20 transition-all"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

        {/* Footer Decoration */}
        <div className="mt-24 flex flex-col items-center opacity-30">
           <div className="h-16 w-px bg-gradient-to-b from-techno-primary to-transparent"></div>
           <LotusIcon className="w-8 h-8 text-techno-primary mt-4" />
        </div>

      </div>
    </div>
  );
};

export default Parita;
