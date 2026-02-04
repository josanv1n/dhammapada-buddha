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
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-techno font-bold text-techno-gold mb-4">Parita & Mantra</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-techno-primary to-transparent mx-auto mb-8"></div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Cari Parita atau Mantra..." 
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
        <div className="space-y-8">
          {filteredData.length > 0 ? filteredData.map((item) => (
            <div key={item.id} className="animate-fade-in-up">
              <div className="glass-panel p-6 md:p-8 rounded-xl hover:border-techno-gold/50 transition-all duration-300 group">
                
                {/* Title */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="p-2 bg-techno-primary/10 rounded-lg border border-techno-primary/30 mt-1">
                        <LotusIcon className="w-6 h-6 text-techno-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-techno-gold mb-2">{item.title}</h3>
                        {item.note && (
                            <p className="text-slate-400 text-sm italic border-l-2 border-slate-600 pl-3 py-1">
                                {item.note}
                            </p>
                        )}
                    </div>
                </div>

                {/* Content (Pali/Mantra) - Cyan Bold Highlight */}
                {item.content && (
                    <div className="mb-6 bg-slate-900/40 p-6 rounded-lg border border-slate-700/50">
                        <p className="font-classic text-lg text-cyan-400 font-bold leading-loose whitespace-pre-wrap drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                            {item.content}
                        </p>
                    </div>
                )}
                
                {/* Translation - White */}
                {item.translation && (
                    <div className="pl-2">
                        <p className="text-slate-200 text-lg leading-relaxed font-sans whitespace-pre-wrap">
                            {item.translation}
                        </p>
                    </div>
                )}

              </div>
            </div>
          )) : (
            <div className="text-center py-20">
              <p className="text-slate-400 text-xl">Tidak ada Parita yang ditemukan.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Parita;